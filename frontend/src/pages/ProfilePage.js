import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [pic, setPic] = useState(null);
  
  const [curPw, setCurPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [msg, setMsg] = useState('');

  const handleProfile = async (e) => {
    e.preventDefault(); 
    setMsg('');
    const fd = new FormData();
    fd.append('name', name);
    fd.append('bio', bio);
    if (pic) fd.append('profilePic', pic);

    try {
      const { data } = await API.put('/auth/profile', fd);
      setUser(data);
      setMsg('Profile updated successfully!');
    } catch (err) { setMsg(err.response?.data?.message || 'Error'); }
  };

  const handlePassword = async (e) => {
    e.preventDefault(); 
    setMsg('');
    try {
      await API.put('/auth/change-password', { currentPassword: curPw, newPassword: newPw });
      setMsg('Password changed successfully!');
      setCurPw(''); setNewPw('');
    } catch (err) { setMsg(err.response?.data?.message || 'Error'); }
  };

  const picSrc = user?.profilePic ? `${process.env.REACT_APP_API_URL?.replace('/api','')}/uploads/${user.profilePic}` : '/assets/profile.jpg';

  return (
    <main>
      <h2 style={{ textAlign: "center" }}>My Profile</h2>
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img src={picSrc} alt='Profile' style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "50%", border: "4px solid var(--accent-gold)" }} />
      </div>
      
      {msg && <blockquote style={{ background: "var(--accent-pop)", color: "white" }}>{msg}</blockquote>}
      
      <form className="styled-form" onSubmit={handleProfile} style={{ marginBottom: "30px" }}>
        <h3>Edit Details</h3>
        <label>Display Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
        
        <label>Short Bio:</label>
        <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} />
        
        <label>Profile Picture:</label>
        <input type='file' accept='image/*' onChange={e => setPic(e.target.files[0])} />
        
        <button type='submit' className="btn">Save Profile</button>
      </form>

      <form className="styled-form" onSubmit={handlePassword}>
        <h3>Change Password</h3>
        <label>Current Password:</label>
        <input type='password' value={curPw} onChange={e => setCurPw(e.target.value)} required />
        
        <label>New Password (min 6 chars):</label>
        <input type='password' value={newPw} onChange={e => setNewPw(e.target.value)} required minLength={6} />
        
        <button type='submit' className="btn">Update Password</button>
      </form>
    </main>
  );
}

export default ProfilePage;