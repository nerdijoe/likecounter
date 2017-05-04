# likecounter

Tracks user's instagram post's like counter.

Notes:

```
Do this after git clone
npm install
```


### .env file
please check Trello

![trello](http://i.imgur.com/rMl9wkS.jpg)


### User model
| Field         | Data type     |
| --------------|:-------------:|
| name          | String        |
| username      | String        |
| email         | String        |
| password      | String        |
| access_token  | String        |

### User Sign up
```
POST localhost:3000/users/signup
(see user model for fields)
```

### User Sign in
```
POST localhost:3000/users/signin
(using username and password)
```

## Instagram API
### Get User Recent Media
```
GET localhost:3000/users/instagram/get_media_recent
```

### Get User Recent Media by Tag
```
GET localhost:3000/users/instagram/get_media_recent/[tag]
```
