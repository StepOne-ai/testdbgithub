const { uploadProcessedData, initializeFirebaseApp, getTheData } = require('./lib/firebase.js')

const express = require('express')
const app = express()
const port = 3000
initializeFirebaseApp();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

const urlencodedParser = express.urlencoded({extended: false});

function formatDate(date) {
  let datePart = [
    date.getMonth() + 1,
    date.getDate(),
    date.getFullYear()
  ].map((n, i) => n.toString().padStart(i === 2 ? 4 : 2, "0")).join("/");
  let timePart = [
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  ].map((n, i) => n.toString().padStart(2, "0")).join(":");
  return datePart + " " + timePart;
}

app.get('/', urlencodedParser, async (req, res) => {
  let bmstu = "something"
  let users = []
  let usernames = []
  let comments = []
  let dates = []
  let allData = await getTheData("users");
  let alerting = 0

  allData.forEach((data) => {
    let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
    let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
    let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
    let dateTo = formatDate(new Date(data["date"].seconds*1000))

    users.push(nameTo)
    usernames.push(usernameTo)
    comments.push(commentTo)
    dates.push(dateTo)
  })

  return res.render('index', {result: {users, usernames, comments, dates, alerting, bmstu} })
});

app.post('/', urlencodedParser, async (req, res) => {
  let bmstu = "something"
  let users = []
  let usernames = []
  let comments = []
  let dates = []
  let allData = await getTheData("users");

  if(req.body.name == "" || req.body.username == "" || req.body.comment == ""){
    allData.forEach(data => {
      let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
      let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
      let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
      let dateTo = formatDate(new Date(data["date"].seconds*1000))

      users.push(nameTo)
      usernames.push(usernameTo)
      comments.push(commentTo)
      dates.push(dateTo)
    })

    let alerting = 2
    return res.render('index', {result: {users, usernames, comments, dates, alerting, bmstu} })
  } else {
    const name = req.body.name;
    const username = req.body.username;
    const comment = req.body.comment;
    const date = new Date();

    //Check if the user is already in the list 0 = okay, 1 = success, 2 = error
    let alerting = 1
    allData.forEach(data => {
      if(data["username"] == username){
        alerting = 2
      }
    })

    if (alerting == 1) {
      uploadProcessedData(name, username, comment, date, "users");
      let allData = await getTheData("users");
      allData.forEach(data => {
        let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
        let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
        let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
        let dateTo = formatDate(new Date(data["date"].seconds*1000))
        users.push(nameTo)
        usernames.push(usernameTo)
        comments.push(commentTo)
        dates.push(dateTo)
      })

      return res.render('index', {result: {users, usernames, comments, dates, alerting, bmstu} })
    } else {
      allData.forEach(data => {
        let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
        let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
        let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
        let dateTo = formatDate(new Date(data["date"].seconds*1000))

        users.push(nameTo)
        usernames.push(usernameTo)
        comments.push(commentTo)
        dates.push(dateTo)
      })
      return res.render('index', {result: {users, usernames, comments, dates, alerting, bmstu} })
    }
  }
})

// Bauman Part

app.get('/bmstu', urlencodedParser, async (req, res) => {
  let bmstu = "bmstu"
  let users = []
  let usernames = []
  let comments = []
  let dates = []
  let allData = await getTheData("usersBmstu");
  let alerting = 0

  allData.forEach((data) => {
    let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
    let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
    let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
    let dateTo = formatDate(new Date(data["date"].seconds*1000))

    users.push(nameTo)
    usernames.push(usernameTo)
    comments.push(commentTo)
    dates.push(dateTo)
  })

  return res.render('index', {result: {users, usernames, comments, dates, alerting, bmstu} })
});

app.post('/bmstu', urlencodedParser, async (req, res) => {
  let users = []
  let usernames = []
  let comments = []
  let dates = []
  let allData = await getTheData("usersBmstu");
  let bmstu = "bmstu"

  if(req.body.name == "" || req.body.username == "" || req.body.comment == ""){
    allData.forEach(data => {
      let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
      let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
      let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
      let dateTo = formatDate(new Date(data["date"].seconds*1000))

      users.push(nameTo)
      usernames.push(usernameTo)
      comments.push(commentTo)
      dates.push(dateTo)
    })
    let alerting = 2
    return res.render('index', {result: {users, usernames, comments, dates, alerting, bmstu} })
  } else {
    const name = req.body.name;
    const username = req.body.username;
    const comment = req.body.comment;
    const date = new Date();

    //Check if the user is already in the list 0 = okay, 1 = success, 2 = error
    let alerting = 1
    allData.forEach(data => {
      if(data["username"] == username){
        alerting = 2
      }
    })

    if (alerting == 1) {
      uploadProcessedData(name, username, comment, date, "usersBmstu");
      console.log("upload success")
      let allData = await getTheData("usersBmstu");
      allData.forEach(data => {
        let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
        let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
        let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
        let dateTo = formatDate(new Date(data["date"].seconds*1000))

        users.push(nameTo)
        usernames.push(usernameTo)
        comments.push(commentTo)
        dates.push(dateTo)
      })

      return res.render('index', {result: {users, usernames, comments, dates, alerting, bmstu} })
    } else {
      allData.forEach(data => {
        let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
        let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
        let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
        let dateTo = formatDate(new Date(data["date"].seconds*1000))

        users.push(nameTo)
        usernames.push(usernameTo)
        comments.push(commentTo)
        dates.push(dateTo)
      })
      return res.render('index', {result: {users, usernames, comments, dates, alerting, bmstu} })
    }
  }
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})

module.exports = app;