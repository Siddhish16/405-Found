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




app.get("/login", function(req, res) {
    Register.findOne({ user: req.query.txt }).then((result) => {
        if (result.user === req.query.txt && result.userPass === req.query.pswd) {
            // res.send("success" + result);

            res.render("uploadDownload")
            app.get("/fetch", function(req, res) {

                res.redirect("https://ipfs.io/ipfs/" + result.hash);

                console.log(result);

            })



            console.log("suucees");
        } else {
            res.render("failedLogin");
        }


    }).catch((err) => {
        res.send(err);
        console.log()
    })

})


app.get("/signup", function(req, res) {
    //Stxt - adhar , Spswd = phone

    Register.findOne({ txt: req.query.Stxt }).then((result) => {
        if (result.txt === req.query.Stxt && result.pswd === req.query.Spswd) {

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ankurdattatrayg@gmail.com',
                    pass: 'ankur1071716'
                }
            });

            var mailOptions = {
                from: 'ankurdattatrayg@gmail.com',
                to: 'hrishikesh430@gmail.com',
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

        } else {
            res.render("failedLogin");
        }


    }).catch((err) => {
        res.send(err);
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

app.get("/logout", function(req, res) {
    req.session = null;
    res.render("index");


})

app.listen(port, () => {
    console.log(path.join(__dirname, "../mernbackend/public"));
})