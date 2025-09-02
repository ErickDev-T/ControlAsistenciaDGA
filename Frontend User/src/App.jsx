
import Header from './component/Header'
import { Footer } from './component/Footer'
import HomePage from './component/HomePage'
import { Routes, Route } from 'react-router-dom'
import FormStandar from "./component/forms/FormStandar";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/FormStandar" element={<FormStandar />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
