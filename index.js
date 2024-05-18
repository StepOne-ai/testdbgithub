const express = require('express')
const app = express()
const port = 3000

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

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
})
  
module.exports = app;