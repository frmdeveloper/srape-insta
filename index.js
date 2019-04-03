'use strict';

const
	request = require('requestretry'),
	JSDOM = require('jsdom').JSDOM,
	Observable = require('zen-observable'),
	parse = document => new JSDOM(document, { runScripts: "dangerously" }).window.document,
	insta = 'https://instagram.com';

module.exports =  {
	getProfile: username => new Promise((resolve, reject) => {
		const link = `${ insta }/${ username }`;
		request(link, (err, res, body) => {
			if(res.statusCode === 404)
				return reject('Instagram user not found');
			body += `<script>document.querySelector('html').innerHTML = JSON.stringify(_sharedData.entry_data.ProfilePage[0].graphql.user)</script>`;
			let u;
			try {
				const user = JSON.parse(parse(body).body.textContent);
				u = {
					id: user['id'],
					name: user['full_name'],
					pic: user['profile_pic_url_hd'],
					bio: user['biography'],
					private: user['is_private'],
					access: user['is_private'] ? !!user['followed_by_viewer'] : true,
					verified: user['is_verified'],
					website: user['external_url'],
					followers: user['edge_followed_by']['count'],
					following: user['edge_follow']['count'],
					posts: user['edge_owner_to_timeline_media']['count'],
					lastPosts: user['edge_owner_to_timeline_media']['edges'].map(post => ({ 
						shortcode : post['node']['shortcode'],
						comments: post['node']['edge_media_to_comment'].count,
						likes: post['node']['edge_liked_by'].count
					})),
					link
				};
			} catch(_) {
			}
			if(!u)
				return reject('Instagram parsing error');
			resolve(u);
		});
	}),
	getHashtag: hashtag => new Promise((resolve, reject) => {
		const link = `${ insta }/explore/tags/${ hashtag }/`;
		request(link, (err, res, body) => {
			if(res.statusCode === 404)
				return reject('Instagram hashtag not found');
			body += `<script>document.querySelector('html').innerHTML = JSON.stringify(_sharedData.entry_data.TagPage[0].graphql.hashtag)</script>`;
			let h;
			try {
				const hashtag = JSON.parse(parse(body).body.textContent);
				h = {
					id: hashtag['id'],
					pic: hashtag['profile_pic_url'],
					posts: hashtag['edge_hashtag_to_media']['count'],
					featuredPosts: hashtag['edge_hashtag_to_top_posts']['edges']
						.map(post => post['node']['shortcode']),
					lastPosts: hashtag['edge_hashtag_to_media']['edges']
						.map(post => post['node']['shortcode']),
					link
				}
			} catch(_) {
			}
			if(!h)
				return reject('Instagram parsing error');
			resolve(h);
		});
	}),
	getPost: shortcode => new Promise((resolve, reject) => {
		const link = `${ insta }/p/${ shortcode }`;
		request(link, (err, res, body) => {
			if(res.statusCode === 404)
				return reject('Instagram post not found');
			body += `<script>document.querySelector('html').innerHTML = JSON.stringify(_sharedData.entry_data.PostPage[0].graphql.shortcode_media)</script>`;
			let p;
			try {
				const
					post = JSON.parse(parse(body).body.textContent),
					caption = post['edge_media_to_caption']['edges'].length > 0
						? post['edge_media_to_caption']['edges'][0]['node']['text'] : null,
					username = post['owner']['username'],
					hashtagsRegex = /(?<=[\s>])#(\d*[A-Za-z_]+\d*)\b(?!;)/g,
					usernamesRegex = /@([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\\.(?!\\.))){0,28}(?:[A-Za-z0-9_]))?)/g;
				p = {
					id: post['id'],
					timestamp: post['taken_at_timestamp'],
					likes: post['edge_media_preview_like']['count'],
					location: post['location'] ? {
						name: post['location']['name'],
						city: JSON.parse(post['location']['address_json'])['city_name']
					} : null,
					caption,
					hashtags: caption ? caption.match(hashtagsRegex) : null,
					mentions: caption ? caption.match(usernamesRegex) : null,
					tagged: post['edge_media_to_tagged_user']['edges']
						.map(u => u['node']['user']['username']),
					author: {
						id: post['owner']['id'],
						username,
						name: post['owner']['full_name'],
						pic: post['owner']['profile_pic_url'],
						verified: post['owner']['is_verified'],
						link: `${ insta }/${ username }`
					},
					comments: post['comments_disabled'] ? null : post['edge_media_to_comment']['edges']
						.map(c => ({
							user: c['node']['owner']['username'],
							content: c['node']['text'],
							timestamp: c['node']['created_at'],
							hashtags: c['node']['text'].match(hashtagsRegex),
							mentions: c['node']['text'].match(usernamesRegex),
							likes: c['node']['edge_liked_by']['count']
						})),
					link
				};
				switch(post['__typename']){
					case 'GraphImage':
						Object.assign(p, {
							contents: [{
								type: 'photo',
								url: post['display_url']
							}],
						});
						break;
					case 'GraphVideo':
						Object.assign(p, {
							contents: [{
								type: 'video',
								url: post['video_url'],
								thumbnail: post['display_url'],
								views: post['video_view_count']
							}]
						});
						break;
					case 'GraphSidecar':
						Object.assign(p, {
							contents: post['edge_sidecar_to_children']['edges']
								.map(content => ({
									type: content['node']['is_video'] ? 'video' : 'photo',
									url: content['node']['is_video'] ? content['node']['video_url'] : content['node']['display_url'],
									thumbnail: content['node']['is_video'] ? content['node']['display_url'] : null,
									views: content['node']['is_video'] ? content['node']['video_view_count'] : null
								}))
						});
						break;
				}
			} catch(_) {
			}
			if(!p)
				return reject('Instagram parsing error');
			resolve(p);
		});
	}),
	subscribeUserPosts: (username, interval, lastPost) => new Observable(observer => {
		const checkNewPosts = () => {
			module.exports.getProfile(username)
				.then(profile => {
					if(!profile.access){
						observer.error('Instagram account access denied');
						return observer.complete();
					}
					const _lastPost = profile.lastPosts[0];
					if(lastPost && _lastPost !== lastPost){
						for(let i = 0; i < profile.lastPosts.indexOf(lastPost); i++){
							observer.next(profile.lastPosts[i]);
						}
					}
					setTimeout(checkNewPosts, interval || 30);
					lastPost = _lastPost;
				})
				.catch(err => {
					observer.error(err);
				});
		};
		checkNewPosts();
	}),
	subscribeHashtagPosts: (hashtag, interval, lastPost) => new Observable(observer => {
		const checkNewPosts = () => {
			module.exports.getHashtag(hashtag)
				.then(hashtag => {
					const _lastPost = hashtag.lastPosts[0];
					if(lastPost && _lastPost !== lastPost){
						for(let i = 0; i < hashtag.lastPosts.indexOf(lastPost); i++){
							observer.next(hashtag.lastPosts[i]);
						}
					}
					setTimeout(checkNewPosts, interval || 30);
					lastPost = _lastPost;
				})
				.catch(err => {
					observer.error(err);
				});
		};
		checkNewPosts();
	})
};
