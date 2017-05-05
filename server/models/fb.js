/* make the API call */
FB.api(
    "/", {
        "id": "http:\/\/www.imdb.com\/title\/tt2015381\/"
    },
    function(response) {
        if (response && !response.error) {
            /* handle the result */
        }
    }
);