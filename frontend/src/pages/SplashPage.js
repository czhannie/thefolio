import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SplashPage() {
  const navigate = useNavigate();
  const [text, setText] = useState("Designing Logic");
  const [dots, setDots] = useState("");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // 1. Dot animation logic
    const dotInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    // 2. Text Swap Logic (Designing Logic -> Curating Dreams)
    const textTimeout = setTimeout(() => {
      setText("Curating Dreams");
    }, 1500);

    // 3. Redirect Logic
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
      clearInterval(dotInterval); // Clean up interval

      setTimeout(() => {
        sessionStorage.setItem("splashShown", "true");
        navigate("/home");
      }, 800);
    }, 3000);

    // Cleanup function to prevent memory leaks if the component unmounts early
    return () => {
      clearInterval(dotInterval);
      clearTimeout(textTimeout);
      clearTimeout(fadeTimeout);
    };
  }, [navigate]);

  return (
    // The inline styles here replace your body styles to ensure it centers perfectly
    <div
      style={{
        backgroundColor: "var(--bg-color, #FEF5F7)",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        className={`loader-container ${fadeOut ? "fade-out" : ""}`}
        id="loader"
      >
        <span className="logo-icon">🌹</span>
        <h1>MAEROSE'S WORLD</h1>

        <div className="progress-wrapper">
          <div className="progress-bar"></div>
        </div>

        <div className="loading-subtitle">
          <span>{text}</span>
          <span>{dots}</span>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
