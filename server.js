// server.js

// init project
const express = require('express')
const app = express()
const parser = require('ua-parser-js');

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get("/whoami", (req, res, next) => {
  const os = new parser(req.headers['user-agent']).getOS()
  let language = req.get('accept-language')
  if (os && ipaddress && language) {
    language = language.split(',')[0]
    res.status(200).send({
      language,
      os: {name: os.name, version: os.version}
    })
  }
})