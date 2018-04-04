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
  let ipaddress = req.get("x-forwarded-for")
  let language = req.get('accept-language')
  if (os && ipaddress && language) {
    ipaddress = ipaddress.split(',')[0]
    language = language.split(',')[0]
    res.status(200).send({
      ipaddress,
      language,
      os: {name: os.name, version: os.version}
    })
  } else {
      res.status(400).send({ipaddress: null, language: null, os: {name: null, version: null}})
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`)
})