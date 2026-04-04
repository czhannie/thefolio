// frontend/src/pages/RegisterPage.js
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from '../api/axios';

function RegisterPage() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "", // Needed for backend
    gender: "",
    dob: "",
    password: "",
    confirmPassword: "",
    level: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};
    setApiError("");

    // Phase 1 Form Validation
    if (formData.fullname.trim() === "") newErrors.fullname = "Full Name is required";
    if (formData.username.trim() === "") newErrors.username = "Username is required";
    if (formData.email.trim() === "") newErrors.email = "Email is required";
    if (formData.gender === "") newErrors.gender = "Please select your gender";

    if (formData.dob === "") {
      newErrors.dob = "Birthday is required";
    } else {
      let dobDate = new Date(formData.dob);
      let today = new Date();
      let age = today.getFullYear() - dobDate.getFullYear();
      let monthDiff = today.getMonth() - dobDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      if (age < 18) newErrors.dob = "You must be at least 18 years old to register.";
    }

    if (formData.password === "") newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters long";

    if (formData.confirmPassword === "") newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    if (!formData.level) newErrors.level = "Please select a knowledge level";
    if (!formData.terms) newErrors.terms = "You must agree to the terms and conditions";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Phase 2 Backend Call
    try {
      const { data } = await API.post('/auth/register', {
        name: formData.fullname, 
        email: formData.email, 
        password: formData.password
      });
      localStorage.setItem('token', data.token);
      navigate('/home'); 
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <>
      <main>
        <h2>Registration Form</h2>

        {/* RESTORED: Your Phase 1 Layout and Picture! */}
        <div className="register-layout">
          <section className="signup-info">
            <h3>Why Join the Community?</h3>
            <p>Becoming a member of Maerose's World gives you exclusive access to:</p>
            <ul className="benefits-list">
              <li><span className="icon">✨</span> <strong>Behind-the-Code:</strong> Insights into my latest technical projects.</li>
              <li><span className="icon">📺</span> <strong>Cultural Curations:</strong> Monthly reviews of top-tier K-Dramas & Anime.</li>
              <li><span className="icon">💌</span> <strong>The Digest:</strong> A weekly blend of coding aesthetics delivered to your inbox.</li>
            </ul>
          </section>

          <div className="image-wrapper">
            <img
              src="/assets/creative_fuel.jpg"
              alt="Cozy desk setup with coding and anime"
              className="hero-img"
            />
          </div>
        </div>

        <hr />

        <form className="styled-form" onSubmit={handleSubmit}>
          {apiError && <p className="error" style={{textAlign: 'center', fontSize: '1.2rem'}}>{apiError}</p>}
          
          <div>
            <label htmlFor="fullname">Full Name:</label>
            <input type="text" id="fullname" name="fullname" value={formData.fullname} onChange={handleChange} />
            {errors.fullname && <span className="error">{errors.fullname}</span>}
          </div>

          <div>
            <label htmlFor="username">Preferred Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
            {errors.username && <span className="error">{errors.username}</span>}
          </div>

          <div>
            <label htmlFor="email">Email Address:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div>
            <label htmlFor="gender">Gender:</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">-- Select Gender --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div>
            <label htmlFor="dob">Birthday:</label>
            <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} />
            {errors.dob && <span className="error">{errors.dob}</span>}
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <fieldset style={{ border: "1px solid var(--bg-soft)", borderRadius: "8px", padding: "15px", marginTop: "15px" }}>
            <legend style={{ color: "var(--primary-color)", fontWeight: "bold" }}>Knowledge Level:</legend>
            <div className="radio-group">
              <input type="radio" id="beginner" name="level" value="Beginner" checked={formData.level === "Beginner"} onChange={handleChange} />
              <label htmlFor="beginner">Beginner</label>
            </div>
            <div className="radio-group">
              <input type="radio" id="intermediate" name="level" value="Intermediate" checked={formData.level === "Intermediate"} onChange={handleChange} />
              <label htmlFor="intermediate">Intermediate</label>
            </div>
            <div className="radio-group">
              <input type="radio" id="expert" name="level" value="Expert" checked={formData.level === "Expert"} onChange={handleChange} />
              <label htmlFor="expert">Expert</label>
            </div>
            {errors.level && <span className="error">{errors.level}</span>}
          </fieldset>

          <div className="checkbox-group" style={{ marginTop: "20px" }}>
            <input type="checkbox" id="terms" name="terms" checked={formData.terms} onChange={handleChange} />
            <label htmlFor="terms">I agree to the terms and conditions</label>
          </div>
          {errors.terms && <span className="error">{errors.terms}</span>}

          <input type="submit" value="Register Now" className="btn" style={{ marginTop: "20px" }} />
        </form>
        
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Already have an account? <Link to='/login' style={{ color: "var(--accent-pop)", fontWeight: "bold" }}>Login here</Link>
        </p>
      </main>
      <footer>
        <p>&copy; 2026 Maerose Joscel Czarinah Boadilla. All Rights Reserved.</p>
      </footer>
    </>
  );
}

export default RegisterPage;