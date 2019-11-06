console.log('Hello from service worker!')

const publicKey = 'BDO5rzkGmAbleWgdfFiAF6R2ElnPcRqJV_mK4Juj8gwkOETqFjvn07M3x5gqS8MQo4vKO4j8WVTURJt_L5Qrm1o'
const SERVER_URL = 'http://localhost:4000/save-subscription'

self.addEventListener('push', function (e) {
  console.log('push')
  self.registration.showNotification(e.data.text())
})

// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
function urlB64ToUint8Array (base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

// saveSubscription saves the subscription to the backend
async function saveSubscription (subscription) {
  const response = await fetch(SERVER_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(subscription)
  })
  return response.json()
}

self.addEventListener('activate', async () => {
  try {
    const options = {
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(publicKey)
    }
    const subscription = await self.registration.pushManager.subscribe(options)
    console.log(JSON.stringify(subscription))
    const response = await saveSubscription(subscription)
    console.log(response)
  } catch (err) {
    console.log('Error', err)
  }
})
