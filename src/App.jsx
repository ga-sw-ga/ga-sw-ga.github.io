import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import GameCard from './components/GameCard'
import './App.css'

const isVideo = (url) => typeof url === 'string' && /\.(mp4|webm)$/i.test(url.split('?')[0])
const isImage = (url) => typeof url === 'string' && /\.(png|jpe?g)$/i.test(url.split('?')[0])

const gamesData = [
{
    id: 1,
    title: "The Interrogation of Adrian Gale",
    media: ["/projects/adrian-gale/1.mp4"], 
    startDate: "Jul 2024",
    endDate: "May 2026",
    role: "Software Developer & AI Architect",
    tags: ["Unreal Engine", "Python", "REST APIs", "AWS Bedrock", "LLMs"],
    description: "Architected a multi-agent AI system coordinating autonomous LLMs via structured knowledge trees. Engineered a Python backend service communicating via asynchronous REST APIs and AWS Bedrock to automate dynamic interactive narrative delivery (Accepted AIIDE 2026)."
  },
  {
    id: 2,
    title: "Calgary Digital Twin Prototype",
    media: ["/projects/digital-twin/1.png"],
    startDate: "May 2025",
    endDate: "Apr 2026",
    role: "Data & Software Engineering Intern",
    tags: ["JavaScript", "PostgreSQL", "Python", "MongoDB", "Full-Stack"],
    description: "Engineered a full-stack web dashboard for the City of Calgary using JavaScript and PostgreSQL to visualize city planning data. Trained machine learning models in Python to predict transit vehicle delays."
  },
  {
    id: 3,
    title: "Multiplier Merge",
    media: ["/projects/multiplier-merge/1.mp4"],
    startDate: "Aug 2023",
    endDate: "Feb 2024",
    role: "Game & Software Developer",
    tags: ["Unity", "C#", "Mobile Optimization"],
    description: "Engineered a custom hyper-casual mobile framework in Unity (C#). Integrated third-party mobile advertising SDKs and event telemetry, securing a product testing deal with MOONEE Publishing."
  },
  {
    id: 4,
    title: "Survivor Run",
    media: ["/projects/survivor-run/1.mp4"],
    startDate: "Nov 2022",
    endDate: "Mar 2023",
    role: "Game & Software Developer",
    tags: ["Unity", "C#", "Mobile Optimization"],
    description: "Programmed core gameplay loops and dynamic multiplier logic. Profiled object pooling and memory allocation to eliminate garbage collection spikes and guarantee 60 FPS across mobile hardware."
  },
  {
    id: 5,
    title: "Welcome to Elemental High",
    media: ["/projects/elemental-high/1.mp4"],
    startDate: "Feb 2023",
    endDate: "Jul 2023",
    role: "Solo Developer",
    tags: ["C++", "Dynamic Difficulty", "PC"],
    description: "Developed for my BSc thesis: 'Dynamic Difficulty Adjustment Algorithms in C++'. Engineered complex algorithmic logic to adapt game difficulty in real-time based on player behavior."
  },
  {
    id: 6,
    title: "Crazy Miner",
    media: ["/projects/crazy-miner/1.mp4"],
    startDate: "Jun 2022",
    endDate: "Jul 2022",
    role: "Game Designer",
    tags: ["Unity", "C#", "Mobile"],
    description: "Published interactive mobile title managing rapid prototyping pipelines from concept to app store release."
  },
  {
    id: 7,
    title: "Merge Vehicles",
    media: ["/projects/merge-car/1.mp4"],
    startDate: "Jan 2022",
    endDate: "Feb 2022",
    role: "Game Developer",
    tags: ["Unity", "C#", "Mobile"],
    description: "Combine different vehicle parts and compete dynamically against other cars."
  },
  {
    id: 8,
    title: "Race Factor",
    media: ["/projects/race-factor/1.mp4"],
    startDate: "Nov 2021",
    endDate: "Dec 2021",
    role: "Game Developer & Designer",
    tags: ["Unity", "C#", "Mobile"],
    description: "Modify your car's power parameters and race against AI vehicles."
  },
  {
    id: 9,
    title: "Elastic Fight",
    media: ["/projects/loose-hands/1.mp4"],
    startDate: "Oct 2021",
    endDate: "Nov 2021",
    role: "Game Developer",
    tags: ["Unity", "C#", "Mobile"],
    description: "Physics-based combat controlling an elastic character to knock down environments."
  },
  {
    id: 10,
    title: "Ragdoll Escape!",
    media: ["/projects/ragdoll-escape/1.mp4"],
    startDate: "Aug 2021",
    endDate: "Sep 2021",
    role: "Game Developer",
    tags: ["Unity", "C#", "Mobile"],
    description: "A physics puzzle where you rotate the environment to help a ragdoll character escape."
  },
  {
    id: 11,
    title: "Find'em All! 3D",
    media: ["/projects/find-em-all/1.mp4"],
    startDate: "Mar 2021",
    endDate: "Apr 2021",
    role: "Game Developer & Designer",
    tags: ["Unity", "C#", "Mobile"],
    description: "A 3D spatial hidden object game."
  },
  {
    id: 12,
    title: "Cingdom",
    media: ["/projects/cingdom/1.mp4"],
    startDate: "Dec 2018",
    endDate: "Jan 2019",
    role: "Solo Developer",
    tags: ["C", "Strategy", "PC"],
    description: "A text-driven strategy game built in Windows Console. Balance People, Court, and Treasury resources to survive in Campaign or Endless modes."
  }
]

