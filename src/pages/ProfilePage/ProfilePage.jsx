import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";
import ItemCard from "../../components/Market/ItemCard";
import ProposalCard from "../../components/Proposal/ProposalCard";
import EventCard from "../../components/Events/EventCard";
import PostCard from "../../components/Posts/PostCard";
import ReviewCard from "../../components/Reviews/Review";
import { useParams } from "react-router";


function ProfilePage() {

  const {user} = useContext(AuthContext)

  
  const [userParam, setUserParam] = useState(user)
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [events, setEvents] = useState([])
  const [posts, setPosts] = useState([])
  const [reviews, setReviews] = useState([])
  const [proposals, setProposals] = useState([])
  
  const {userId} = useParams()

  useEffect(()=>{
    const userByIdUrl = process.env.REACT_APP_SERVER_URL + "/db/users/" + userId

    fetch(userByIdUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setUserParam(data)
        console.log("user is", data)
      })
      .catch(err => console.log(err))

  }, [userId])

  useEffect(() => {

    const itemUrl = process.env.REACT_APP_SERVER_URL + "/db/items/owner/" + userParam._id
    const allItemUrl = process.env.REACT_APP_SERVER_URL + "/db/items"
    const eventUrl = process.env.REACT_APP_SERVER_URL + "/db/events/created/" + userParam._id
    const postUrl = process.env.REACT_APP_SERVER_URL + "/db/posts/" + userParam._id
    const reviewUrl = process.env.REACT_APP_SERVER_URL + "/db/reviews/" + userParam._id
    const proposalUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/created/" + userParam._id

    

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
        console.log(userParam._id);
        setEvents(data)
      })
      .catch(err => console.log(err))


    fetch(postUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("posts", data);
        console.log("param is", userParam._id);
        setPosts(data)
      })
      .catch(err => console.log(err))


    fetch(reviewUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("reviews", data);
        console.log(userParam._id);
        setReviews(data)
      })
      .catch(err => console.log(err))

    fetch(proposalUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("props", data);
        setProposals(data)
      })
      .catch(err => console.log(err))
  }, [userParam])

  function handleEventSubmit(e, eventId) {
    e.preventDefault()
    const deleteEventUrl = process.env.REACT_APP_SERVER_URL + "/db/events/delete/" + eventId
    console.log(eventId)

    fetch(deleteEventUrl, {
      method: "DELETE"
    })
      .then((res) => {
        res.json()
      })
      .catch((err) => {
        console.log(err)
      })

    const removedEventsArray = events.filter((eventToDelete) => {
      return eventToDelete._id !== eventId
    })

    setEvents(removedEventsArray)

  }

  function handleProposalSubmit(e, propId) {
    e.preventDefault()

    const deleteProposalUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/" + propId

    fetch(deleteProposalUrl, {
      method: "DELETE"
    })
      .then((res) => {
        res.json()
      })
      .catch((err) => {
        console.log(err)
      })

    const removedProposalsArray = proposals.filter((propToDelete) => {
      return propToDelete._id !== propId
    })

    setProposals(removedProposalsArray)
  }


  return (
    <div className="profile-page">
      <div className="details-prop-container">

      {user._id == userParam._id? 
      <div className="profile-details">
        <h2>Profile information</h2>
        <img src={userParam.image_url} alt={userParam.username} className="profile-img" />
        <h3>{userParam.username}</h3>
        <p><strong>Email:</strong> {userParam.email}</p>
      </div>
      : null
    }

    {user._id == userParam._id? 
    <div className="user-proposals">
      <h2>Proposals you made</h2>
      {
        proposals.map((proposal) => {
          return (
            <div>
              <ProposalCard data={proposal} user={userParam} key={proposal._id} item={proposal.item_id} link={proposal.item_id._id} />
              
              <button onClick={(e) => handleProposalSubmit(e, proposal._id)}>Delete</button>
            </div>
          )
        })
      }
    </div>
      : null
      }
    </div>

      <div className="user-items">
        <h2>{userParam.username}'s Listing</h2>
        <div className="listing-container">
        { items.length > 0?
          items.map((item) => {
            const dateAndTimePropEx = item.expiration_date
            const dateTimeEx = new Date(dateAndTimePropEx)

            const expirationDate = dateTimeEx.toLocaleDateString()

            return <ItemCard item={item} expirationDate={expirationDate} />
          })
          :
          <p>You do not have any listing at the moment</p>
        }
        </div>
      </div>


      <div className="user-events">
        {user._id == userParam._id? <h2>Events hosted by you </h2> : <h2>Events hosted by {userParam.username} </h2>}
        {events?.length == 0 && <p>You haven't created any events yet.</p>}
        {events?.map((eventElement) => {
          const dateAndTime = eventElement.date
          const dateTime = new Date(dateAndTime)

          const date = dateTime.toLocaleDateString()
          const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          return (
            <div>
              <EventCard data={eventElement} date={date} time={time} />
              <button onClick={(e) => handleEventSubmit(e, eventElement._id)}>Delete</button>

            </div>
          )
        })}
      </div>


      <div className="user-posts">
        {user._id == userParam._id? <h2>Posts made by you </h2> : <h2>Posts made by {userParam.username} </h2>}
        {
          posts.map((post) => {
            const dateAndTime = post.createdAt
            const dateTime = new Date(dateAndTime)

            const date = dateTime.toLocaleDateString()
            const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            return <PostCard data={post} key={post._id} date={date} time={time} />
          })
        }
      </div>


      <div className="user-reviews">
        {user._id == userParam._id? <h2>All your reviews </h2> : <h2>{userParam.username}´s reviews </h2>}
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
