// frontend/src/pages/CreatePostPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError('');
    
    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);
    
    try {
      const { data } = await API.post('/posts', fd);
      navigate(`/posts/${data._id}`);
    } catch (err) { 
      setError(err.response?.data?.message || 'Failed to publish post'); 
    }
  };

  return (
    <main>
      <h2>Write a New Post</h2>
      <p style={{ color: "var(--primary-color)", fontStyle: "italic", marginBottom: "30px" }}>
        Share your latest code insights or drama reviews with the world.
      </p>

      {error && <p className='error' style={{ textAlign: "center", fontSize: "1.1rem" }}>{error}</p>}
      
      <form className="styled-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Post Title:</label>
          <input 
            type="text"
            id="title"
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder='Enter a captivating title...' 
            required 
          />
        </div>

        <div>
          <label htmlFor="body">Content:</label>
          <textarea 
            id="body"
            value={body} 
            onChange={e => setBody(e.target.value)} 
            placeholder='Write your story here...' 
            rows={12} 
            required 
          />
        </div>
        
        
          <div>
            <label htmlFor="image">Upload Cover Image (Admin only): </label>
            <input 
              type='file' 
              id="image"
              accept='image/*' 
              onChange={e => setImage(e.target.files[0])} 
              style={{ background: "transparent", border: "none" }}
            />
          </div>
        

        <button type='submit' className="btn" style={{ marginTop: "20px" }}>Publish Post</button>
      </form>
    </main>
  );
};

export default CreatePostPage;