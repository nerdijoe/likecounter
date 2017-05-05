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

### Instagram Sign In
```
http://localhost:3000/users/instagram/login
```
#### Notes:
Instagram user needs to be registered as sandbox user first.


### End Points
#### Notes:
After Instagram sign in, user has been authorize to use the app. It will redirect to **localhost:8080**

User needs to **NORMAL sign in** to get the **token**.

Then embed the **token** to the **HEADER** when making below requests:

#### Get User Recent Media
```
GET localhost:3000/users/instagram/get_media_recent
```

#### Get User Recent Media by Tag
```
GET localhost:3000/users/instagram/get_media_recent/[tag]
```
