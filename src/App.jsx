import { useState } from 'react'
import GameCard from './components/GameCard'
import './App.css'

// Your complete project history, cleaned and formatted for the portfolio
const gamesData = [
  {
    id: 1,
    title: "Simple FPS",
    gifUrl: "", 
    startDate: "Jan 2025",
    endDate: "Mar 2025",
    tags: ["Unreal Engine", "C++", "FPS"],
    description: "My first game in Unreal Engine! It's a simple first-person shooter game where you shoot all the targets before the time runs out. Based on tutorials by Unreal Sensei."
  },
  {
    id: 2,
    title: "Diffusion-Limited Aggregation",
    gifUrl: "", 
    startDate: "Dec 2024",
    endDate: "Dec 2024",
    tags: ["Unity", "C#", "Simulation"],
    description: "A mathematical 3D & 2D Diffusion-Limited Aggregation Simulation built in Unity."
  },
  {
    id: 3,
    title: "Hydraulic Erosion",
    gifUrl: "", 
    startDate: "Nov 2024",
    endDate: "Dec 2024",
    tags: ["Unity", "C#", "Simulation"],
    description: "A custom Hydraulic Erosion Simulation acting on dynamically generated 3D terrain."
  },
  {
    id: 4,
    title: "Tomatoes to Scale",
    gifUrl: "", 
    startDate: "Aug 2024",
    endDate: "Aug 2024",
    tags: ["Unity", "2D Platformer", "Game Jam"],
    description: "A 2D platformer project designed and developed for the GMTK Game Jam 2024."
  },
  {
    id: 5,
    title: "Princess Dragon Slayer",
    gifUrl: "", 
    startDate: "Jul 2024",
    endDate: "Jul 2024",
    tags: ["Godot", "GDScript", "2D"],
    description: "My first game made with Godot! A 2D platformer featuring custom jumping and collectible mechanics."
  },
  {
    id: 6,
    title: "Spaceship VR",
    gifUrl: "", 
    startDate: "May 2024",
    endDate: "Jul 2024",
    tags: ["Unity", "VR", "C#"],
    description: "My first VR project in Unity. You play as an isolated robot in a spaceship, finding an energy source to hopefully escape."
  },
  {
    id: 7,
    title: "Fox Trot",
    gifUrl: "", 
    startDate: "Jun 2024",
    endDate: "Jun 2024",
    tags: ["Unity", "Platformer", "Game Jam"],
    description: "A small platformer game developed under rapid constraints for Arcade Jam 2024."
  },
  {
    id: 8,
    title: "Multiplier Merge",
    gifUrl: "", 
    startDate: "Aug 2023",
    endDate: "Feb 2024",
    tags: ["Unity", "Mobile", "Gumball Games"],
    description: "Merge and use multiplier gates to make an army of hundreds from just one! Published with Gumball Games."
  },
  {
    id: 9,
    title: "Welcome to Elemental High",
    gifUrl: "", 
    startDate: "Feb 2023",
    endDate: "Jul 2023",
    tags: ["Unity", "AI", "BSc Thesis"],
    description: "Developed for my BSc thesis: 'Video Game Dynamic Difficulty Adjustment Based on Player’s Skill'. Features complex logic to adapt to player behavior."
  },
  {
    id: 10,
    title: "Survivor Run",
    gifUrl: "", 
    startDate: "Nov 2022",
    endDate: "Mar 2023",
    tags: ["Unity", "C#", "Gumball Games"],
    description: "Run & gun all the zombies in your way with style and survive the end of the world."
  },
  {
    id: 11,
    title: "Crazy Miner",
    gifUrl: "", 
    startDate: "Jun 2022",
    endDate: "Jul 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Dive into the ground and mine valuable stones and gems!"
  },
  {
    id: 12,
    title: "Transport Evolution",
    gifUrl: "", 
    startDate: "May 2022",
    endDate: "Jun 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Pick up all the passengers on your way and upgrade your vehicle mechanics to see how far you can go."
  },
  {
    id: 13,
    title: "Parkour Army",
    gifUrl: "", 
    startDate: "Apr 2022",
    endDate: "May 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Control an army of traceurs to run and jump over city rooftops."
  },
  {
    id: 14,
    title: "Giant Idle",
    gifUrl: "", 
    startDate: "Mar 2022",
    endDate: "Apr 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Destroy the city and use the collected materials in an idle-upgrade loop."
  },
  {
    id: 15,
    title: "Drive Through 3D",
    gifUrl: "", 
    startDate: "Feb 2022",
    endDate: "Mar 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "A vehicular combat runner—drive through massive hordes of zombies."
  },
  {
    id: 16,
    title: "My Little Army",
    gifUrl: "", 
    startDate: "Feb 2022",
    endDate: "Mar 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Build an army to siege and take over enemy castles."
  },
  {
    id: 17,
    title: "Merge Vehicles",
    gifUrl: "", 
    startDate: "Jan 2022",
    endDate: "Feb 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Combine different vehicle parts and compete dynamically against other cars."
  },
  {
    id: 18,
    title: "Squish Run",
    gifUrl: "", 
    startDate: "Jan 2022",
    endDate: "Feb 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Physics-based runner where you control a rolling ball squishing obstacles."
  },
  {
    id: 19,
    title: "Lumberjack Skater",
    gifUrl: "", 
    startDate: "Dec 2021",
    endDate: "Jan 2022",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Ski and cut down trees on your way to gather wood and build dynamic bridges."
  },
  {
    id: 20,
    title: "Race Factor",
    gifUrl: "", 
    startDate: "Nov 2021",
    endDate: "Dec 2021",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Modify your car's power parameters and race against AI vehicles."
  },
  {
    id: 21,
    title: "Elastic Fight",
    gifUrl: "", 
    startDate: "Oct 2021",
    endDate: "Nov 2021",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Physics-based combat controlling an elastic character to knock down environments."
  },
  {
    id: 22,
    title: "Mafia Run 3D",
    gifUrl: "", 
    startDate: "Oct 2021",
    endDate: "Nov 2021",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Build a Mafia by hiring gangsters, fighting rival gangs, and taking over city territories."
  },
  {
    id: 23,
    title: "Ragdoll Escape!",
    gifUrl: "", 
    startDate: "Aug 2021",
    endDate: "Sep 2021",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "A physics puzzle where you rotate the environment to help a ragdoll character escape."
  },
  {
    id: 24,
    title: "Wrecking Helicopter 3D",
    gifUrl: "", 
    startDate: "Jul 2021",
    endDate: "Aug 2021",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Control a helicopter's momentum to swing a wrecking ball and destroy structures."
  },
  {
    id: 25,
    title: "Swarm Run 3D",
    gifUrl: "", 
    startDate: "May 2021",
    endDate: "Jul 2021",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Control a hungry swarm mechanic to consume everything in your path."
  },
  {
    id: 26,
    title: "Chameleon Race 3D",
    gifUrl: "", 
    startDate: "Apr 2021",
    endDate: "May 2021",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "Color-matching runner game adapting to environmental changes."
  },
  {
    id: 27,
    title: "Find'em All! 3D",
    gifUrl: "", 
    startDate: "Mar 2021",
    endDate: "Apr 2021",
    tags: ["Unity", "Mobile", "Dropout Games"],
    description: "A 3D spatial hidden object game."
  },
  {
    id: 28,
    title: "Backgammon 3D",
    gifUrl: "", 
    startDate: "Sep 2020",
    endDate: "Dec 2020",
    tags: ["Unity", "C#", "AI", "MCTS"],
    description: "Recreated the board game Backgammon with an advanced AI using Monte Carlo Tree Search. Players can play locally or against the AI with visible decision-making metrics."
  },
  {
    id: 29,
    title: "Medical Instruments Analysis",
    gifUrl: "", 
    startDate: "Jul 2019",
    endDate: "Sep 2019",
    tags: ["Unity", "C#", "Serious Games"],
    description: "A serious game designed to help amateur surgeons increase knowledge by detecting the correct placement of instruments through frame analysis."
  },
  {
    id: 30,
    title: "Cingdom",
    gifUrl: "", 
    startDate: "Dec 2018",
    endDate: "Jan 2019",
    tags: ["C", "Console", "Strategy"],
    description: "A text-driven strategy game built in Windows Console. Balance People, Court, and Treasury resources to survive in Campaign or Endless modes."
  }
]

