const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
require('dotenv').config()
var accountSid = process.env.SID
var authToken = process.env.AUTH
//twilio for sending message
const twilio = require('twilio')(accountSid, authToken);
//mysql database connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "meragaon",
    timezone: 'utc'
})


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//route too fetch all data from table
app.get("/api/get", (req, res) => {
    const sqlData = 'SELECT * FROM contact';
    db.query(sqlData, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})
//route to add contact detail to the contact table
app.post("/api/post", (req, res) => {
    const { id, fname, lname, phone } = req.body;
    const sqlInsert = "INSERT INTO contact (id,first_name,last_name,phone) VALUES (?,?,?,?)";
    db.query(sqlInsert, [id, fname, lname, phone], (error, result) => {
        if (error) {
            console.log(error)
        }
        res.send("OK")
    })

})
//route to fetch each data from contact table
app.get("/api/get/:id", (req, res) => {
    const { id } = req.params;
    const sqlGet = "SELECT phone FROM contact where id = ?";
    db.query(sqlGet, id, (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})
//route to uodate otp in contact detail
app.put("/put/:id", (req, res) => {
    const { id } = req.params;
    const otp = req.body.randomNum;

    twilio.messages.create({
        from:"+91",
        to:`+91${id}`,
        body:`Hi! Your OTP is ${otp}. OTP testing from Vikash Rai [vikashrai.in@gmail.com]`
    }).then((res)=>{console.log("Message Sent")}).catch((err)=>{console.log("Error")})

    const sqlUpdate = "UPDATE contact SET otp=? WHERE phone=?";
    db.query(sqlUpdate, [otp, id], (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
})

app.listen(5000, () => {
    console.log(`Server running at 5000 http://localhost:5000`)
})
