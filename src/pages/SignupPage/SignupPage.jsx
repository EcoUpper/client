import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import uploadImage from "../../services/file-upload.service";
import Axios from "axios";


function SignupPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageSelected, setImageSelected] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  
  const handleFileUpload  = (e) => {
    const formData = new FormData()
    formData.append("image_url", e.target.files[0])

    uploadImage(formData)
    .then((res)=>{
      setImageSelected(res.image_url)
    })
    .catch(err => console.log(err))

  }


  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, email, password, image_url: imageSelected};

    // Or using a service
    authService
      .signup(requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup-page">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit} enctype="multipart/form-data">
        <label>Username</label>
        <input type="text" name="username" value={username} onChange={handleUsername} />
        
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <input className="file-input" type="file" onChange={(e) => handleFileUpload (e)} />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
