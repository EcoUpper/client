import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";
import ItemCard from "../../components/Market/ItemCard";
import ProposalCard from "../../components/Proposal/ProposalCard";
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
  const [proposals, setProposals] = useState([])


  useEffect(() => {

    const itemUrl = process.env.REACT_APP_SERVER_URL + "/db/items/owner/" + user._id
    const allItemUrl = process.env.REACT_APP_SERVER_URL + "/db/items"
    const eventUrl = process.env.REACT_APP_SERVER_URL + "/db/events/created/" + user._id
    const postUrl = process.env.REACT_APP_SERVER_URL + "/db/posts/" + user._id
    const reviewUrl = process.env.REACT_APP_SERVER_URL + "/db/reviews/" + user._id
    const proposalUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/created/" + user._id

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

    fetch(proposalUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log("props", data);
        setProposals(data)
      })
      .catch(err => console.log(err))
  }, [])

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

  function handleProposalSubmit(e, propId, itemId) {
    e.preventDefault()
    const deleteProposalUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/" + itemId + propId
    console.log(propId)

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

    setEvents(removedProposalsArray)

  }

  return (
    <div className="profile-page">
      <h1>Profile page</h1>

      <div className="profile-details">
        <h3>{user.username}</h3>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      <div className="user-items">
        <h2>{user.username}'s Listing</h2>
        {
          items.map((item) => {
            const dateAndTimePropEx = item.expiration_date
            const dateTimeEx = new Date(dateAndTimePropEx)

            const expirationDate = dateTimeEx.toLocaleDateString()

            return <ItemCard item={item} expirationDate={expirationDate} />
          })
        }
      </div>

      <div className="user-proposals">
        <h2>Proposals you made</h2>
        {
          proposals.map((proposal) => {
            return (
              <div>
             {   <ProposalCard data={proposal} user={user} key={proposal._id} item={proposal.item_id} link={proposal.item_id._id} />}
                <button onClick={(e) => handleProposalSubmit(e, proposal._id, proposal.item_id)}>Delete</button>
              </div>
            )
          })
        }
      </div>

      <div className="user-events">
        <h2>Events hosted by you</h2>
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
        <h2>Posts made by you</h2>
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
