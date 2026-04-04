// frontend/src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import API from '../api/axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [tab, setTab] = useState('users');

  useEffect(() => {
    API.get('/admin/users').then(r => setUsers(r.data));
    API.get('/admin/posts').then(r => setPosts(r.data));
  }, []);

  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers(users.map(u => u._id === id ? data.user : u));
  };

  const removePost = async (id) => {
    if(window.confirm("Are you sure you want to remove this post?")) {
      await API.put(`/admin/posts/${id}/remove`);
      setPosts(posts.map(p => p._id === id ? { ...p, status: 'removed' } : p));
    }
  };

  return (
    <main>
      <h2>Admin Dashboard</h2>
      <p style={{ color: "var(--primary-color)", fontStyle: "italic", marginBottom: "30px" }}>
        Manage your community and content.
      </p>

      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <button 
          onClick={() => setTab('users')} 
          className="btn"
          style={{ 
            background: tab === 'users' ? 'var(--primary-color)' : 'transparent',
            color: tab === 'users' ? 'white' : 'var(--text-main)',
            border: '2px solid var(--primary-color)'
          }}
        >
          Members ({users.length})
        </button>
        <button 
          onClick={() => setTab('posts')} 
          className="btn"
          style={{ 
            background: tab === 'posts' ? 'var(--primary-color)' : 'transparent',
            color: tab === 'posts' ? 'white' : 'var(--text-main)',
            border: '2px solid var(--primary-color)'
          }}
        >
          All Posts ({posts.length})
        </button>
      </div>

      {tab === 'users' && (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <span style={{ 
                      padding: "5px 10px", 
                      borderRadius: "15px", 
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      background: u.status === 'active' ? "#d4edda" : "#f8d7da",
                      color: u.status === 'active' ? "#155724" : "#721c24"
                    }}>
                      {u.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <button 
                      onClick={() => toggleStatus(u._id)} 
                      style={{
                        padding: "8px 15px",
                        borderRadius: "20px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "bold",
                        background: u.status === 'active' ? "#d9534f" : "var(--accent-gold)",
                        color: "white"
                      }}
                    >
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan="4" style={{textAlign: "center"}}>No members found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'posts' && (
        <div style={{ overflowX: "auto" }}>
          <table>
            <thead><tr><th>Title</th><th>Author</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p._id}>
                  <td>{p.title}</td>
                  <td>{p.author?.name || "Unknown"}</td>
                  <td>
                    <span style={{ 
                      padding: "5px 10px", 
                      borderRadius: "15px", 
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                      background: p.status === 'published' ? "#d4edda" : "#f8d7da",
                      color: p.status === 'published' ? "#155724" : "#721c24"
                    }}>
                      {p.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {p.status === 'published' ? (
                      <button 
                        onClick={() => removePost(p._id)}
                        style={{
                          padding: "8px 15px",
                          borderRadius: "20px",
                          border: "none",
                          cursor: "pointer",
                          fontWeight: "bold",
                          background: "#d9534f",
                          color: "white"
                        }}
                      >
                        Remove
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.9rem", fontStyle: "italic", opacity: 0.7 }}>Removed</span>
                    )}
                  </td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan="4" style={{textAlign: "center"}}>No posts found.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
};

export default AdminPage;