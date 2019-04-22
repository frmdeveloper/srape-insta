'use strict';

/*
Modules
 */

const
	request = require('requestretry'),
	JSDOM = require('jsdom').JSDOM,
	Observable = require('zen-observable'),
	parse = document => new JSDOM(document, { runScripts: 'dangerously' }).window.document,
	insta = 'https://www.instagram.com/';

/*
Utils
 */

const querystring = object => Object.keys(object).map(key => `${key}=${object[key]}`).join('&');

/*
Class private variables & methods
 */

const _this = {
	sessionID: null,
	profile: null,
	get: (path, tryParse = true, sessionID = _this.sessionID, params) => new Promise((resolve, reject) => {
		const url = insta + path + '/?' + querystring({ ...(sessionID ? { __a: 1 } : {}), ...params });
		request(url, {
			headers: {
				cookie: sessionID ? `sessionid=${sessionID}` : ''
			},
			followAllRedirects: true
		}, (err, res, body) => {
			if(res.statusCode !== 200){
				reject(res.statusCode);
			}
			else if(tryParse){
				let data;
				if(!sessionID){
					body += `<script>document.querySelector('html').innerHTML = JSON.stringify(Object.values(window['_sharedData']['entry_data'])[0][0])</script>`;
					body = parse(body).body.textContent;
				}
				try { data = JSON.parse(body); } catch(_){}
				if(!data)
					reject(406);
				else {
					if(!data['graphql'])
						reject(204);
					else
						resolve(Object.values(data['graphql'])[0]);
				}
			}
			else {
				res.redirected = res.request.uri.href !== url;
				resolve(res);
			}
		});
	}),
	search: query => new Promise((resolve, reject) => _this.get('web/search/topsearch',false, undefined, { context: 'blended', query })
		.then(res => resolve(JSON.parse(res.body)))
		.catch(reject)),
	postDetails: post => ({
		shortcode: post['node']['shortcode'],
		caption: post['node']['edge_media_to_caption']['edges'].length > 0
			? post['node']['edge_media_to_caption']['edges'][0]['node']['text'] : null,
		comments: post['node']['edge_media_to_comment']['count'],
		likes: post['node']['edge_liked_by']['count'],
		thumbnail: post['node']['display_url']
	})
};

