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

        {/* PHASE 2: NEW STORY GRID */}
        <section className="content-section" style={{ marginTop: "60px" }}>
          <h2 style={{ textAlign: "center", marginBottom: "40px", borderTop: "2px solid var(--bg-soft)", paddingTop: "40px" }}>
            Latest Stories
          </h2>
          
          {loading ? <p style={{textAlign: "center"}}>Loading posts...</p> : null}
          {posts.length === 0 && !loading && <p style={{textAlign: "center"}}>No posts yet. Be the first to write one!</p>}
          
          {/* THE GRID CONTAINER */}
          <div className='posts-grid' style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {posts.map(post => (
              <div key={post._id} className="story-post-card">
                
                {/* 1. The Post Header (Avatar + Name + Date) */}
                <div className="story-post-header">
                  {post.author?.profilePic ? (
                    <img 
                      src={post.author.profilePic.startsWith('http') ? post.author.profilePic : `${process.env.REACT_APP_API_URL?.replace('/api','')}/uploads/${post.author.profilePic}`} 
                      alt={post.author.name} 
                      className="story-post-avatar"
                    />
                  ) : (
                    <div className="story-post-avatar" style={{ backgroundColor: 'var(--bg-soft)' }}></div>
                  )}
                  <div className="story-post-meta">
                    <p className="story-post-author">{post.author?.name || 'Anonymous'}</p>
                    <p className="story-post-date">{new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* 2. The Framed Image */}
                {post.image && (
                  <div className="story-post-img-wrapper">
                    <img 
                      src={post.image.startsWith('http') ? post.image : `${process.env.REACT_APP_API_URL?.replace('/api','')}/uploads/${post.image}`} 
                      alt={post.title} 
                      className="story-post-img"
                    />
                  </div>
                )}
                
                {/* 3. The Content & Link */}
                <div className="story-post-content">
                  <h3 className="story-post-title">
                    <Link to={`/posts/${post._id}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="story-post-excerpt">{post.body.substring(0, 100)}...</p>
                  
                  {/* THE ELEGANT TEXT LINK */}
<Link to={`/posts/${post._id}`} className="read-more-link">
  Read More <span className="read-more-arrow">&rarr;</span>
</Link>
                </div>

              </div>
            ))}
          </div>
        </section>

      </main>

      {/* RESTORED EXACT PHASE 1 FOOTER */}
      <footer>
        <p>&copy; 2026 Maerose Joscel Czarinah Boadilla. All Rights Reserved.</p>
        <p>Contact: student@dmmmsu.edu.ph</p>
      </footer>
    </>
  );
}

export default HomePage;