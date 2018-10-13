var uniqid = require("uniqid");

module.exports = function (router) { // Router factory


    router.post("/signup", function (req, res) {
        try {
            let id = uniqid();
            let email = req.body.email;
            let password = req.body.password;
            let firstName = req.body.firstName;
            let lastName = req.body.lastName;
            let mobile = req.body.mobile;

            var query = "select * from user where email = ?";
            var query2 = "INSERT INTO user (id, firstName, lastName, email, password, mobile) VALUES (?, ?, ?, ?, ?, ?)";
            global.mysqlDb.query(query, [email], function (error, results) {
                if (error) throw error;

                if (results.length > 0) {
                    res.json({
                        success: false,
                        message: "Email id already exist."
                    })
                    return;
                } else {
                    global.mysqlDb.query(query2, [id, firstName, lastName, email, password, mobile], function (error, data) {
                        if (error) throw error;

                        res.json({
                            success: true,
                            message: "Registered sucessfully."
                        })
                        return;
                    })
                }

            });
        } catch (error) {
            console.log(error);
        }
    });

    router.post("/login", async function (req, res) {
        try {
            let email = req.body.email;
            let password = req.body.password;
    
            var query = "SELECT * FROM user WHERE email = ? AND password = ?";
            global.mysqlDb.query(query, [email, password], function (error, results) {
                if (error) throw error;

                if (results.length > 0) {
                    req.session.userInfo = results[0];
                    res.locals.userInfo = results[0];

                    res.json({
                        success: true,
                        message: "Logged in sucessfully.",
                        data: results[0]
                    })
                    return;
                } else {
                    res.json({
                        success: false,
                        message: "Invalid email id or password."
                    })
                    return;
                }
              
            });
        } catch (error) {
            console.log(error);
        }
    });

    router.post("/logout", function (req, res) {
        try {
            req.session.destroy(function (error) {
                if (error) {
                    console.error(error);
                    throw error;
                }
                res.clearCookie('connect.sid');
                res.json({ success: true });
            });
            
        } catch (error) {
            console.error(error);
        }
    });
      
    return router;
};