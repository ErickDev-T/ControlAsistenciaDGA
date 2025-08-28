import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Header from './component/Header'
import { Footer } from './component/Footer'
// import './App.css'

function App() {


  return (
    <div className="min-h-screen flex flex-col bg-slate-100" >
      <Header/>
      <Footer/>
    </div>
  )
}

export default App
