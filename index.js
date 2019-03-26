'use strict';

const
	request = require('requestretry'),
	JSDOM = require('jsdom').JSDOM,
	parse = document => new JSDOM(document, { runScripts: "dangerously" }).window.document,
	insta = 'https://instagram.com';

module.exports =  {
	getProfile(username, callback){
		request(`${insta}/${username}`,(err, res, body) => {
			if(res.statusCode === 404)
				throw new Error('Instagram user not found');
			body += `<script>document.querySelector('html').innerHTML = JSON.stringify(_sharedData.entry_data.ProfilePage[0].graphql.user)</script>`;
			try {
				const user = JSON.parse(parse(body).body.textContent);
				callback({
					id: user['id'],
					name: user['full_name'],
					pic: user['profile_pic_url_hd'],
					bio: user['biography'],
					private: user['is_private'],
					verified: user['is_verified'],
					website: user['external_url'],
					followers: user['edge_followed_by']['count'],
					following: user['edge_follow']['count'],
					posts: user['edge_owner_to_timeline_media']['count'],
					lastPosts: user['edge_owner_to_timeline_media']['edges']
						.map(post => post['node']['shortcode'])
				});
			} catch(e){ throw new Error('Instagram parsing error'); }
		});
	},
	getPost(shortcode, callback){
		request(`${insta}/p/${shortcode}`, (err, res, body) => {
			if(res.statusCode === 404)
				throw new Error('Instagram post not found');
			body += `<script>document.querySelector('html').innerHTML = JSON.stringify(_sharedData.entry_data.PostPage[0].graphql.shortcode_media)</script>`;
			let p = null;
			try {
				const post = JSON.parse(parse(body).body.textContent);
				p = {
					id: post['id'],
					timestamp: post['taken_at_timestamp'],
					likes: post['edge_media_preview_like']['count'],
					comments: post['comments_disabled'] ? -1 : post['edge_media_to_comment']['count'],
					caption: post['edge_media_to_caption']['edges'].length > 0 ? post['edge_media_to_caption']['edges'][0]['node']['text'] : null,
					location: post['location'] ? {
						name: post['location']['name'],
						city: JSON.parse(post['location']['address_json'])['city_name']
					} : null,
					author: {
						id: post['owner']['id'],
						username: post['owner']['username'],
						name: post['owner']['full_name'],
						pic: post['owner']['profile_pic_url'],
						verified: post['owner']['is_verified']
					}
				};
				switch(post['__typename']){
					case 'GraphImage':
						Object.assign(p, {
							contents: [{
								url: post['display_url'],
								type: post['is_video'] ? 'video': 'photo'
							}],
						});
						break;
					case 'GraphSidecar':
						Object.assign(p, {
							contents: post['edge_sidecar_to_children']['edges']
								.map(content => ({
									url: content['node']['display_url'],
									type: content['node']['is_video'] ? 'video' : 'photo'
								}))
						});
						break;
				}
			} catch(e){ throw new Error('Instagram parsing error'); }
			callback(p);
		});
	}
};
