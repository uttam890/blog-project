var request = require('request');
var uniqid = require("uniqid");
let user = require('../modules/user')
module.exports = function (router) { // Router factory

    router.post("/createComment", async function (req, res) {
        try {
           
        } catch (error) {
            Raven.captureException(error);
            console.error("/getUserDetails Error", error);
            res.status(500);
            res.json({ success: false, message: "Internal Error." });
        }
    });
    
    router.post("/deleteComment", async function (req, res) {
        try {
           
        } catch (error) {
            Raven.captureException(error);
            console.error("/getUserDetails Error", error);
            res.status(500);
            res.json({ success: false, message: "Internal Error." });
        }
    });

    return router;
};