const { uploadProcessedData, initializeFirebaseApp } = require('./lib/firebase.js')

const express = require('express')
const app = express()
const port = 3000
initializeFirebaseApp();

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));

const urlencodedParser = express.urlencoded({extended: false});

app.get('/', (req, res) => {
    return res.render('index')
});

app.post('/', urlencodedParser, (req, res) => {
  return res.render('index')
})

app.get('/test-upload', async (req, res) => {
  await uploadProcessedData();
  return res.send({status: 200});
})

app.get('/ass', async (req, res) => {
  return res.send({status: 200});
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})
  
module.exports = app;