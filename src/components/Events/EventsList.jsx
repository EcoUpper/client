import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


function EventsList() {

    const [events, setEvents] = useState([])
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/events"

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setEvents(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (!events) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div>
                {events.map((eventElement) => {
                    const dateAndTime = eventElement.date
                    const dateTime = new Date(dateAndTime)
                
                    const date = dateTime.toLocaleDateString()
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    return (
                        <div style={{width: "400px"}}>
                            <Link key={eventElement._id} to={`/events/${eventElement._id}`}><h3>{eventElement.title}</h3></Link>
                            <p>Hosted by: {eventElement.created_by.username}</p>
                            <p>{date}</p>
                            <p>{time}</p>
                            <img style={{height: "300px"}} src={eventElement.image_url} alt="Event image" />
                            <p>{eventElement.content}</p>
                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default EventsList