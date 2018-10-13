var request = require('request');

var uniqid = require("uniqid");

module.exports = function (router) { // Router factory


    router.post("/feed", async function (req, res) {
        try {
            let feed = await new Promise((resolve, reject) => {
                request('https://newsapi.org/v2/everything?q=bitcoin&from=2018-09-07&sortBy=publishedAt&apiKey=f2e692746ec64412b8e6ac66a9ddf969', function (error, response, result) {
                    if (error) {
                        console.log('error:', error); // Print the error if one occurred
                        reject(error);
                    }
                    resolve(JSON.parse(result));
                });
            })

            if(feed.status == "ok") {
                res.json({
                    success: true,
                    data: feed
                })
                return;
            } else {
                res.json({
                    success: false,
                    message: "Internal Error."
                })
                return;
            }
           
        } catch (error) {
            console.log(error);
        }
    });

    return router;
};