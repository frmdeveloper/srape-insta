# ig-scraper

Scrape data from Instagram without applying for the authenticated API.

## Features

### Get profile info

```js
Insta.getProfile('tiana_kaki')
	.then(profile => console.log(profile));
```

```json
{
	"id": "6965336095",
	"name": "Tiana",
	"pic": "https://scontent-cdt1-1.cdninstagram.com/vp/80bb9aba4916b94a1eec374211a28250/5D2F4763/t51.2885-19/s320x320/26268757_235337373674020_3943053532785016832_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
	"bio": "",
	"private": false,
	"verified": false,
	"website": "https://tianalemesle.fr/",
	"followers": 46,
	"following": 67,
	"posts": 35,
	"lastPosts": [
		"Buth7q-nTnW",
		"BtwBWbmnXtx",
		"BtHJSmMhiDY",
		"BtHI5W9hnIC",
		"Bswe8NNH2zM",
		"BsTROEhH_vF",
		"BrNOGceHFVP",
		"BrNNjEpnPdb",
		"BrNM6qyHf-3",
		"BpkbkgpnjEw",
		"BnhdjA1HxuL",
		"BmIzQtoHGmf"
	],
	"link": "https://instagram.com/tiana_kaki"
}
```

### Get hashtag info

```js
Insta.getHashtag('cat')
	.then(hashtag => console.log(hashtag));
```

```json
{
	"id": "17841562906103814",
	"pic": "https://scontent-cdt1-1.cdninstagram.com/vp/a9b8fd97971f0da3cd348bc29639a9ad/5D36CE6F/t51.2885-15/e35/s150x150/54248034_166091667715300_9154961800049628618_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
	"posts": 173642809,
	"featuredPosts": [
		"BvhbzLUHNHp",
		"BvhTZoWn_FW",
		"Bvhbbj3HsmS",
		"BvhPlAHANzn",
		"BvhZs--JMXp",
		"BvhbrjUJM2Q",
		"BvhjoBrnsFY",
		"BvhXozfAmJI",
		"BvhdMqCjxHh"
	],
	"lastPosts": [
		"Bvhn8dsH34n",
		"Bvhn4VGo6tX",
		"Bvhn8ZtgMzc",
		"Bvhn8T9lbpa",
		"Bvhn8HRH-cR",
		"Bvhn779l2gB",
		"Bvhn7unFSmy",
		"BvhnZiZhvTB",
		"Bvhn7phBDaA",
		"Bvhn7lpBm4W",
		"Bvhn7etHPhP",
		"Bvhn4MvBkHf",
		"Bvhn7AEhZsn",
		"Bvhn23jBDXR",
		"Bvhn6yQAZVr",
		"Bvhn6m9nztw",
		"Bvhn6nSnfI0",
		"BvhnQivgbMd",
		"Bvhn6cUpSeM",
		"Bvhn6YYhEtm",
		"Bvhn6bkHIF9",
		"Bvhn4vUFAK8",
		"Bvhn6CChv3N",
		"Bvhn560pGzF",
		"BvhnpcHHF45",
		"Bvhn5iLB4qW",
		"BvhnPmdDEqt",
		"Bvhn5gJpogE",
		"Bvhn5cfDJMg",
		"Bvhn5eiF96F",
		"Bvhn5UsDhqU",
		"Bvhn5Sul_bA",
		"Bvhn4_JnbnI",
		"BvhnwEEnnga",
		"Bvhn0Cgjqp8",
		"Bvhn4uJBPA7",
		"Bvhn4i9p7Mt",
		"Bvhn4lmBrFn",
		"Bvhn4Vlp06P",
		"Bvhn30qJHyj",
		"Bvhn30Bnr93",
		"Bvhn3u4BlWc",
		"Bvhn3sLHTBA",
		"Bvhnx6lhcQ6",
		"Bvhn3boB1X4",
		"Bvhn3VXjpac",
		"Bvhn3WLlxnf",
		"Bvhn3O7HaG0",
		"Bvhn3NmBJ5z",
		"Bvhn3N4HQEv",
		"Bvhn3HRp4fD",
		"Bvhn3CvnCk2",
		"Bvhnx6uINg8",
		"Bvhnyc4BU6J",
		"Bvhnry0nDlN",
		"BvhnhCnnaBs",
		"BvhnMW9gH9a",
		"BvhjjBiFnhy",
		"BvhfyFZDo2S",
		"BvfP07Xl1uX",
		"BvX6Vh6hmiw",
		"BvK4cLAl2rz",
		"ButdhtVFoVn",
		"BuL_-abn694",
		"BsdOx-RFXzW",
		"BJI61ArghcI",
		"BI73dJlAbA7"
	],
	"link": "https://instagram.com/explore/tags/cat/"
}
```

