// frontend/src/pages/EditPostPage.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch existing post data to pre-fill the form
    API.get(`/posts/${id}`)
      .then((res) => {
        const post = res.data;
        // Check authorization: only owner or admin can edit
        if (post.author._id !== user.id && user.role !== "admin") {
          navigate("/home");
        } else {
          setTitle(post.title);
          setBody(post.body);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError("Post not found.");
        setLoading(false);
      });
  }, [id, navigate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const fd = new FormData();
    fd.append("title", title);
    fd.append("body", body);
    if (image) fd.append("image", image);

    try {
      await API.put(`/posts/${id}`, fd);
      navigate(`/posts/${id}`); // Send them back to the updated post page
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update post");
    }
  };

  if (loading) return <main><p style={{textAlign: "center"}}>Loading editor...</p></main>;

  return (
    <main>
      <h2>Edit Post</h2>
      <p style={{ color: "var(--primary-color)", fontStyle: "italic" }}>
        Refine your logic and curate your stories.
      </p>

      {error && <p className="error" style={{ textAlign: "center", fontSize: "1.1rem" }}>{error}</p>}

      <form className="styled-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Post Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="A Catchy Title..."
            required
          />
        </div>

        <div>
          <label htmlFor="body">Content:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write your story here..."
            rows="12"
            required
          ></textarea>
        </div>

        {/* Note: In your module, only Admins are allowed to upload images to posts */}
        {user?.role === "admin" && (
          <div>
            <label htmlFor="image">Update Cover Image (Admin Only):</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}

        <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
          <button type="submit" className="btn">Save Changes</button>
          <button 
            type="button" 
            className="btn" 
            onClick={() => navigate(`/posts/${id}`)} 
            style={{ background: "transparent", border: "2px solid var(--primary-color)", color: "var(--primary-color)" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

export default EditPostPage;