function App() {
  const [selectedGame, setSelectedGame] = useState(null)
  const modalContentRef = useRef(null)
  const infoRef = useRef(null)
  const descRef = useRef(null)

  // Prevent background scrolling and handle Escape key to close modal
  useEffect(() => {
    if (!selectedGame) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedGame(null)
      }
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedGame])

  // Calculate maximum media height so the image can be reasonably big,
  // while ensuring the first line of the description is always visible when opened.
  // Beyond this point, the modal is scrollable for the remaining lines of description.
  useLayoutEffect(() => {
    if (!selectedGame) return

    const calculateMediaLimit = () => {
      if (!modalContentRef.current || !infoRef.current || !descRef.current) return

      // Ensure modal starts at the top
      modalContentRef.current.scrollTop = 0

      const windowH = window.innerHeight
      const modalMaxH = windowH * 0.9

      const infoRect = infoRef.current.getBoundingClientRect()
      const descRect = descRef.current.getBoundingClientRect()
      const descStyle = window.getComputedStyle(descRef.current)
      const lineHeight = parseFloat(descStyle.lineHeight) || 28

      // Vertical distance from top of modal-info to bottom of the description's first line
      const headerToFirstLineBottom = (descRect.top - infoRect.top) + lineHeight
      
      // Margin at the bottom so the first line is clearly visible with breathing room
      const safetyMargin = 20

      // Maximum media height that still leaves room for title, tags, and first line of description
      const maxAllowed = Math.floor(modalMaxH - headerToFirstLineBottom - safetyMargin)
      
      // Clamp between a minimum reasonable height (160px) and natural 16:9 on 800px max width (450px)
      const finalMaxHeight = Math.max(160, Math.min(450, maxAllowed))

      modalContentRef.current.style.setProperty('--modal-media-max-h', `${finalMaxHeight}px`)
    }

    calculateMediaLimit()
    window.addEventListener('resize', calculateMediaLimit)
    return () => window.removeEventListener('resize', calculateMediaLimit)
  }, [selectedGame])

  return (
    <div className="portfolio-container">
      
      <header className="hero">
        <h1>Parsa Rahmati</h1>
        <h2>Software Engineer | AI Architect | Game Developer</h2>
        <div className="social-links">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          <a href="https://linkedin.com/in/parsa-rahmati" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </header>

      {/* Render the Grid */}
      <main className="game-grid">
        {gamesData.map(game => (
          <GameCard 
            key={game.id}
            title={game.title}
            role={game.role} // Passes the role to the card!
            // Use optional chaining (?.) so it doesn't crash if the array is empty
            gifUrl={game.media?.[0]} 
            startDate={game.startDate}
            endDate={game.endDate}
            tags={game.tags}
            onClick={() => setSelectedGame(game)}
          />
        ))}
      </main>

      {/* THE MODAL OVERLAY */}
      {selectedGame && (
        <div className="modal-overlay" onClick={() => setSelectedGame(null)}>
          
          <div className="modal-content" ref={modalContentRef} onClick={(e) => e.stopPropagation()}>
            
            <button className="close-btn" onClick={() => setSelectedGame(null)}>✕</button>
            
            <div className="modal-media">
              {/* Check if the selected game has anything in its media array */}
              {selectedGame.media && selectedGame.media.length > 0 ? (
                // Render video or image depending on the file extension
                isVideo(selectedGame.media[0]) ? (
                  <>
                    <video
                      src={selectedGame.media[0]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      aria-hidden="true"
                      tabIndex={-1}
                      className="modal-media-bg"
                    />
                    <video
                      src={selectedGame.media[0]}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="modal-media-fg"
                    />
                  </>
                ) : isImage(selectedGame.media[0]) ? (
                  <>
                    <img
                      src={selectedGame.media[0]}
                      alt=""
                      aria-hidden="true"
                      className="modal-media-bg"
                    />
                    <img
                      src={selectedGame.media[0]}
                      alt={selectedGame.title}
                      className="modal-media-fg"
                    />
                  </>
                ) : (
                  <div className="placeholder-text">Media format not supported</div>
                )
              ) : (
                <div className="placeholder-text">Larger GIF / Video Here</div>
              )}
            </div>
            
            <div className="modal-info" ref={infoRef}>
              <h2>{selectedGame.title}</h2>
              {/* Render the role in the modal */}
              <h4 className="modal-role">{selectedGame.role}</h4>
              <p className="modal-duration">{selectedGame.startDate} – {selectedGame.endDate}</p>
              
              <div className="modal-tags">
                {selectedGame.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
              
              <p className="modal-description" ref={descRef}>{selectedGame.description}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default App