### Get post data

```js
Insta.getPost('BrNM6qyHf-3')
	.then(post => console.log(post));
```

#### Post with photo(s)

```json
{
	"id": "1931256623437578167",
	"timestamp": 1544443751,
	"likes": 54,
	"location": null,
	"caption": "La montre connectée de #Xiaomi #MiBand3\nMerci @guillaume_slash pour #NightSight !",
	"hashtags": [
		"#Xiaomi",
		"#MiBand3",
		"#NightSight"
	],
	"mentions": [
		"@guillaume_slash"
	],
	"tagged": [],
	"author": {
		"id": "6965336095",
		"username": "tiana_kaki",
		"name": "Tiana",
		"pic": "https://scontent-cdt1-1.cdninstagram.com/vp/b87b78059687973e88a3677ef59f5cd4/5D36A493/t51.2885-19/s150x150/26268757_235337373674020_3943053532785016832_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
		"verified": false,
		"link": "https://instagram.com/tiana_kaki"
	},
	"comments": [
		{
			"user": "iamgeekcat",
			"content": "toi aussi tu l'a achetée 👏",
			"timestamp": 1545074290,
			"hashtags": null,
			"mentions": null,
			"likes": 1
		},
		{
			"user": "tiana_kaki",
			"content": "@iamgeekcat Ouais ^^",
			"timestamp": 1545079687,
			"hashtags": null,
			"mentions": [
				"@iamgeekcat"
			],
			"likes": 0
		}
	],
	"link": "https://instagram.com/p/BrNM6qyHf-3",
	"contents": [
		{
			"type": "photo",
			"url": "https://scontent-cdt1-1.cdninstagram.com/vp/f54abf483e973b4531c2b221db4f9e06/5D4A7A95/t51.2885-15/e35/45881951_215607719355847_3477452604092009384_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com"
		}
	]
}
```

#### Post with video(s)

```json
{
	"id": "2008982632440129163",
	"timestamp": 1553709476,
	"likes": 13,
	"location": {
		"name": "Iceland",
		"city": ""
	},
	"caption": "#gullfosswaterfall\n#iceland\n#memories \n#tbt\n#randompics \n#southiceland\n#roadtrip\n#route1iceland\n#higtway1iceland\n#iceland\n#icelandtravel \n#icelandscape \n#visiticeland \n#icelandadventure\n#travel \n#travelblogger \n#travelphotography \n#travelholic \n#maystravel\n#healthiswealth \n#naturephotography \n#tlslifestylecoach #allaboutadventures \n#photooftheday \n#photography\n#explore #discover\n#visionofpictures\n#landscape\n#landscapetreasures",
	"hashtags": [
		"#iceland",
		"#memories",
		"#tbt",
		"#randompics",
		"#southiceland",
		"#roadtrip",
		"#iceland",
		"#icelandtravel",
		"#icelandscape",
		"#visiticeland",
		"#icelandadventure",
		"#travel",
		"#travelblogger",
		"#travelphotography",
		"#travelholic",
		"#maystravel",
		"#healthiswealth",
		"#naturephotography",
		"#tlslifestylecoach",
		"#allaboutadventures",
		"#photooftheday",
		"#photography",
		"#explore",
		"#discover",
		"#visionofpictures",
		"#landscape",
		"#landscapetreasures"
	],
	"mentions": null,
	"tagged": [],
	"author": {
		"id": "1961534924",
		"username": "maychui.pinklemon",
		"name": "May Chui",
		"pic": "https://scontent-cdt1-1.cdninstagram.com/vp/e89db7edd1fd99aa9904c9343cf4726b/5D45B823/t51.2885-19/s150x150/28435651_141310653359842_6034566313739812864_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
		"verified": false,
		"link": "https://instagram.com/maychui.pinklemon"
	},
	"comments": [
		{
			"user": "marchiorato_mattia",
			"content": "wow🗻!",
			"timestamp": 1553709890,
			"hashtags": null,
			"mentions": null,
			"likes": 0
		}
	],
	"link": "https://instagram.com/p/BvhVw9mheaL",
	"contents": [
		{
			"type": "video",
			"url": "https://scontent.cdninstagram.com/vp/1d30eae2e5e85580e5befaba9aaf43c2/5C9E9E51/t50.2886-16/55962538_588721611605761_84285954340159488_n.mp4?_nc_ht=scontent.cdninstagram.com",
			"thumbnail": "https://scontent-cdt1-1.cdninstagram.com/vp/f9cb516118ed81e259cacc5fefdf8909/5C9EAA10/t51.2885-15/e35/53683214_165782567645938_5097691082132675200_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
			"views": 12
		}
	]
}
```

