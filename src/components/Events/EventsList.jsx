import { useState, useEffect } from "react"
import EventCard from "./EventCard"


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
                        <EventCard data={eventElement} date={date} time={time}/>
                    )
                })}
            </div>
        </>
    )
}

export default EventsList