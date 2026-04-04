// frontend/src/pages/PostPage.js
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the post and its comments simultaneously
    Promise.all([
      API.get(`/posts/${id}`),
      API.get(`/comments/${id}`)
    ])
      .then(([postRes, commentsRes]) => {
        setPost(postRes.data);
        setComments(commentsRes.data);
      })
      .catch((err) => {
        setError("Post not found or has been removed.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await API.delete(`/posts/${id}`);
        navigate("/home");
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting post");
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const { data } = await API.post(`/comments/${id}`, { body: newComment });
      setComments([...comments, data]);
      setNewComment("");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("Delete this comment?")) {
      try {
        await API.delete(`/comments/${commentId}`);
        setComments(comments.filter((c) => c._id !== commentId));
      } catch (err) {
        alert(err.response?.data?.message || "Error deleting comment");
      }
    }
  };

  if (loading) return <main><p style={{textAlign: "center"}}>Loading post...</p></main>;
  if (error || !post) return <main><p className="error" style={{textAlign: "center"}}>{error}</p></main>;

  const isPostOwner = user && post.author?._id === user.id;
  const isAdmin = user && user.role === "admin";

  return (
    <main>
      <Link to="/home" style={{ color: "var(--primary-color)", textDecoration: "none", fontWeight: "bold" }}>
        &larr; Back to Posts
      </Link>

      <section className="content-section" style={{ marginTop: "20px" }}>
        <h2 style={{ fontSize: "2.5rem", marginBottom: "5px" }}>{post.title}</h2>
        
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", color: "var(--primary-color)" }}>
          {post.author?.profilePic ? (
            <img 
              src={`http://localhost:5000/uploads/${post.author.profilePic}`} 
              alt={post.author.name} 
              style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} 
            />
          ) : (
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "var(--bg-soft)" }}></div>
          )}
          <p style={{ margin: 0 }}>
            <strong>{post.author?.name}</strong> &bull; {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        {post.image && (
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
            <img src={`${process.env.REACT_APP_API_URL?.replace('/api','')}/uploads/${post.image}`} alt={post.title} className="hobby-img" style={{ maxWidth: "100%" }} />
          </div>
        )}

        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.8", color: "var(--text-main)" }}>
          {post.body}
        </div>

        {/* Post Actions (Edit / Delete) */}
        {(isPostOwner || isAdmin) && (
          <div style={{ marginTop: "30px", padding: "15px", background: "var(--bg-soft)", borderRadius: "10px", display: "flex", gap: "15px" }}>
            <button className="btn" onClick={() => navigate(`/edit-post/${post._id}`)} style={{ background: "var(--accent-gold)" }}>Edit Post</button>
            <button className="btn" onClick={handleDeletePost} style={{ background: "#d9534f" }}>Delete Post</button>
          </div>
        )}
      </section>

      <hr style={{ borderColor: "var(--bg-soft)", margin: "40px 0" }} />

      {/* Comments Section */}
      <section className="content-section">
        <h3>Comments ({comments.length})</h3>

        {user ? (
          <form className="styled-form" onSubmit={handleAddComment} style={{ marginBottom: "30px", padding: "20px" }}>
            <textarea
              placeholder="Share your thoughts..."
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            ></textarea>
            <button type="submit" className="btn">Post Comment</button>
          </form>
        ) : (
          <p style={{ fontStyle: "italic", color: "var(--primary-color)" }}>
            <Link to="/login" style={{ color: "var(--accent-pop)" }}>Log in</Link> to leave a comment.
          </p>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} style={{ padding: "15px", border: "1px solid var(--bg-soft)", borderRadius: "10px", background: "var(--bg-card)" }}>
                <p style={{ margin: "0 0 10px 0", fontSize: "0.9rem", color: "var(--primary-color)" }}>
                  <strong>{comment.author?.name}</strong> &bull; {new Date(comment.createdAt).toLocaleDateString()}
                </p>
                <p style={{ margin: 0 }}>{comment.body}</p>
                
                {/* Comment Delete Button */}
                {(user?.id === comment.author?._id || isAdmin) && (
                  <button 
                    onClick={() => handleDeleteComment(comment._id)} 
                    style={{ background: "none", border: "none", color: "#d9534f", cursor: "pointer", marginTop: "10px", fontSize: "0.85rem", textDecoration: "underline", padding: 0 }}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default PostPage;