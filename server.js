/* eslint-disable no-console */
// Imports
const express = require('express')
const next = require('next')
const http = require('http')
const fs = require('fs')
const https = require('https')
require('dotenv').config()

// Express app initialization
const app = express()

// Variables
const PORT = process.env.APP_PORT
const local = process.env.NEXT_PUBLIC_ENVIRONMENT === 'local'

// Next.js setup
const nextjs = next({ dev: local, port: PORT })
const handle = nextjs.getRequestHandler()
const host = process.env.NEXT_PUBLIC_APP_HOSTNAME

// Prepare Next.js
nextjs
  .prepare()
  .then(() => {
    // Middleware to handle all requests
    app.all('*', (req, res) => handle(req, res))

    // Server setup based on environment
    if (local) {
      http.createServer(app).listen(PORT, err => {
        if (err) {
          console.error(`Error starting HTTP server: ${err}`)
          process.exit(1)
        }
        console.debug(`Application is running on ${host}`)
      })
    } else {
      const key = fs.readFileSync('[FILE_PATH]/privkey.pem')
      const cert = fs.readFileSync('[FILE_PATH]/fullchain.pem')
      const options = { key, cert }

      https.createServer(options, app).listen(PORT, err => {
        if (err) {
          console.error(`Error starting HTTPS server: ${err}`)
          process.exit(1)
        }
        console.debug(`Server listening on ${host}`)
      })
    }
  })
  .catch(err => {
    console.error('Error preparing Next.js:', err)
    process.exit(1)
  })
