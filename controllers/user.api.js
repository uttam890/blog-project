var request = require('request');
var uniqid = require("uniqid");
let user = require('../modules/user')
module.exports = function (router) { // Router factory

    router.post("/updatePassword", async function (req, res) {
        try {
            let token = req.body.token;
            let newPass = req.body.newPass;
            let results = await user.updatePassword(token, newPass);
            if(results.success) {
                res.json({
                    success: true,
                    message: results.message
                });
            } else {
                res.json({
                    success: false,
                    message: results.message
                });
            }
           
        } catch (error) {
            Raven.captureException(error);
            console.error("/getUserDetails Error", error);
            res.status(500);
            res.json({ success: false, message: "Internal Error." });
        }
    });
    
    router.post("/sendResetLink", async function (req, res) {
        try {
            let emailId = req.body.email;
            let companyCode = req.body.companyCode;
            let results = await user.sendResetLink(emailId, companyCode);
            if(results.success) {
                res.json({
                    success: true,
                    message: results.message
                });
            } else {
                res.json({
                    success: true,
                    message: results.message
                });
            }
            
        } catch (error) {
            Raven.captureException(error);
            console.error("/getUserDetails Error", error);
            res.status(500);
            res.json({ success: false, message: "Internal Error." });
        }
    });

    return router;
};