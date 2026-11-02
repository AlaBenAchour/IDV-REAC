import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const projectName = "Code2Work Dashboard"
  const currentYear = new Date().getFullYear()

  return (
    <div>
      <h1>Welcome to {projectName}</h1>
      <p>React app successfully running in {currentYear} 🎉</p>
    </div>
  )
}

export default App