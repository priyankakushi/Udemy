let express = require("express")
let path = require("path")
let bodyParser = require("body-parser")
//let nodeMailer = require("nodemailer")

let app = express()

app.set("view", path.join(__dirname, "view"))
app.set("view engine", "jade")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.get("/", function(req, res){
    res.render("index", {title: "Computer Not Working?"})
})


app.get("/", function(req, res){
    res.render("about")
})


app.post("/", function(req, res){
    res.render("about")
})


app.get("/contact/send", function(req, res){
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "teachguyinfo@gmail.com",
            pass: ""
        }
    });
    mailOptions = {
        form: "Brad Traversy <teachguyinfo@gmail.com>",
        to: "support@joomdigi.com",
        subject: "Website Submission",
        text: "you have a submission with the following details... Name: "+req.body.name+ "Message: "+req.body.message,
        html: "<p>you have a submission with the following details...</p><ul><li>Name "+req.body.name+"</li> <li>Email: "+req.body.email+"</li> <li>Message: "+req.body.message+" </li></ul>"

    }
    transporter.sendmail(mailOptions, function(error, info){
        if(error){
            console.log("error", error)
            res.redirect("/")
        }
        else{
            console.log("Message Sent: " +info.responce)
            res.redirect("/")
        }
    });
})



let PORT = 3000
app.listen(PORT, function(){
    console.log("Server is running on port 3000")
})