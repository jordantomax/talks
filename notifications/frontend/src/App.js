import React, { useState, useEffect } from 'react'
import './App.css'

async function registerServiceWorker () {
  const sw = await navigator.serviceWorker.register('/service.js')
  return sw
}

function sendLocalPush () {
  new Notification('Local Push 😬')
}

function sendServerPush () {
  fetch('http://localhost:4000/send-notification')
}

function App () {
  const [permission, setPermission] = useState('default')

  useEffect(() => {
    setPermission(window.Notification.permission)
  }, [])

  async function requestPermission () {
    const permission = await window.Notification.requestPermission()
    setPermission(permission)
  }

  return (
    <div id='app'>
      <div>
        Permission:
        <span className={`permission ${permission}`}> {permission}</span>
      </div>

      <button onClick={requestPermission}>Request Permission</button>

      <button onClick={registerServiceWorker}>Register Service Worker</button>

      <button onClick={sendLocalPush}>Send Local Push</button>

      <button onClick={sendServerPush}>Send Server Push</button>
    </div>
  )
}

export default App