#### Post with photo(s) and video(s)

```json
{
	"id": "2008985382888489950",
	"timestamp": 1553709741,
	"likes": 17,
	"location": null,
	"caption": "🛋🐱\n.\n.\n.\n.\n#funnycats #funnycat #catsofinstagram #cats #cat #funnycatpics #funnycatvideos #funnycatsofinstagram #funnycatsvideo #funnycatvideo #funnycatpictures #funnycatface #funnycatsvideos #funnycatmemes #funnycatvids #funnycatsmeow #funnycatpic #funnycatspics #funnycatvid #funnycatstoday #funnycatinstpic #funnycatsshop #funnycatstory #funnycatselfie #funnycatsleepingpositions #funnycatsmoscow #funnycatshirt #funnycatthings #funny #kittens",
	"hashtags": [
		"#funnycats",
		"#funnycat",
		"#catsofinstagram",
		"#cats",
		"#cat",
		"#funnycatpics",
		"#funnycatvideos",
		"#funnycatsofinstagram",
		"#funnycatsvideo",
		"#funnycatvideo",
		"#funnycatpictures",
		"#funnycatface",
		"#funnycatsvideos",
		"#funnycatmemes",
		"#funnycatvids",
		"#funnycatsmeow",
		"#funnycatpic",
		"#funnycatspics",
		"#funnycatvid",
		"#funnycatstoday",
		"#funnycatinstpic",
		"#funnycatsshop",
		"#funnycatstory",
		"#funnycatselfie",
		"#funnycatsleepingpositions",
		"#funnycatsmoscow",
		"#funnycatshirt",
		"#funnycatthings",
		"#funny",
		"#kittens"
	],
	"mentions": null,
	"tagged": [],
	"author": {
		"id": "10988415359",
		"username": "angel_cat_cat",
		"name": "🐾angelcat🐾",
		"pic": "https://scontent-cdt1-1.cdninstagram.com/vp/c8d3dc92e4d5a5e875f99a940a46cac2/5D457A9E/t51.2885-19/s150x150/51144979_298724534124338_8008310563157311488_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
		"verified": false,
		"link": "https://instagram.com/angel_cat_cat"
	},
	"comments": [],
	"link": "https://instagram.com/p/BvhWY_KBUPe",
	"contents": [
		{
			"type": "video",
			"url": "https://scontent.cdninstagram.com/vp/100eb60e586b578f65a8aa53ef9589e3/5C9E4EB4/t50.2886-16/56328362_604406173305081_7683737523615411375_n.mp4?_nc_ht=scontent.cdninstagram.com",
			"thumbnail": "https://scontent-cdt1-1.cdninstagram.com/vp/41f10a09b403451d1ebdddd63971a86f/5C9EACCF/t51.2885-15/e35/54247431_853420891661689_1137107086742199353_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
			"views": 9
		},
		{
			"type": "photo",
			"url": "https://scontent-cdt1-1.cdninstagram.com/vp/0386aae033ce9e5e1038e839c7feb992/5D306F20/t51.2885-15/e35/54731642_2270928929817564_739314240546600528_n.jpg?_nc_ht=scontent-cdt1-1.cdninstagram.com",
			"thumbnail": null,
			"views": null
		}
	]
}
```

`comments` is `null` when disabled by author.

### Subscribe to posts

#### From user

```js
Insta.subscribeUserPosts('tiana_kaki', interval, lastPost)
	.subscribe({
		next: shortcode => {
			Insta.getPost(shortcode)
				.then(post => {
					console.log(post);
				});
		},
		error: err => console.error(err)
	});
```

#### From hashtag

```js
Insta.subscribeHashtagPosts('cat', interval, lastPost)
	.subscribe({
		next: post => {
			Insta.getPost(post)
				.then(post => {
					console.log(post);
				});
		},
		error: err => {
			console.error(err);
		}
	});
```

- `interval` : *(optional)* time in seconds between requests. **Default : 30**
- `lastPost` : *(optional)* post from which to begin if not the next one to be published.

## Planned features

- Support for authentication (private profiles, stories)
- More events : deleted post, added/deleted comment & like

## Changelog

* `1.0.0` (2019-03-26) • Initial release
* `1.0.1` (2019-03-27) • Added improvements & features
	- Fixed throw error scope
	- Fixed single photo post wrongly structured
	- Added support for comments
	- Added support for hashtags, mentions and tags in posts and comments
	- Added posts subscriptions feature from users (untested) and hashtags
* `1.0.2` (2019-03-27) • Added support for videos
* `1.0.3` (2019-03-27) • Added improvements & features
	- Fixed video post thumbnail & views count
	- Using promises & observable
