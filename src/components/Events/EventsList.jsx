import { useState, useEffect } from "react"
import { Link } from "react-router-dom"


function EventsList () {

    const [events, setEvents] = useState([])
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/events"

    useEffect(() => {
        fetch(apiUrl)
        .then((res) => {
            res.json()
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
                    return (
                        <Link key={eventElement._id} to={`/events/${eventElement._id}`}>
                            <h3>{eventElement.title}</h3>
                            <p>{eventElement.created_by}</p>
                            <p>{eventElement.content}</p>
                            <img src={eventElement.image_url} alt="Event image" />
                        </Link>
                    )
                })}
            </div>
        </>
    )
}

export default EventsList