import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";
import ItemCard from "../../components/Market/ItemCard";
import Proposal from "../../components/Proposal/Proposal";


function ProfilePage() {

  const {user} = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  
  const [proposals, setProposals] = useState([])


  useEffect(()=>{

    const itemUrl = process.env.REACT_APP_SERVER_URL + "/db/items/owner/" + user._id
    const allItemUrl = process.env.REACT_APP_SERVER_URL + "/db/items"
    const proposalUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/created/" + user._id

    fetch(itemUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log(data);
      setItems(data)
    })
    .catch(err => console.log(err))

    
    fetch(allItemUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log(data);
      setAllItems(data)
    })
    .catch(err => console.log(err))


    fetch(proposalUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log(data);
      setProposals(data)
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
          {
            items.map((item)=>{
              return <ItemCard data={item}/>
            })
          }
      </div>

      <div className="proposals">
        <h2>All propsals</h2>
          {
            proposals.map((proposal)=>{
              return <Proposal data={proposal} user={user} key={proposal._id}/>
            })
          }
      </div>

      

      
    </div>
  );
}

export default ProfilePage;
