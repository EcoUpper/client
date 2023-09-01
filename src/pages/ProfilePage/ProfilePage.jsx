import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";
import ItemCard from "../../components/Market/ItemCard";
import Proposal from "../../components/Proposal/Proposal";
import EventCard from "../../components/Events/EventCard";
import PostCard from "../../components/Posts/PostCard";
import ReviewCard from "../../components/Reviews/Review";


function ProfilePage() {

  const { user } = useContext(AuthContext)
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [events, setEvents] = useState([])
  const [posts, setPosts] = useState([])
  const [reviews, setReviews] = useState([])


  useEffect(() => {

    const itemUrl = process.env.REACT_APP_SERVER_URL + "/db/items/owner/" + user._id
    const allItemUrl = process.env.REACT_APP_SERVER_URL + "/db/items"
    const eventUrl = process.env.REACT_APP_SERVER_URL + "/db/events/created/" + user._id
    const postUrl = process.env.REACT_APP_SERVER_URL + "/db/posts/" + user._id
    const reviewUrl = process.env.REACT_APP_SERVER_URL + "/db/reviews/" + user._id

    fetch(itemUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("owner items", data);
        setItems(data)
      })
      .catch(err => console.log(err))


    fetch(allItemUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("all items", data);
        setAllItems(data)
      })
      .catch(err => console.log(err))


    fetch(eventUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("events", data);
        console.log(user._id);
        setEvents(data)
      })
      .catch(err => console.log(err))


    fetch(postUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("posts", data);
        console.log(user._id);
        setPosts(data)
      })
      .catch(err => console.log(err))


    fetch(reviewUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("reviews", data);
        console.log(user._id);
        setReviews(data)
      })
      .catch(err => console.log(err))
  }, [])


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
          items.map((item) => {
            return <ItemCard data={item} />
          })
        }
      </div>

      <div className="proposals">
        <h2>Proposals you made</h2>
        {
          allItems.map((item) => {
            return <Proposal data={item} user={user} key={item._id} />
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
            return <EventCard data={eventElement} date={date} time={time} />

          }
          )}
        {events?.length == 0 && <p>You have no events created</p>}
      </div>


      <div className="posts">
        <h2>Posts made by you</h2>
        {
          posts.map((post) => {
            const dateAndTime = post.createdAt
            const dateTime = new Date(dateAndTime)

            const date = dateTime.toLocaleDateString()
            const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            return <PostCard data={post} key={post._id} date={date} time={time}/>
          })
        }
      </div>


      <div className="reviews">
        <h2>Reviews you have received</h2>
        {
          reviews.map((review) => {
            return <ReviewCard data={review} key={review._id} />
          })
        }
      </div>






    </div>
  );
}

export default ProfilePage;
