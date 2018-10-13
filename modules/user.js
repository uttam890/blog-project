let moment = require('moment');
let async = require("async");
let uniqid = require("uniqid");
const { sendMail } = require('./util');

exports.updatePassword = function (token, newPass) {
    return new Promise(async (resolve, reject) => {
        try {

            let userTokenTimestamp = await function (token) {
                return new Promise(async (resolve, reject) => {
                    let query = "SELECT * FROM user WHERE token = ?";
                    global.mysqlDb.query(query, [token], function (error, user) {
                        if (error) reject(error);

                        resolve(user[0].token_timestamp);
                    })
                })
            }

            let currentTime = moment().valueOf();

            // // console.log(currentTime, tokeTimestamp, user);
            // check token expiry
            if(currentTime > userTokenTimestamp) {
                console.info("User token has been expired.");
                resolve({
                    success: false,
                    message: "Your token has been expired."
                });
            } else if (currentTime < userTokenTimestamp || userTokenTimestamp == null){

                // update password
                let query1 = "UPDATE user SET password = ? WHERE token = ?";
                global.mysqlDb.query(query1, [newPass, token], function (error, results) {
                    if (error) reject(error);
                    if(results.affectedRows == 0) {
                        console.info("User token has been expired.");
                        resolve({
                            success: false,
                            message: "Your token has been expired."
                        });
                    } else {
                        // Delete token after password reset.
                        let query2 = "UPDATE user SET token = NULL, token_timestamp = NULL WHERE token = ?";
                        global.mysqlDb.query(query2, [token], function (error, results) {
                            if (error) reject(error);
    
                            resolve({
                                success: true,
                                message: "Password successfully updated."
                            })
                        });
                        
                    }
                });
            }
            
        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}


exports.sendResetLink = function (emailId) {
    return new Promise(async (resolve, reject) => {
        try {
            // update user role
            let token = uniqid();
            token = token + uniqid();
            let tokenTimestamp = moment().add(2, 'hours').valueOf();

            // check if the email exist in db
            let isEmailExists = await function (emailId, companyCode) {
                return new Promise(async (resolve, reject) => {
                    let query1 = "SELECT * FROM user WHERE email = ?";
                    global.mysqlDb.query(query1, [emailId, companyCode], function (error, results) {
                        if (error) reject(error);

                        if (results > 0) {
                            resolve(true)
                        } else {
                            resolve(false)
                        }
                    });
                })
            }

            if (!isEmailExists) {
                let query1 = "UPDATE user SET token = ?, token_timestamp = ? WHERE email = ?";
                global.mysqlDb.query(query1, [token, tokenTimestamp, emailId], function (error, results) {
                    if (error) reject(error);

                    sendMail(emailId, { token: token, email: emailId }, 'reset_pass_link.ejs', 'Reset Your Password');
                    console.debug(`Email successfully sent to ${emailId}`);
                    resolve({
                        success: true,
                        message: `Email has been sent to ${emailId}`
                    });
                });
            } else {
                console.info("Email doesn't exist in our system.");
                resolve({
                    success: false,
                    message: `Email doesn't exist in our system.`
                });
            }

        } catch (error) {
            console.error(error);
            reject(error);
        }
    })
}