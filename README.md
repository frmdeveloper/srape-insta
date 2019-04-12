# ig-scraper

Scrape data from Instagram without applying for the authenticated API.

## Getting started

### Prerequisites

- NodeJS
- NPM
- Yarn

### Install

From [npm](https://www.npmjs.com/package/@kaki87/ig-scraper)

`yarn add @kaki87/ig-scraper`

or

`npm i @kaki87/ig-scraper`

### Use

```js
const Insta = require('@kaki87/ig-scraper');
const InstaClient = new Insta();
```

#### Authentication

Authentication allows you to access private profile as long as you follow them.

##### Importing your session ID

- Go to instagram.com
- Login *(if not already logged in)*
- Open development tools *(`Ctrl` + `Shift` + `I`)*
- Get the `sessionid` cookie value
	- For chromium-based browsers : `application` tab
	- For firefox-based browsers : `storage` tab

##### Code

```js
InstaClient.authBySessionID('yourSessionID')
	.then(account => console.log(account))
	.catch(err => console.error(err));
```

If authentication is successfull, you'll get the form data from `accounts/edit` :

```json
{
	"first_name": "",
	"last_name": "",
	"email": "",
	"is_email_confirmed": true,
	"is_phone_confirmed": true,
	"username": "",
	"phone_number": "",
	"gender": 1,
	"birthday": null,
	"biography": "",
	"external_url": "",
	"chaining_enabled": true,
	"presence_disabled": false,
	"business_account": false,
	"usertag_review_enabled": false
}
```

If your session ID is invalid, you'll get the `401` error.

*Username/password authentication may be supported in the future.*

#### Get

These methods allows you to get specific elements from Instagram while you know exactly what you're looking for.

##### Errors handling

`get` may return errors in the two following cases.

- Request error : failed to get data from Instagram (HTTP code)
- Parsing error : failed to parse data returned by Instagram (`406`)

##### Get profile by username

```js
InstaClient.getProfile('username')
	.then(profile => console.log(profile))
	.catch(err => console.error(err));
```

Result

- `name` *string* - public full [name](https://help.instagram.com/583107688369069)
- `pic` *url* - public profile [picture](https://help.instagram.com/557544397610546)
- `bio` *string* - public biography
<br>`website` *url* - public website
<br>[more info about bio & website](https://help.instagram.com/362497417173378)
- `private` *boolean* - account [private state](https://help.instagram.com/448523408565555)
- `access` *boolean* - access to the profile's feed
<br>In order to have access to a private account's feed, you must have sent him a follow request that he accepted.
- `verified` *boolean* - account [verified state](https://help.instagram.com/854227311295302)
- `followers` *integer* - number of users following this profile
- `following` *integer* - number of users this profile follows
- `posts` *integer* - number of posts this profile published
- `lastPosts` *array of posts* - last posts
<br>This property is empty (`[]`) when the profile doesn't have any post but `null` if `access` is `false` (denied).
- `link` *url* - link to the profile's page
- `user` *object* - user relevant properties **(while authenticated)** :
	- `mutualFollowers` *array of usernames* - people following you and this profile
	- `blocking` *boolean* - you blocked this profile
	- `blocked` *boolean* - this profile blocked you
	- `requesting` *boolean* - you sent a follow request to this profile (if private)
	- `requested` *boolean* - this profile sent you a follow request (if yours is private)
	- `following` *boolean* - you're following this profile
	- `followed`  *boolean* - this profile follows you

*TBA : story*

##### Get hashtag

```js
InstaClient.getHashtag('hashtag')
	.then(hashtag => console.log(hashtag))
	.catch(err => console.error(err));
```

Result

- `pic` *url* - hashtag profile pic (can't find out how it is chosen)
- `posts` *integer* - number of posts containing this hashtag
- `featuredPosts` *array of posts* - featured posts published with this hashtag
<br>`lastPosts` *array of posts* - last posts published with this hashtag
<br>[more info about hashtag posts](https://help.instagram.com/777754038986618)
- `link` *url* - link to the hashtag's page
- `user` *object* - user relevant properties **(while authenticated)** :
	- `following` *boolean* - you [subscribed](https://help.instagram.com/2003408499915301) to this hashtag (receiving posts in your personal feed)

*TBA : stories*

##### Get location by ID

Unfortunately, using IDs is currently the only way to get a location, at least for now.

```js
InstaClient.getLocation(id)
	.then(location => console.log(location))
	.catch(err => console.error(err));
```

Result

- `pic` *url* - location profile pic
- `posts` *integer* - posts published from that location
- `address` *object*
	- `street` *string*
	- `zipCode` *string*
	- `city` *string*
	- `latitude` *float*
	- `longitude` *float*
- `website` *url* - place's website
- `phone` *string* - place's contact phone number
- `featuredPosts` *array of posts* - featured posts published from this location
<br>`lastPosts` *array of posts* - last posts published from this location
- `link` *url* - link to this location's page

##### Array of posts

This is a subset of a real post, containing the following properties :

- `shortcode` *string* - post identifier
- `caption` *string* - post description
- `comments` *integer* - number of comments
- `likes` *integer* - number of likes
- `thumbnail` *url* - post thumbnail
<br>Always static image wether it's a photo or a video post, lower quality.

##### Get post by shortcode

The shortcode is the post's identifier : the link to a post is instagram.com/p/shortcode.

```js
InstaClient.getPost('shortcode')
	.then(post => console.log(post))
	.catch(err => console.error(err));
```

Result

- `author` *object* - a subset of a profile's properties.
	- `username` *string*
	- `name` *string*
	- `pic` *url*
	- `verified` *boolean*
	- `link` *url*
- `location`
	- `name` *string*
	- `city` *string*
- `contents` *array of posts*
	- `type` *string* - post type : `photo` or `video`
	- `url` *string* - link to original post file (`jpg`, `mp4`, ...)
	- if `type` is `video` :
	<br>`thumbnail` *string* - link to thumbnail
	<br>`views` *integer* - number of views
- `tagged` *array of usernames* - people tagged in post contents
- `likes` *integer* - number of likes
- `caption` *string* - post description
- `hashtags` *array of hashtags* - hashtags mentioned in post description
- `mentions` *array of usernames* - people mentioned in post description
- `comments` *array of objects*
	- `user` *string* - comment author's username
	- `content` *string* - comment content
	- `timestamp` *epoch*
	- `hashtags` *array of hashtags*
	- `mentions` *array of usernames*
	- `likes` *integer*
- `timestamp` *epoch*
- `link` *string* - link to the post
