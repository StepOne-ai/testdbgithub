const { uploadProcessedData, initializeFirebaseApp, getTheData } = require('./lib/firebase.js')
const { review } = require('./lib/review.js')
const { checkUsername } = require('./lib/validate.js')
const express = require('express');
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

app.get('/med', urlencodedParser, async (req, res) => {
  let bmstu = "something"
  let users = []
  let usernames = []
  let comments = []
  let dates = []
  let poses = []
  let neges = []
  let allData = await getTheData("users");
  let alerting = 0

  allData.forEach((data) => {
    let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
    let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
    let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
    let dateTo = formatDate(new Date(data["date"].seconds*1000))
    let posTo = JSON.stringify(data["pos"]).replaceAll('"', '')
    let negTo = JSON.stringify(data["neg"]).replaceAll('"', '')

    users.push(nameTo)
    usernames.push(usernameTo)
    comments.push(commentTo)
    dates.push(dateTo)
    poses.push(posTo)
    neges.push(negTo)
})

  return res.render('index', {result: {users, usernames, comments, dates, alerting, poses, neges, bmstu} })
});

app.post('/med', urlencodedParser, async (req, res) => {
  let users = []
  let usernames = []
  let comments = []
  let dates = []
  let poses = []
  let neges = []
  let allData = await getTheData("users");
  let bmstu = "something"

  if(req.body.name == "" || req.body.username == "" || req.body.comment == ""){
    allData.forEach(data => {
      let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
      let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
      let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
      let dateTo = formatDate(new Date(data["date"].seconds*1000))
      let posTo = JSON.stringify(data["pos"]).replaceAll('"', '')
      let negTo = JSON.stringify(data["neg"]).replaceAll('"', '')

      users.push(nameTo)
      usernames.push(usernameTo)
      comments.push(commentTo)
      dates.push(dateTo)
      poses.push(posTo)
      neges.push(negTo)
    })
    let alerting = 2
    return res.render('index', {result: {users, usernames, comments, dates, alerting, poses, neges, bmstu} })
  } else {
    const name = req.body.name;
    const username = req.body.username;
    const comment = req.body.comment;
    const date = new Date();
    const rev = await review(comment);
    const pos = rev.pos
    const neg = rev.neg
    let alerting = 1
    //Validating
    if (await checkUsername(username) == 'Does not exist') {
      alerting = 3
    }

    //Check if the user is already in the list 0 = okay, 1 = success, 2 = error
    // 3 = username does not exist
    allData.forEach(data => {
      if(data["username"] == username){
        alerting = 2
      }
    })

    if (alerting == 1) {
      uploadProcessedData(name, username, comment, date, pos, neg, "users");
      let allData = await getTheData("users");
      allData.forEach(data => {
        let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
        let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
        let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
        let dateTo = formatDate(new Date(data["date"].seconds*1000))
        let posTo = JSON.stringify(data["pos"]).replaceAll('"', '')
        let negTo = JSON.stringify(data["neg"]).replaceAll('"', '')

        users.push(nameTo)
        usernames.push(usernameTo)
        comments.push(commentTo)
        dates.push(dateTo)
        poses.push(posTo)
        neges.push(negTo)
      })

      return res.render('index', {result: {users, usernames, comments, dates, alerting, poses, neges, bmstu} })
    } else {
      allData.forEach(data => {
        let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
        let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
        let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
        let dateTo = formatDate(new Date(data["date"].seconds*1000))
        let posTo = JSON.stringify(data["pos"]).replaceAll('"', '')
        let negTo = JSON.stringify(data["neg"]).replaceAll('"', '')

        users.push(nameTo)
        usernames.push(usernameTo)
        comments.push(commentTo)
        dates.push(dateTo)
        poses.push(posTo)
        neges.push(negTo)
      })
      return res.render('index', {result: {users, usernames, comments, dates, alerting, poses, neges, bmstu} })
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
  let poses = []
  let neges = []
  let allData = await getTheData("usersBmstu");
  let alerting = 0

  allData.forEach((data) => {
    let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
    let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
    let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
    let dateTo = formatDate(new Date(data["date"].seconds*1000))
    let posTo = JSON.stringify(data["pos"]).replaceAll('"', '')
    let negTo = JSON.stringify(data["neg"]).replaceAll('"', '')

    users.push(nameTo)
    usernames.push(usernameTo)
    comments.push(commentTo)
    dates.push(dateTo)
    poses.push(posTo)
    neges.push(negTo)
})

  return res.render('index', {result: {users, usernames, comments, dates, alerting, poses, neges, bmstu} })
});

app.post('/bmstu', urlencodedParser, async (req, res) => {
  let users = []
  let usernames = []
  let comments = []
  let dates = []
  let poses = []
  let neges = []
  let allData = await getTheData("usersBmstu");
  let bmstu = "bmstu"

  if(req.body.name == "" || req.body.username == "" || req.body.comment == ""){
    allData.forEach(data => {
      let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
      let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
      let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
      let dateTo = formatDate(new Date(data["date"].seconds*1000))
      let posTo = JSON.stringify(data["pos"]).replaceAll('"', '')
      let negTo = JSON.stringify(data["neg"]).replaceAll('"', '')

      users.push(nameTo)
      usernames.push(usernameTo)
      comments.push(commentTo)
      dates.push(dateTo)
      poses.push(posTo)
      neges.push(negTo)
    })
    let alerting = 2
    return res.render('index', {result: {users, usernames, comments, dates, alerting, poses, neges, bmstu} })
  } else {
    const name = req.body.name;
    const username = req.body.username;
    const comment = req.body.comment;
    const date = new Date();
    const rev = await review(comment);
    const pos = rev.pos
    const neg = rev.neg
    let alerting = 1
    //Validating
    if (await checkUsername(username) == 'Does not exist') {
      alerting = 3
    }

    //Check if the user is already in the list 0 = okay, 1 = success, 2 = error
    // 3 = username does not exist
    allData.forEach(data => {
      if(data["username"] == username){
        alerting = 2
      }
    })

    if (alerting == 1) {
      uploadProcessedData(name, username, comment, date, pos, neg, "usersBmstu");
      let allData = await getTheData("usersBmstu");
      allData.forEach(data => {
        let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
        let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
        let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
        let dateTo = formatDate(new Date(data["date"].seconds*1000))
        let posTo = JSON.stringify(data["pos"]).replaceAll('"', '')
        let negTo = JSON.stringify(data["neg"]).replaceAll('"', '')

        users.push(nameTo)
        usernames.push(usernameTo)
        comments.push(commentTo)
        dates.push(dateTo)
        poses.push(posTo)
        neges.push(negTo)
      })

      return res.render('index', {result: {users, usernames, comments, dates, alerting, poses, neges, bmstu} })
    } else {
      allData.forEach(data => {
        let nameTo = JSON.stringify(data["name"]).replaceAll('"', '')
        let usernameTo = JSON.stringify(data["username"]).replaceAll('"', '')
        let commentTo = JSON.stringify(data["comment"]).replaceAll('"', '')
        let dateTo = formatDate(new Date(data["date"].seconds*1000))
        let posTo = JSON.stringify(data["pos"]).replaceAll('"', '')
        let negTo = JSON.stringify(data["neg"]).replaceAll('"', '')

        users.push(nameTo)
        usernames.push(usernameTo)
        comments.push(commentTo)
        dates.push(dateTo)
        poses.push(posTo)
        neges.push(negTo)
      })
      return res.render('index', {result: {users, usernames, comments, dates, alerting, poses, neges, bmstu} })
    }
  }
})

// User Data
app.get('/user', (req, res) => {
  return res.render('ipgetter')
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`)
})

module.exports = app;