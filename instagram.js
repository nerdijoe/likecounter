https://api.instagram.com/oauth/authorize/?client_id=0b9e96a58dda43b99efc5b60b168c4e5&redirect_uri=https://github.com/zanisis&response_type=code&scope=public_content+likes+comments

Client ID 0b9e96a58dda43b99efc5b60b168c4e5

Client Secret 03f6c57f46de44abb80a291ced91e2b1

sig b7a9c9bb7f69d864b09ea1113c10b1c2e0f90bc7c7acaf2f121d006431604d79


https://github.com/zanisis?code=3d5449fd1d874583962fa20911bfdc90

https://api.instagram.com/v1/users/self/?access_token=493881988.0b9e96a.779354c34d7b459d8ed3de0e077a7f2b&sig=fd56ddbc68cfb2c1b670776204876b5818d7f7b5c65ba5f8e2318f3a4d6e72d9

curl -F 'client_id=0b9e96a58dda43b99efc5b60b168c4e5' \
    -F 'client_secret=03f6c57f46de44abb80a291ced91e2b1' \
    -F 'grant_type=authorization_code' \
    -F 'redirect_uri=https://github.com/zanisis' \
    -F 'code=ff664f7b04f342b8b290b3b5ac8988cd' \
    https://api.instagram.com/oauth/access_token

access_token=493881988.0b9e96a.779354c34d7b459d8ed3de0e077a7f2b

https://api.instagram.com/v1/users/self/?client_id=0b9e96a58dda43b99efc5b60b168c4e5

curl -F 'access_token=493881988.0b9e96a.779354c34d7b459d8ed3de0e077a7f2b' \
     -F 'sig=dde4858330f62d484d40fc42e42d9fd333ec278ab2790d3e6f4a520ebb167167' \
    https://api.instagram.com/v1/media/1493602869021027831_493881988/likes

    curl -F 'access_token=493881988.0b9e96a.779354c34d7b459d8ed3de0e077a7f2b' \
         -F 'text=onpostman' \
         -F 'sig=40adca98a93f81f551db0a4d5903704e2862e080df2ea62b18ebb451648dee0e' \
         https://api.instagram.com/v1/media/1493602869021027831_493881988/comments

curl \
  -X POST \
  -F 'access_token=493881988.0b9e96a.779354c34d7b459d8ed3de0e077a7f2b' \
  -F 'sig=b7a9c9bb7f69d864b09ea1113c10b1c2e0f90bc7c7acaf2f121d006431604d79' \
  https://api.instagram.com/v1/media/657988443280050001_25025320/likes
https://api.instagram.com/oauth/authorize/?client_id=0b9e96a58dda43b99efc5b60b168c4e5&redirect_uri=https://github.com/zanisis&response_type=code
https://api.instagram.com/oauth/authorize/?client_id=0b9e96a58dda43b99efc5b60b168c4e5&redirect_uri=https://github.com/zanisis&response_type=token