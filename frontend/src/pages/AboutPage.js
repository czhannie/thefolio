function AboutPage() {
  return (
    <>
      <main>
        <h2>The Person Behind the Code</h2>

        <section className="content-section">
          <h3>Who I Am</h3>
          <div className="profile-container">
            <img
              src="/assets/profile.jpg"
              alt="Portrait of Maerose Boadilla"
              className="profile-img"
            />
            <div>
              <p>
                Hello! I am <strong>Maerose Josel Czarinah V. Boadilla</strong>.
                To the academic world, I am a dedicated 3rd-year Computer
                Science student at Don Mariano Marcos Memorial State University.
                But beyond the syntax and semicolons, I am a strategist and a
                dreamer.
              </p>
              <p>
                My life is a balance between two worlds: the structured logic of{" "}
                <strong>Chess</strong> and the boundless imagination found in{" "}
                <strong>Wattpad</strong> and <strong>Asian Dramas</strong>. I
                believe that being a great developer isn't just about writing
                code—it's about having the patience of a chess player and the
                creativity of a storyteller.
              </p>
            </div>
          </div>

          <blockquote>
            "Life is like a game of chess. To win you have to make a move."
          </blockquote>
        </section>

        <section className="content-section">
          <h3>My Creative Escape</h3>
          <p>
            When I step away from my keyboard, I immerse myself in different
            realities. My hobbies are the fuel that keeps my creativity burning.
          </p>

          <div style={{ margin: "40px 0" }}>
            <img
              src="/assets/hobbies.jpg"
              alt="A chessboard and a stack of books"
              className="hobby-img"
            />
          </div>

          <h4>The Strategist: Chess</h4>
          <p>
            My journey with strategy began in the <strong>8th Grade</strong>.
            That was when I first touched a chess piece, and I haven't looked
            back since. Chess taught me that every action has a consequence and
            that the best victories require patience and foresight—skills I use
            every day in programming.
          </p>

          <h4>The Dreamer: Stories & Screens</h4>
          <p>
            I am an avid reader of <strong>Wattpad</strong> books, where raw and
            unfiltered stories come to life. In my free time, my screen becomes
            a portal to other cultures. I love getting lost in the emotional
            depth of <strong>K-Dramas</strong>, the intricate historical plots
            of <strong>C-Dramas</strong>, and the vibrant, artistic worlds of{" "}
            <strong>Anime</strong>.
          </p>
        </section>

        <section className="content-section">
          <h3>Timeline of a Fangirl & Coder</h3>

          <div style={{ margin: "30px 0", textAlign: "center" }}>
            <img
              src="/assets/developer_setup.jpg"
              alt="A laptop screen displaying code with a cup of coffee"
              className="hobby-img"
              style={{ maxWidth: "200px" }}
            />
          </div>

          <ol>
            <li>
              <strong>The Awakening (8th Grade):</strong> Discovered the world
              of Chess. Learned that silence and strategy speak louder than
              words.
            </li>
            <li>
              <strong>The Reader (High School):</strong> Fell in love with
              reading on Wattpad. I realized that technology could connect
              writers and readers globally.
            </li>
            <li>
              <strong>The Developer (University Era):</strong> Currently merging
              my love for logic (CS) with my passion for visual storytelling
              (Anime/Drama).
            </li>
          </ol>
        </section>
      </main>
      <footer>
        <p>
          &copy; 2026 Maerose Joscel Czarinah Boadilla. All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default AboutPage;