function App() {
  const [selectedGame, setSelectedGame] = useState(null)

  return (
    <div className="portfolio-container">
      
      <header className="hero">
        <h1>Parsa Rahmati</h1>
        <h2>Game Developer & AI Architect</h2>
        <div className="social-links">
          <a href="#">Resume</a>
          <a href="https://github.com/ga-sw-ga">GitHub</a>
          <a href="https://linkedin.com/in/parsa-rahmati">LinkedIn</a>
        </div>
      </header>

      {/* Render the Grid */}
      <main className="game-grid">
        {gamesData.map(game => (
          <GameCard 
            key={game.id}
            title={game.title}
            gifUrl={game.gifUrl}
            startDate={game.startDate}
            endDate={game.endDate}
            tags={game.tags}
            onClick={() => setSelectedGame(game)} // Opens the modal!
          />
        ))}
      </main>

      {/* THE MODAL OVERLAY */}
      {selectedGame && (
        <div className="modal-overlay" onClick={() => setSelectedGame(null)}>
          
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <button className="close-btn" onClick={() => setSelectedGame(null)}>✕</button>
            
            <div className="modal-media">
              {selectedGame.gifUrl ? (
                <img src={selectedGame.gifUrl} alt={selectedGame.title} />
              ) : (
                <div className="placeholder-text">Larger GIF / Video Here</div>
              )}
            </div>
            
            <div className="modal-info">
              <h2>{selectedGame.title}</h2>
              <p className="modal-duration">{selectedGame.startDate} – {selectedGame.endDate}</p>
              
              <div className="modal-tags">
                {selectedGame.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              
              <p className="modal-description">{selectedGame.description}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default App