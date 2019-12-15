//  Initialization
const http = require('http');
const fs = require('fs');
const nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const index = fs.readFileSync('index.html');

// Mail sending via nodemailer package
// Rending static files
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));
app.use('/js', express.static(__dirname + '/public/js'));
app.use('/images', express.static(__dirname + '/public/images'));
app.use('/contactform', express.static(__dirname + '/public/contactform'));
app.use('/lib', express.static(__dirname + '/public/lib'));
// app.use('/index', express.static(__dirname + '/public/index'));

// POST route from contact form
app.post('/contact', (req, res) => {
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
        to: 'rauwela@gmail.com',
        subject: 'New message from contact form at Rauwela.com',
        html: '<b>Name: </b>' + `${req.body.name}` + '<br>' +  
        '<b>Gender: </b>' + `${req.body.gender}` + '<br>' +
        '<b>Phone: </b>' + `${req.body.phone}` + '<br>' +
        '<b>Email: </b>' + `${req.body.email}` + '<br>' +
        '<b>Product: </b>' + `${req.body.product}` + '<br>' +
        '<b>Timing: </b>' + `${req.body.timing}` + '<br>' +
        '<b>Message: </b>' + `${req.body.message}`
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
    res.send(fs.readFileSync('index.html', 'utf8'));

});

// Basic node server

app.listen(process.env.PORT || 7000, function() {
    console.log("LISTENING!");
});