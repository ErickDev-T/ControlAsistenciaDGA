import Header from './component/Header'
import { Footer } from './component/Footer'
import HomePage from './component/HomePage'
import { Home } from 'lucide-react'
function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      {/* Contenido principal */}
      <main className="flex-grow">
        <HomePage/>
      </main>

      <Footer />
    </div>
  )
}

export default App
