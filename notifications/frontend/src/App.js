import React, { useState, useEffect } from 'react'
import './App.css'

async function registerServiceWorker () {
  const sw = await navigator.serviceWorker.register('/service.js')
  return sw
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
    </div>
  )
}

export default App
