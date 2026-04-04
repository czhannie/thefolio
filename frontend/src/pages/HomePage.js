// frontend/src/pages/HomePage.js
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../api/axios';

function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Phase 1: Splash screen redirect logic
    if (!sessionStorage.getItem("splashShown")) {
      navigate("/");
    }

    // Phase 2: Fetch Posts
    API.get('/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [navigate]);

  return (
    <>
      <main>
        {/* RESTORED EXACT PHASE 1 HERO */}
        <section id="hero">
          <div className="hero-text">
            <h4>Welcome to the Portfolio of</h4>
            <h1>
              Designing Logic.
              <br />
              Curating Dreams.
            </h1>
            <p>
              Hello, I am <strong>Maerose</strong>. I speak two languages
              fluently: <em>Computer Science</em> and <em>Cinematography</em>.{" "}
              <br />
              <br />
              Explore my digital scrapbook where lines of code meet the art of
              storytelling.
            </p>
            <Link to="/about" className="btn">
              Enter My World
            </Link>
          </div>

          <div className="hero-image-wrapper">
            <img
              src="/assets/hero.jpg"
              alt="A cozy, aesthetic desk setup with warm lighting"
              className="hero-img"
            />
          </div>
        </section>

        {/* RESTORED EXACT PHASE 1 PILLARS */}
        <section className="content-section">
          <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
            The Three Pillars
          </h2>

          <ul
            className="pillars-container"
            style={{ listStyle: "none", padding: 0, margin: 0 }}
          >
            <li className="pillar-card">
              <h3>01. The Architect</h3>
              <p>
                <strong>Computer Science</strong> is my foundation. I build
                structures using HTML, CSS, and Algorithms, turning abstract
                problems into elegant solutions.
              </p>
            </li>

            <li className="pillar-card">
              <h3>02. The Strategist</h3>
              <p>
                <strong>Chess</strong> is my discipline. Playing since 8th grade
                has taught me that patience is a weapon and every move must have
                a purpose.
              </p>
            </li>

            <li className="pillar-card">
              <h3>03. The Dreamer</h3>
              <p>
                <strong>Storytelling</strong> is my escape. Whether it is
                K-Dramas or Anime, I analyze narratives to understand what
                connects people emotionally.
              </p>
            </li>
          </ul>

          {/* RESTORED EXACT "CURRENTLY WATCHING" SECTION */}
          <div
            style={{
              textAlign: "center",
              marginTop: "40px",
              paddingTop: "20px",
              borderTop: "1px dashed var(--primary-color)",
            }}
          >
            <p>
              <em>
                Currently watching: A historical C-Drama & Coding a new web
                project.
              </em>
            </p>
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "var(--accent-pop)",
              }}
            >
              Join the Newsletter &rarr;
            </Link>
          </div>
        </section>

        {/* PHASE 2: NEW BLOG POSTS SECTION (Added safely below your content) */}
        <section className="content-section" style={{ marginTop: "60px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "30px", borderTop: "2px solid var(--bg-soft)", paddingTop: "40px" }}>
            Latest Blog Posts
          </h2>
          
          {loading ? <p style={{textAlign: "center"}}>Loading posts...</p> : null}
          {posts.length === 0 && !loading && <p style={{textAlign: "center"}}>No posts yet. Be the first to write one!</p>}
          
          <div className='posts-grid' style={{display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center'}}>
            {posts.map(post => (
              <div key={post._id} className='pillar-card' style={{maxWidth: '300px', textAlign: 'left', display: 'flex', flexDirection: 'column'}}>
                {post.image && (
                  <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} style={{width: '100%', borderRadius: '10px', marginBottom: '15px'}} />
                )}
                <h3 style={{marginTop: '0', borderBottom: 'none'}}>
                  <Link to={`/posts/${post._id}`} style={{color: 'var(--text-main)', textDecoration: 'none'}}>
                    {post.title}
                  </Link>
                </h3>
                <p style={{flexGrow: 1}}>{post.body.substring(0, 100)}...</p>
                <small style={{color: 'var(--primary-color)', fontWeight: 'bold', marginTop: '10px'}}>By {post.author?.name}</small>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* RESTORED EXACT PHASE 1 FOOTER */}
      <footer>
        <p>&copy; 2026 Maerose Boadilla. All Rights Reserved.</p>
        <p>Contact: student@dmmmsu.edu.ph</p>
      </footer>
    </>
  );
}

export default HomePage;