import { useContext, useEffect, useState } from "react";
import "./ProfilePage.css";
import { AuthContext } from "../../context/auth.context";
import ItemCard from "../../components/Market/ItemCard";
import ProposalCard from "../../components/Proposal/ProposalCard";
import EventCard from "../../components/Events/EventCard";
import PostCard from "../../components/Posts/PostCard";
import ReviewCard from "../../components/Reviews/Review";
import UserCard from "../../components/Profile/UserCard";
import { useParams } from "react-router";


function ProfilePage() {

  const { user } = useContext(AuthContext)

  const [userParam, setUserParam] = useState(user)
  const [items, setItems] = useState([])
  const [allItems, setAllItems] = useState([])
  const [events, setEvents] = useState([])
  const [posts, setPosts] = useState([])
  const [reviews, setReviews] = useState([])
  const [proposals, setProposals] = useState([])

  const { userId } = useParams()

  const authToken = localStorage.getItem("authToken")

  function statusCheck (status) {
    if (status === "accepted") {
         return "accepted" 
    } else if (status === "rejected") {
        return "rejected" 
   } 
}

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    const userByIdUrl = process.env.REACT_APP_SERVER_URL + "/db/users/" + userId

    fetch(userByIdUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setUserParam(data)
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
        setItems(data)
      })
      .catch(err => console.log(err))


    fetch(allItemUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setAllItems(data)
      })
      .catch(err => console.log(err))


    fetch(eventUrl, {
      headers: {Authorization: `Bearer ${authToken}`},
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setEvents(data)
      })
      .catch(err => console.log(err))


    fetch(postUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setPosts(data)
      })
      .catch(err => console.log(err))


    fetch(reviewUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setReviews(data)
      })
      .catch(err => console.log(err))


    fetch(proposalUrl)
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        setProposals(data)
      })
      .catch(err => console.log(err))
  }, [userParam])

  function handleEventSubmit(e, eventId) {
    e.preventDefault()
    const deleteEventUrl = process.env.REACT_APP_SERVER_URL + "/db/events/delete/" + eventId

    fetch(deleteEventUrl, {
      headers: {Authorization: `Bearer ${authToken}`},
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
      headers: {Authorization: `Bearer ${authToken}`},
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

        <UserCard user={user} userParam={userParam} />

        {user._id == userParam._id ?
          <div className="user-proposals">
            <h2>My Proposals</h2>
            {
              proposals.map((proposal) => {
                const dateAndTime = proposal.date
                const dateTime = new Date(dateAndTime)

                const date = dateTime.toLocaleDateString()
                const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                return (
                  <div className="proposal-card">
                    <ProposalCard data={proposal} user={userParam} key={proposal._id}
                      item={proposal.item_id} link={proposal.item_id._id} date={date} time={time} />

                    <button className="delete-btn" onClick={(e) => handleProposalSubmit(e, proposal._id)}>Delete</button>
                  </div>
                )
              })
            }
          </div>
          : null
        }
      </div>

      <div className="user-items section">
        {user._id == userParam._id ? <h2>My Items</h2> : <h2>{userParam.username}'s Items</h2>}
        <div className="listing-container">
          {items.length > 0 ?
            items.map((item) => {
              const dateAndTimePropEx = item.expiration_date
              const dateTimeEx = new Date(dateAndTimePropEx)

              const expirationDate = dateTimeEx.toLocaleDateString()

              return <ItemCard item={item} expirationDate={expirationDate} />
            })
            :
            <div className="center-div">
              <p>You do not have any listing at the moment</p>
            </div>
          }
        </div>
      </div>

      <div className="user-events section">
        {user._id == userParam._id ? <h2>My Events</h2> : <h2>Events hosted by {userParam.username} </h2>}
        {events?.length == 0 && <p>You haven't created any events yet.</p>}
        {events?.map((eventElement) => {
          const dateAndTime = eventElement.date
          const dateTime = new Date(dateAndTime)

          const date = dateTime.toLocaleDateString()
          const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          return (
            <div>
              <EventCard data={eventElement} date={date} time={time} />
              <button className="delete-btn" onClick={(e) => handleEventSubmit(e, eventElement._id)}>Delete</button>

            </div>
          )
        })}
      </div>

      <div className="user-posts section">
        {user._id == userParam._id ? <h2>My Posts</h2> : <h2>{userParam.username}'s Posts</h2>}
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
      <button onClick={scrollToTop}>Back to top</button>

    </div>
  );
}

export default ProfilePage;
