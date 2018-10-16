var request = require('request');
var moment = require('moment');
var uniqid = require("uniqid");


let articleModule = require('../modules/article')
module.exports = function (router) { // Router factory


    router.post("/createArticle", async function (req, res) {
        try {
            let id = uniqid();
            let title = req.body.title;
            let content = req.body.content;
            let publishedOn = moment().valueOf();
            let publishedBy = req.body.userId;

            let result = await articleModule.createArticle(id, title, content, publishedOn, publishedBy)
            if (result.success) {
                res.json({
                    success: true,
                    message: "Successfully created the article."
                })
            } else {
                res.json({
                    success: false,
                    message: result.message
                })
            }

        } catch (error) {
            console.error(error);
            return;
        }
    });

    router.put("/updateArticle", async function (req, res) {
        try {
            
            let id = req.body.id;
            let title = req.body.title;
            let content = req.body.content;
            let publishedBy = req.body.publishedBy;

            let result = await articleModule.updateArticle(id, title, content, publishedBy);

            if (result.success) {
                res.json({
                    success: true,
                    message: "Successfully updated the article."
                })
            } else {
                res.json({
                    success: false,
                    message: result.message
                })
            }

        } catch (error) {
            console.log(error);
        }
    });

    router.delete("/deleteArticle", async function (req, res) {
        try {
            let id = req.body.id;

            let result = await articleModule.deleteArticle(id);

            if (result.success) {
                res.json({
                    success: true,
                    message: "Successfully deleted the article."
                })
            } else {
                res.json({
                    success: false,
                    message: result.message
                })
            }

        } catch (error) {
            console.log(error);
        }
    });

    router.post("/getAllArticles", async function (req, res) {
        try {
            let result = await articleModule.getAllArticles();

            if (result.success) {
                res.json({
                    success: true,
                    data: result.data
                })
            } else {
                res.json({
                    success: false,
                    message: result.message
                })
            }

        } catch (error) {
            console.log(error);
        }
    });

    router.delete("/deleteAllArticles", async function (req, res) {
        try {
            let result = await articleModule.deleteAllArticles();

            if (result.success) {
                res.json({
                    success: true,
                })
            } else {
                res.json({
                    success: false,
                    message: result.message
                })
            }

        } catch (error) {
            console.log(error);
        }
    });

    return router;
};