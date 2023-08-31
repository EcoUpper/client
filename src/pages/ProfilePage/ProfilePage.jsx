import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";


function ProfilePage() {

  const {user} = useContext(AuthContext)
  const [items, setItems] = useState([])

  useEffect(()=>{

    const itemUrl = process.env.REACT_APP_SERVER_URL + "/db/items/owner/" + user._id
    
    fetch(itemUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log(data);
      setItems(data)
    })
    .catch(err => console.log(err))

},[])
  

  return (
    <div className="profile-page">
      <h1>Profile page</h1>

      <div className="profile-details">
         <h3>{user.username}</h3>
         <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="user-products">
        <h2>{user.username}'s Listing</h2>
          
      </div>
    </div>
  );
}

export default ProfilePage;
