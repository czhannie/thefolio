// src/pages/GamePage.js
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

const allCards = [
  { name: "rose", icon: "🌹" },
  { name: "sunflower", icon: "🌻" },
  { name: "cherry", icon: "🌸" },
  { name: "tulip", icon: "🌷" },
  { name: "hibiscus", icon: "🌺" },
  { name: "daisy", icon: "🌼" },
  { name: "cactus", icon: "🌵" },
  { name: "maple", icon: "🍁" },
  { name: "herb", icon: "🌿" },
  { name: "bouquet", icon: "💐" },
];

function GamePage() {
  const [difficulty, setDifficulty] = useState(null);
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [isWon, setIsWon] = useState(false);

  // Checks for a win every time the solved array changes
  useEffect(() => {
    if (cards.length > 0 && solved.length === cards.length / 2) {
      setTimeout(() => {
        setIsWon(true);
        const colors = ["#A65D73", "#E6A8B8", "#fcfaf8"];
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors,
        });
      }, 600);
    }
  }, [solved, cards]);

  const startLevel = (level) => {
    let pairCount = level === "easy" ? 6 : level === "medium" ? 8 : 10;
    let selectedCards = allCards.slice(0, pairCount);

    // Duplicate, shuffle, and add a unique ID for React's map key
    let deck = [...selectedCards, ...selectedCards]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(deck);
    setDifficulty(level);
    setFlipped([]);
    setSolved([]);
    setIsWon(false);
  };

  const handleCardClick = (index) => {
    // Prevent clicking if locked, already flipped, or already solved
    if (
      disabled ||
      flipped.includes(index) ||
      solved.includes(cards[index].name)
    )
      return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    // If two cards are flipped, check for a match
    if (newFlipped.length === 2) {
      setDisabled(true);
      const firstCard = cards[newFlipped[0]].name;
      const secondCard = cards[newFlipped[1]].name;

      if (firstCard === secondCard) {
        setSolved([...solved, firstCard]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 1000); // 1 second delay before flipping back
      }
    }
  };

  const resetToMenu = () => {
    setDifficulty(null);
    setIsWon(false);
    setCards([]);
  };

  return (
    <div className="game-container">
      {/* We use <Link> instead of <a href> to avoid page reloads */}
      <Link to="/home" className="back-btn">
        ← Return Home
      </Link>

      <h1 style={{ fontSize: "5vmin", textAlign: "center" }}>
        The Secret Garden
      </h1>
      <div className="game-info">
        {difficulty ? "Restore the Full Garden" : "Select Difficulty"}
      </div>

      {!difficulty ? (
        <div id="level-menu">
          <button className="level-btn" onClick={() => startLevel("easy")}>
            Seedling (4x3)
          </button>
          <button className="level-btn" onClick={() => startLevel("medium")}>
            Sapling (4x4)
          </button>
          <button className="level-btn" onClick={() => startLevel("hard")}>
            Full Bloom (5x4)
          </button>
        </div>
      ) : (
        <div
          className="memory-game"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${difficulty === "hard" ? 5 : 4}, 1fr)`,
          }}
        >
          {cards.map((card, index) => {
            const isFlipped =
              flipped.includes(index) || solved.includes(card.name);
            return (
              <div
                key={card.id}
                className={`memory-card ${isFlipped ? "flip" : ""}`}
                onClick={() => handleCardClick(index)}
              >
                <div className="front-face">{card.icon}</div>
                <div className="back-face"></div>
              </div>
            );
          })}
        </div>
      )}

      {isWon && (
        <div id="win-message" style={{ display: "block" }}>
          <h2
            style={{
              fontWeight: 400,
              margin: 0,
              fontSize: "30px",
              color: "var(--text-color)",
            }}
          >
            Garden Restored!
          </h2>
          <p style={{ marginTop: "10px" }}>The flowers are blooming.</p>
          <button className="replay-btn" onClick={resetToMenu}>
            Choose Another Level
          </button>
        </div>
      )}
    </div>
  );
}

export default GamePage;
