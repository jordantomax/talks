# How the Notifications API Works

Jordan Cooperman

Twitter: **@jordantomax**
Email: **jordancooperman@gmail.com**

---

# The Talk, the Code

https://github.com/jordantomax/talks/tree/master/notifications

---

[.text: alignment(center)]

# Our Browser has Superpowers 💪

![inline](assets/whatwebcando.png)

whatwebcando.today

---

# Let's Talk About Notifications

![inline 120%](assets/test-notification.png)

---
[.build-lists: true]

# Notifications API Outline

1. Local notifications
2. Service workers
3. Subscriptions

---

# Notifications API Outline

1. 👉 **Local notifications** 👈
2. Service workers
3. Subscriptions

---

# Local Notifications

1. Request permission
2. Show notification

---

# 1. Request permission

```javascript
const permission = await Notification.requestPermission()
// possible results are "default", "granted", "denied"
```

![inline 120%](assets/permission-prompt.png)

---
[.text: alignment(center)]

# You can't edit permissions

Once selected, only the user can edit then deep in settings

👇
![inline 100%](assets/settings-site.png)
👇
![inline 100%](assets/settings-notifications.png)
👇
![inline 100%](assets/settings-permission.png)

---

# 2. Show notification

Assuming the user has granted permission

```javascript
  new Notification('Much JavaScript')
```

![inline 120%](assets/test-notification.png)

---

# Notifications API Outline

1. 👉 **Local notifications** 👈
2. Service workers
3. Subscriptions

---

# Notifications API Outline

1. Local notifications
2. 👉 **Service workers** 👈
3. Subscriptions

---

# Service workers

Those things you've seen but haven't seen

![inline](assets/goodwill.jpg)

---

# Create React App Comes with One

![inline](assets/cra-sw.png)

---

# What are service workers?

Service workers are .js files that run on separate threads to receive push messages from a server (even when app is inactive), proxy network requests, etc.

## Getting started

1. Register the worker 👷‍♀️ 👷‍♂️
2. Harness the power 🐲 👊

---

# 1. Register the Worker 👷‍♀️ 👷‍♂️

```javascript
// app.js
async function registerServiceWorker () {
  const sw = await navigator.serviceWorker.register('/service.js')
  return sw
}

// public/service.js (This is a public service announcement!)
console.log('hello from the service worker!')
```

---

# Confirm registration

![inline](assets/inspector-service-worker-tab.png)

---

# 2. Harness the power 🐲 👊

Prepare for the push

```javascript
// service.js
console.log('Hello from service worker!')

self.addEventListener('push', function (e) {
  self.registration.showNotification('Much JavaScript')
})
```

---

# Send it a test

![inline](assets/inspector-service-worker-tab-highlight-push.png)

---

# Notifications API Outline

1. Local notifications
2. 👉 **Service workers** 👈
3. Subscriptions

---

# Notifications API Outline

1. Local notifications
2. Service workers
3. 👉 **Subscriptions** 👈

---

# 3. Subscriptions

1. Setup the node server
2. Setup serviceWorker subscriptions

---

# Setup the node server

```javascript
// server.js
// ... Setup express server, CORS, webpush lib

const dummyDb = {}

app.post('/save-subscription', async (req, res) => {
  dummyDb.subscription = req.body
  res.json({ message: 'success' })
})

app.get('/send-notification', (req, res) => {
  webpush.sendNotification(dummyDb.subscription, 'Such JavaScript 🐲')
  res.json({ message: 'message sent' })
})
```

---
[.code-highlight: all]
[.code-highlight: 5]
[.code-highlight: 8]
[.code-highlight: 14-16]

# Retrieve and save a push endpoint

```javascript
// service.js
const options = { ... } // See Github repo for option values

// Returns an endpoint that we can hit to send the notification
const subscription = await self.registration.pushManager.subscribe(options)

// Save the endpoint in our backend
const response = await fetch('http://localhost:4000/save-subscription', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(subscription)
})

self.addEventListener('push', function (e) {
  self.registration.showNotification(e.data.text())
})
```

---
[.build-lists: true]

# Things to consider

- Save push endpoint in a real database
- Code defensively for serviceWorker failures
- Authentication with push server requires specific keys, but don't hard code your keys!

---

# Browser support

We need both service worker support and push notification support! This is a progressive web **ENHANCEMENT**, know your audience.

![inline](assets/browser-support.png)

---

# To summarize

1. Local notifications
2. Service workers
3. Subscriptions

---

# Tools and Resources

- https://github.com/jordantomax/talks/tree/master/notifications

- https://medium.com/izettle-engineering/beginners-guide-to-web-push-notifications-using-service-workers-cb3474a17679

- https://github.com/web-push-libs/web-push

---

# Thank you

Jordan Cooperman

Twitter: **@jordantomax**
Email: **jordancooperman@gmail.com**
