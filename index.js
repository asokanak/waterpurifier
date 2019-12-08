//  Initialization
const http = require('http');
const fs = require('fs');
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const index = fs.readFileSync('index.html');

// Mail sending via nodemailer package
app.use(bodyparser.urlencoded({ extended: true }));
// POST route from contact form
app.post('/contact', (req, res) => {
    console.log('Into Contact api request');
    console.log('Request Body - ', req.body);

    // Instantiate the SMTP server
    const smtpTrans = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'testwpproj@gmail.com',
            pass: '77Psalms77'
        }
    })
    // Specify what the email will look like
    const mailOpts = {
        from: 'testwpproj@gmail.com', // This is ignored by Gmail
        to: 'testwpproj@gmail.com',
        subject: 'New message from contact form at Rauwela.com',
        text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
    }

    // Attempt to send the email
    smtpTrans.sendMail(mailOpts, (error, response) => {
        console.log('Into Mail sending block');
        if (error) {
            console.log('Mail is not sent Error');
            // res.render('contact-failure') // Show a page indicating failure
        }
        else {
            console.log('Mail is sent Successfully');
            // res.render('contact-success') // Show a page indicating success
        }
    })
})

app.get('/', function(req, res){
    res.send(fs.readFileSync('./web/index.html', 'utf8'));

});

// Basic node server

app.listen(process.env.PORT || 7000, function() {
    console.log("LISTENING!");
});
/*http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(index);
    console.log('Hello Node Server Started');
}).listen(7000);*/