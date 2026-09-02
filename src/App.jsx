// src/App.jsx
import { useState } from 'react'
import GameCard from './components/GameCard'
import './App.css'

function App() {
  const [selectedGame, setSelectedGame] = useState(null)

  return (
    <div className="portfolio-container">
      
      <header className="hero">
        <h1>Parsa Rahmati</h1>
        <h2>Software Engineer & Game Developer</h2>
        <div className="social-links">
          <a href="#">Resume</a>
          <a href="https://github.com/ga-sw-ga">GitHub</a>
          <a href="https://linkedin.com/in/parsa-rahmati">LinkedIn</a>
        </div>
      </header>

      <main className="game-grid">
        {/* Card 1: The Detective Game */}
        <GameCard 
          title="The Interrogation of Adrian Gale"
          gifUrl="" 
          startDate="Dec 2025"
          endDate="Aug 2026"
          tags={["Unreal Engine 5", "Python", "LLMs", "C++"]}
          onClick={() => console.log("Clicked Adrian Gale")}
        />

        {/* Card 2: The Game Jam */}
        <GameCard 
          title="Rhythm Car Prototype"
          gifUrl="" 
          startDate="May 2026"
          endDate="May 2026"
          tags={["Unity", "C#", "Game Jam"]}
          onClick={() => console.log("Clicked Rhythm Car")}
        />

        {/* Card 3: The Startup */}
        <GameCard 
          title="Gumball Games Titles"
          gifUrl="" 
          startDate="Aug 2022"
          endDate="Jan 2024"
          tags={["Unity", "Mobile", "C#"]}
          onClick={() => console.log("Clicked Gumball")}
        />
      </main>

    </div>
  )
}

export default App