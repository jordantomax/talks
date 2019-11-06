const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const webpush = require('web-push')

const app = express()
const port = 4000
const dummyDb = { subscription: null }
const vapidKeys = {
  publicKey: 'BDO5rzkGmAbleWgdfFiAF6R2ElnPcRqJV_mK4Juj8gwkOETqFjvn07M3x5gqS8MQo4vKO4j8WVTURJt_L5Qrm1o',
  privateKey: 'soXj6Xf2oSrZXDTZjDanOW3MargWCgSEdul5lvFkTIA'
}

app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))
webpush.setVapidDetails(
  'mailto:jordancooperman@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)

async function saveToDatabase (subscription) {
  dummyDb.subscription = subscription
}

function sendNotification (subscription, dataToSend = '') {
  webpush.sendNotification(subscription, dataToSend)
}

app.post('/save-subscription', async (req, res) => {
  const subscription = req.body
  await saveToDatabase(subscription)
  console.log(`Saved subscription: ${subscription}`)
  res.json({ message: 'success' })
})

app.get('/send-notification', (req, res) => {
  const subscription = dummyDb.subscription
  const message = 'Such JavaScript 🐲'
  sendNotification(subscription, message)
  res.json({ message: 'message sent' })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
