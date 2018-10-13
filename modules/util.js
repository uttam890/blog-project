exports.sendMail = async function (mailTo, mailData, template, subject) {
    return new Promise((resolve, reject) => {
        try {
            if (mailData && mailTo) {
                var filePath = path.join(__dirname, "../template", template);

                ejs.renderFile(filePath, mailData, async function (error, data) {
                    if (error) {
                        console.error(error);
                        reject(reject);
                    } else {
                        let mailOptions = {
                            from: '"Growlytics.in"', // sender address
                            to: mailTo, // list of receivers
                            subject: subject, // Subject line
                            htmlBody: data // html body
                        };

                        await nodeMailerTemplate(mailOptions, resolve, reject);
                    }
                });
            }
        } catch (error) {
            console.error("Failed to send mail", error);
            reject(error);
        }
    })
}
