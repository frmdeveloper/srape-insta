# ig-scraper

Scrape data from Instagram without applying for the authenticated API.

## Features

### Get profile info

```js
Insta.getProfile('tiana_kaki', profile => {
	console.log(profile);
});
```

```json
{
	"id": "6965336095",
	"name": "Tiana",
	"pic": "https://scontent-mrs1-1.cdninstagram.com/vp/343360e2c822f78d6d302a1847db1833/5D2F4763/t51.2885-19/s320x320/26268757_235337373674020_3943053532785016832_n.jpg?_nc_ht=scontent-mrs1-1.cdninstagram.com",
	"bio": "",
	"private": false,
	"verified": false,
	"website": "https://tianalemesle.fr/",
	"followers": 46,
	"following": 68,
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

### Get hashtag data

```js
Insta.getHashtag('limousin', hashtag => {
	console.log(hashtag);
});
```

```json
{
	"id": "17843780971049111",
	"pic": "https://scontent-mrs1-1.cdninstagram.com/vp/58f240d6db1e0e45c3a7f2bc27c00ea2/5D36D2D6/t51.2885-15/e35/s150x150/53584789_129121004880886_3869886162348160858_n.jpg?_nc_ht=scontent-mrs1-1.cdninstagram.com",
	"posts": 182557,
	"featuredPosts": [
		"Bvdj-5gF0GN",
		"BvZHGsrHh7F",
		"BvgO5A9AwiG",
		"Bu4B1l8BxTb",
		"Bu8NV9qlpRi",
		"BvgOruwgzsv",
		"BvZvpEnpaCE",
		"BvUhOgzAuse",
		"BvKTAT4l2JS"
	],
	"lastPosts": [
		"BvgSlCFBcTx",
		"BvgSHvDpTyb",
		"BvgRtV6Dmh3",
		"BvgRIPiFPnP",
		"BvgPKdlnw3a",
		"BvgPEnCHCbg",
		"BvgO5A9AwiG",
		"BvgOruwgzsv",
		"BvgNVk2DF4e",
		"BvgKPISB0MY",
		"BvgJKwahsC1",
		"BvgISY5puZl",
		"BvgHNxdgFKN",
		"BvgGqA3J23x",
		"BvgGmbSpq2g",
		"BvgFFgEJKbK",
		"BvgDznWHyUo",
		"BvgCwLOnQ5X",
		"BvgCEnVF1A6",
		"BvgA4VCHItL",
		"Bvf-4LLlf3H",
		"BvfhY3SFQ0H",
		"BvfWrfvgaiH",
		"BvfPVIaj2Un",
		"BvfKXQGpUhH",
		"BvfH4a6nl-n",
		"BvfHzRuhBzA",
		"BvfGheRJwpZ",
		"BvfFeB9A8an",
		"BvfEyF8pHrY",
		"BvfEDzDAm41",
		"BvfDhyZHCZw",
		"BvfDR7EFRgE",
		"BvfBGwLlx3C",
		"BvfApnTFaqv",
		"BvfAQmPpjFI",
		"Bve-j9ynlH4",
		"Bve-XuBp4VS",
		"Bve9DD4pLA1",
		"Bve8yWAl8QX",
		"Bve6y3egIYp",
		"Bve16KThvN7",
		"Bve5WlTAd61",
		"Bve5VQqgVUX",
		"Bve3_eJJuuv",
		"Bve2RFEHPON",
		"Bve1QpXlXSb",
		"Bve1EfKHNTj",
		"Bve0XaPHLWS",
		"Bve0I9KnX-P",
		"BvezvP7pSPL",
		"BvezjDjlKPM",
		"Bvezb0EHf_v",
		"BvezYCsArGN",
		"BvezTnbl-wK",
		"BvezK7jJmb0",
		"BveybI_Hr1m",
		"BvexjnKlb8l",
		"BvewSZlAQHI",
		"BvevMpXgVYR",
		"BvevJP2pxMh",
		"BveuxmcAhq7",
		"Bves_jzpeQ7",
		"BvesnHPJ5UT",
		"BvesY2PHs1c",
		"Bver2RhAAGj",
		"Bveq1e4FmPq",
		"Bveq0WaBMP3",
		"BveqsJJA2gL",
		"BZ3O78ijPQP",
		"BZwd7y6DwTe",
		"BZt4NeLDooK"
	],
	"link": "https://instagram.com/explore/tags/limousin/"
}
```

### Get post data

```js
Insta.getPost('BrNM6qyHf-3', post => {
	console.log(post);
});
```

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
		"pic": "https://scontent-mrs1-1.cdninstagram.com/vp/8123c0f64c3ef70d222a6a7a5379f87a/5D36A493/t51.2885-19/s150x150/26268757_235337373674020_3943053532785016832_n.jpg?_nc_ht=scontent-mrs1-1.cdninstagram.com",
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
			"url": "https://scontent-mrs1-1.cdninstagram.com/vp/96aff5be0bba30fb39994c35624f3bfb/5D4A7A95/t51.2885-15/e35/45881951_215607719355847_3477452604092009384_n.jpg?_nc_ht=scontent-mrs1-1.cdninstagram.com",
			"type": "photo"
		}
	]
}
```

`comments` is `null` when disabled by author.

### Subscribe to posts

#### From user

```js
Insta.subscribeUserPosts('tiana_kaki', posts => {
	console.log(posts);
}, {
	interval: 0,
	lastPost: 'BrNM6qyHf-3'
});
```

`options` (last parameter) are optional.

#### From hashtag

```js
Insta.subscribeHashtagPosts('selfie', posts => {
	console.log(posts);
}, {
	interval: 0
});
```

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
* `1.0.3` (2019-03-27) • Using promises & observable
