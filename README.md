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
	"pic": "https://scontent-mrs1-1.cdninstagram.com/....jpg",
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
		"BtHJSmMhiDY"
	]
}
```

### Get post data

```js
Insta.getPost('Buth7q-nTnW', post => {
	console.log(post);
})
```

```json
{
	"id": "1812187949221841859",
	"timestamp": 1530249659,
	"likes": 8,
	"comments": 0,
	"caption": "Vendredi dernier sur l'Ile du Souvenir du Parc de la Tête d'Or, à Lyon.",
	"location": {
		"name": "Parc de la Tête d'Or",
		"city": "Lyon, France"
	},
	"author": {
		"id": "6965336095",
		"verified": false,
		"pic": "https://scontent-mrs1-1.cdninstagram.com/....jpg",
		"username": "tiana_kaki",
		"name": "Tiana"
	},
	"contents": [
		{
			"url": "https://scontent-mrs1-1.cdninstagram.com/....jpg",
			"type": "photo"
		},
		{
			"url": "https://scontent-mrs1-1.cdninstagram.com/....jpg",
			"type": "photo"
		}
	]
}
```

`comments = -1` when disabled.

## Planned features

- Support for authentication (private profiles, stories)
- Post comments list
- Events : new/deleted post, comment, like
