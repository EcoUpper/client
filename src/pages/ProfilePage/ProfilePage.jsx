import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";
import ItemCard from "../../components/Market/ItemCard";
import Proposal from "../../components/Proposal/Proposal";
import EventCard from "../../components/Events/EventCard";


function ProfilePage() {

  const {user} = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [events, setEvents] = useState([])
  

  useEffect(()=>{

    const itemUrl = process.env.REACT_APP_SERVER_URL + "/db/items/owner/" + user._id
    const allItemUrl = process.env.REACT_APP_SERVER_URL + "/db/items"
    const eventUrl = process.env.REACT_APP_SERVER_URL + "/db/events/" + user._id

    fetch(itemUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log( "owner items", data);
      setItems(data)
    })
    .catch(err => console.log(err))

    
    fetch(allItemUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log("all items", data);
      setAllItems(data)
    })
    .catch(err => console.log(err))


    fetch(eventUrl)
    .then((response)=>{
      return response.json()
    })
    .then((data)=>{
      console.log("events", data);
      console.log(user._id);
      setEvents(data)
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
        <h2>Proposals you made</h2>
          {
            allItems.map((item)=>{
              return <Proposal data={item} user={user} key={item._id}/>
            })
          }
      </div>

      <div className="events">
        <h2>Events hosted by you</h2>
          {
            events?.map((eventElement) => {
              const dateAndTime = eventElement.date
              const dateTime = new Date(dateAndTime)
          
              const date = dateTime.toLocaleDateString()
              const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              return <EventCard data={eventElement} date={date} time={time}/>
              
          }
        )}
        {events?.length == 0 && <p>You have no events created</p>}
      </div>

      

      
    </div>
  );
}

export default ProfilePage;
