const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
require("./db/conn");
const Register = require("./models/Register");


var nodemailer = require('nodemailer');


const hbs = require("hbs");
const path = require("path");
const { urlencoded } = require("express");
const static_path = path.join(__dirname, "../public");
const view_path = path.join(__dirname, "../mernbackend/templates/views");
const partial_path = path.join(__dirname, "../mernbackend/templates/patials");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static("../mernbackend/public"));

app.set("view engine", "hbs");
app.set("views", view_path);
hbs.registerPartials(partial_path);
app.get("/", (req, res) => {
    res.render("index");
})


//these variables are for authentication
var UserInfo;
var UserPass;

function InsertInfo(second) {

    UserPass = second;
}

function FetchInfo() {
    return UserPass;
}

function CleanInfo() {
    UserPass = null;
}

app.get("/login", function(req, res) {

    // for OPT


    Register.findOne({ user: req.query.txt }).then((result) => {





        if (result.user === req.query.txt && result.userPass === req.query.pswd) {
            // res.send("success" + result);

            var opt = parseInt(Math.random() * 10000);


            // console.log(localStorage);
            //start email

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ankurdattatrayg@gmail.com',
                    pass: 'aqjlbjnucmwanjpt'
                }
            });

            var mailOptions = {
                from: 'ankurdattatrayg@gmail.com',
                to: result.email,
                subject: 'OTP for Verfication Portal',
                text: `Your OTP for your Verification Portal of Walchand College of Engineering, Sangli ${opt}`
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });


            //end email

            res.render("verificationOtp");

            app.get("/verifaction", function(req, res) {

                if (req.query.otp == opt) {

                    InsertInfo(result.pswd);
                    res.render("uploadDownload", { userName: result.fullName, graduationYear: result.Grad, course: result.Course, stream: result.Stream, dob: result.DOB, userEmail: result.email, phoneNumber: result.pswd });
                    app.get("/nextupload", function(req, res) {


                        res.render("nextUpload");
                    })
                    app.get("/fetch1", function(req, res) {

                        if (FetchInfo() == result.pswd) {
                            res.redirect("https://ipfs.io/ipfs/" + result.hashTran);
                        } else {
                            res.render("logout", { logoutMsg: "You are Logout" });
                        }
                        console.log(result);

                    })
                    app.get("/fetch2", function(req, res) {
                        if (FetchInfo() == result.pswd) {
                            res.redirect("https://ipfs.io/ipfs/" + result.hashPass);
                        } else {
                            res.render("logout", { logoutMsg: "You are Logout" });
                        }


                        console.log(result);

                    })
                    app.get("/fetch3", function(req, res) {
                        if (FetchInfo() == result.pswd) {
                            res.redirect("https://ipfs.io/ipfs/" + result.hashMark);
                        } else {
                            res.render("logout", { logoutMsg: "You are Logout" });
                        }



                        console.log(result);

                    })
                    app.get("/fetch4", function(req, res) {

                        res.redirect("https://ipfs.io/ipfs/" + result.hash);

                        console.log(result);

                    })
                    app.get("/logout", function(req, res) {

                        CleanInfo();
                        res.render("logout", { logoutMsg: "Successfully Logout" });
                    })

                    console.log("suucees");
                } else {
                    res.render("failedLogin", { error: "*Invalid OTP" });
                }

            })
        } else {
            res.render("failedLogin", { error: "*Login failed" });
        }


    }).catch((err) => {

        res.render("failedLogin", { error: "*Incorrect User name or Password" });
        // res.send(err);
        console.log("the error is ocuuring")
    })

})


app.get("/signup", function(req, res) {
    //Stxt - adhar , Spswd = phone
    console.log("this is starting");
    Register.findOne({ txt: req.query.Stxt }).then((result) => {
        if (result.txt === req.query.Stxt && result.pswd === req.query.Spswd) {
            console.log("this is starting of email");
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ankurdattatrayg@gmail.com',
                    pass: 'aqjlbjnucmwanjpt'
                }
            });

            var mailOptions = {
                from: 'ankurdattatrayg@gmail.com',
                to: req.query.Semail,
                subject: 'User Name And Password',
                text: `User Name - ${result.user}
                        Password - ${result.userPass}`
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.render("index")

        } else {
            console.log("thi is end")
            res.render("signfail");
        }


    }).catch((err) => {
        res.render("signfail")
    })

})

// app.get("/fetch", function(req, res) {
//     // const hash = Register.findOne({ txt: usertxt }).then((result) => {
//     //     //   res.redirect("https://ipfs.io/ipfs/" + result.hash);
//     //     console.log(result);
//     // })
//     console.log(result);

// })
app.get("/login", (req, res) => {
    res.render("register");
})



app.listen(port, () => {
    console.log(path.join(__dirname, "../mernbackend/public"));
})