module.exports = class Insta {
	authBySessionID(sessionID){
		return new Promise((resolve, reject) => _this.get('accounts/edit', false, sessionID)
			.then(res => {
				if(!res.redirected){
					_this.sessionID = sessionID;
					_this.profile = JSON.parse(res.body)['form_data'];
					resolve(_this.profile);
				}
				else
					reject(401);
			})
			.catch(reject));
	}
	getAccountNotifications(){
		return new Promise((resolve, reject) => {
			if(!_this.sessionID) return reject(401);
			_this.get('accounts/activity').then(res => {
				resolve(res['activity_feed']['edge_web_activity_feed']['edges'].map(item => item['node']).map(notification => ({
					id: notification['id'],
					timestamp: notification['timestamp'],
					type: ({
						'GraphLikeAggregatedStory' : 'like',
						'GraphMentionStory': 'mention',
						'GraphCommentMediaStory': 'comment',
						'GraphFollowAggregatedStory': 'follow'
					})[notification['__typename']],
					...(notification['media'] ? {
						post: {
							shortcode: notification['media']['shortcode'],
							thumbnail: notification['media']['thumbnail_src']
						}
					} : {}),
					...(notification['user'] ? {
						by: {
							username: notification['user']['username'],
							name: notification['user']['full_name'],
							pic: notification['user']['profile_pic_url']
						}
					} : {}),
					...(notification['__typename'] === 'GraphMentionStory' ? {
						content: notification['text']
					} : {})
				})));
			})
		});
	}
	getProfile(username = _this.profile.username, anonymous = false){
		return new Promise((resolve, reject) => _this.get(username, true, anonymous ? null : undefined)
			.then(profile => {
				const access = profile['is_private'] ? !!profile['followed_by_viewer'] : true;
				resolve({
					name: profile['full_name'],
					pic: profile['profile_pic_url_hd'],
					bio: profile['biography'],
					private: profile['is_private'],
					access,
					verified: profile['is_verified'],
					website: profile['external_url'],
					followers: profile['edge_followed_by']['count'],
					following: profile['edge_follow']['count'],
					posts: profile['edge_owner_to_timeline_media']['count'],
					lastPosts: access ? profile['edge_owner_to_timeline_media']['edges'].map(post => _this.postDetails(post)) : null,
					link: insta + profile['username'],
					...(profile['is_business_account'] ? {
						business: profile['business_category_name']
					} : {}),
					...(_this.sessionID ? {
						user: {
							mutualFollowers: profile['edge_mutual_followed_by']['edges'].map(item => item['node']['username']),
							blocking: profile['blocked_by_viewer'],
							blocked: profile['has_blocked_viewer'],
							requesting: profile['requested_by_viewer'],
							requested: profile['has_requested_viewer'],
							following: profile['followed_by_viewer'],
							followed: profile['follows_viewer']
						}
					} : {})
				});
			})
			.catch(err => {
				if(err === 204){
					this.getProfile(username, true)
						.then(profile => resolve(Object.assign(profile, {
							user: { blocked: true }
						})))
						.catch(reject);
				}
				else
					reject(err);
			}));
	}
	getHashtag(hashtag){
		return new Promise((resolve, reject) => {
			const path = `explore/tags/${hashtag}`;
			_this.get(path)
				.then(hashtag => resolve({
					pic: hashtag['profile_pic_url'],
					posts: hashtag['edge_hashtag_to_media']['count'],
					featuredPosts: hashtag['edge_hashtag_to_top_posts']['edges'].map(post => _this.postDetails(post)),
					lastPosts: hashtag['edge_hashtag_to_media']['edges'].map(post => _this.postDetails(post)),
					link: insta + path,
					...(_this.sessionID ? {
						user: {
							following: hashtag['is_following']
						}
					} : {})
				}))
				.catch(reject);
		});
	}
	getLocation(id){
		return new Promise((resolve, reject) => {
			const path = `explore/locations/${id}`;
			_this.get(path)
				.then(location => {
					const address = JSON.parse(location['address_json']);
					resolve({
						pic: location['profile_pic_url'],
						posts: location['edge_location_to_media']['count'],
						address: {
							street: address['street_address'],
							zipCode: address['zip_code'],
							city: address['city_name'],
							latitude: location['lat'],
							longitude: location['lng']
						},
						website: location['website'],
						phone: location['phone'],
						featuredPosts: location['edge_location_to_top_posts']['edges'].map(post => _this.postDetails(post)),
						lastPosts: location['edge_location_to_media']['edges'].map(post => _this.postDetails(post)),
						link: insta + path
					});
				})
				.catch(reject);
		});
	}
	getPost(shortcode){
		return new Promise((resolve, reject) => {
			const path = `p/${shortcode}`;
			_this.get(path)
				.then(post => {
					const
						caption = post['edge_media_to_caption']['edges'].length > 0
							? post['edge_media_to_caption']['edges'][0]['node']['text'] : null,
						username = post['owner']['username'],
						hashtagsRegex = /(?<=[\s>])#(\d*[A-Za-z_]+\d*)\b(?!;)/g,
						usernamesRegex = /@([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\\.(?!\\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
					resolve({
						author: {
							id: post['owner']['id'],
							username,
							name: post['owner']['full_name'],
							pic: post['owner']['profile_pic_url'],
							verified: post['owner']['is_verified'],
							link: `${ insta }/${ username }`
						},
						location: post['location'] ? {
							id: post['location']['id'],
							name: post['location']['name'],
							city: JSON.parse(post['location']['address_json'])['city_name']
						} : null,
						...(post['__typename'] === 'GraphImage' ? {
							contents: [{
								type: 'photo',
								url: post['display_url']
							}]
						} : {}),
						...(post['__typename'] === 'GraphVideo' ? {
							contents: [{
								type: 'video',
								url: post['video_url'],
								thumbnail: post['display_url'],
								views: post['video_view_count']
							}]
						} : {}),
						...(post['__typename'] === 'GraphSidecar' ? {
							contents: post['edge_sidecar_to_children']['edges']
								.map(content => ({
									type: content['node']['is_video'] ? 'video' : 'photo',
									url: content['node']['is_video'] ? content['node']['video_url'] : content['node']['display_url'],
									...(content['node']['is_video'] ? {
										thumbnail: content['node']['display_url'],
										views: content['node']['video_view_count']
									} : {})
								}))
						} : {}),
						tagged: post['edge_media_to_tagged_user']['edges']
							.map(u => u['node']['user']['username']),
						likes: post['edge_media_preview_like']['count'],
						caption,
						hashtags: caption ? caption.match(hashtagsRegex) : null,
						mentions: caption ? caption.match(usernamesRegex) : null,
						comments: post['comments_disabled'] ? null : post[`edge_media_${_this.sessionID ? 'preview': 'to'}_comment`]['edges']
							.map(c => ({
								user: c['node']['owner']['username'],
								content: c['node']['text'],
								timestamp: c['node']['created_at'],
								hashtags: c['node']['text'].match(hashtagsRegex),
								mentions: c['node']['text'].match(usernamesRegex),
								likes: c['node']['edge_liked_by']['count']
							})),
						timestamp: post['taken_at_timestamp'],
						link: insta + path
					});
				})
				.catch(reject);
		});
	}
	}
	searchProfile(query){
		return new Promise((resolve, reject) => _this.search(query)
			.then(res => resolve(res['users'].map(item => item['user']).map(profile => ({
				username: profile['username'],
				name: profile['full_name'],
				pic: profile['profile_pic_url'],
				private: profile['is_private'],
				verified: profile['is_verified'],
				followers: profile['follower_count'],
				...(_this.sessionID ? {
					user: {
						following: profile['following']
					}
				} : {})
			}))))
			.catch(reject));
	}
	searchHashtag(query){
		return new Promise((resolve, reject) => _this.search(query)
			.then(res => resolve(res['hashtags'].map(item => item['hashtag'])
				.map(hashtag => ({ name: hashtag['name'], posts: hashtag['media_count'] }))))
			.catch(reject));
	}
	searchLocation(query){
		return new Promise((resolve, reject) => _this.search(query)
			.then(res => resolve(res['places'].map(item => item['place']['location']).map(location => ({
				id: location['pk'],
				name: location['name'],
				address: {
					street: location['address'],
					city: location['city'],
					latitude: location['lat'],
					longitude: location['lng']
				}
			}))))
			.catch(reject));
	}
	subscribeAccountNotifications(interval = 30, lastNotification){
		return new Observable(observer => {
			const checkNewNotifications = () => {
				this.getAccountNotifications()
					.then(notifications => {
						const _lastNotification = notifications[0].id;
						if(!lastNotification || _lastNotification !== lastNotification){
							for(let i = 0; i < notifications.map(notification => notification.id).indexOf(lastNotification); i++){
								observer.next(notifications[i]);
							}
						}
						setTimeout(checkNewNotifications, interval);
						lastNotification = _lastNotification;
					})
					.catch(err => {
						observer.error(err);
						checkNewNotifications();
					});
			};
			checkNewNotifications();
		});
	}
	subscribeUserPosts(username, interval = 30, lastPost){
		return new Observable(observer => {
			const checkNewPosts = () => {
				this.getProfile(username)
					.then(profile => {
						if(!profile.access){
							observer.error(403);
						}
						else {
							const _lastPost = profile.lastPosts[0].shortcode;
							if(!lastPost || _lastPost !== lastPost){
								for(let i = 0; i < profile.lastPosts.map(p => p.shortcode).indexOf(lastPost); i++){
									observer.next(profile.lastPosts[i]);
								}
							}
							setTimeout(checkNewPosts, interval);
							lastPost = _lastPost;
						}
					})
					.catch(err => {
						observer.error(err);
						checkNewPosts();
					});
			};
			checkNewPosts();
		});
	}
	subscribeHashtagPosts(hashtag, interval = 30, lastPost){
		return new Observable(observer => {
			const checkNewPosts = () => {
				this.getHashtag(hashtag)
					.then(hashtag => {
						const _lastPost = hashtag.lastPosts[0].shortcode;
						if(!lastPost || _lastPost !== lastPost){
							for(let i = 0; i < hashtag.lastPosts.map(p => p.shortcode).indexOf(lastPost); i++){
								observer.next(hashtag.lastPosts[i]);
							}
						}
						setTimeout(checkNewPosts, interval);
						lastPost = _lastPost;
					})
					.catch(err => {
						observer.error(err);
						checkNewPosts();
					});
			};
			checkNewPosts();
		});
	}
};
