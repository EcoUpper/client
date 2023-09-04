import "./SignupPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function SignupPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [imageUrl, setImageUrl] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  
  // const handleFileUpload = (e) => {
  //   // console.log("The file to be uploaded is: ", e.target.files[0]);
 
  //   const uploadData = new FormData();
 
  //   // imageUrl => this name has to be the same as in the model since we pass
  //   // req.body to .create() method when creating a new movie in '/api/movies' POST route
  //   uploadData.append("image_url", e.target.files[0]);
 
  //   service
  //     .uploadImage(uploadData)
  //     .then(response => {
  //       // console.log("response is: ", response);
  //       // response carries "fileUrl" which we can use to update the state
  //       setImageUrl(response.fileUrl);
  //     })
  //     .catch(err => console.log("Error while uploading the file: ", err));
  // };



  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const requestBody = { username, email, password, imageUrl };

    // Send a request to the server using axios
    /* 
    const authToken = localStorage.getItem("authToken");
    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/auth/signup`, 
      requestBody, 
      { headers: { Authorization: `Bearer ${authToken}` },
    })
    .then((response) => {})
    */
    console.log(requestBody);
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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
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

        {/* <input type="file" onChange={(e) => handleFileUpload(e)} /> */}

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  );
}

export default SignupPage;
