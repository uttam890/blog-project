let moment = require('moment');
let uniqid = require("uniqid");


exports.createArticle = async function(id, title, content, timestamp, userId){
    return new Promise((resolve, reject) => {
        try {
            let query1 = "INSERT INTO article (id, title, content, publishedOn, publishedBy) VALUES (?, ?, ?, ?, ?)";
            global.mysqlDb.query(query1, [id, title, content, timestamp, userId], function (error, results) {
                if (error) reject(error);

                resolve({
                    success: true,
                    message: `Article Successfully created.`
                });
            });
        } catch(error) {
            reject(error)
        }
    })
}

exports.updateArticle = async function(id, title, content, publishedBy){}

exports.deleteArticle = async function(id){}

exports.getAllArticles = async function(){
    return new Promise((resolve, reject) => {
        try {
            let query1 = "SELECT * from article";
            global.mysqlDb.query(query1, function (error, results) {
                if (error) reject(error);

                resolve({
                    success: true,
                    data: results
                });
            });
        } catch(error) {
            reject(error)
        }
    })
}

exports.deleteAllArticles = async function(){}