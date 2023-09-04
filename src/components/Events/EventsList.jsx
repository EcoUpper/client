import { useState, useEffect } from "react"
import EventCard from "./EventCard"
import Rodal from "rodal"
import "rodal/lib/rodal.css"

function EventsList() {

    const [events, setEvents] = useState([])
    const [showRodal, setShowRodal] = useState(false)
    const [selectedEvent, setSelectedEvent] = useState(null)
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/events"

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
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

    const openRodal = (event) => {
        setSelectedEvent(event)
        setShowRodal(true)
    }
    const closeRodal = () => {
        setSelectedEvent(null)
        setShowRodal(false)
    }

    return (
        <>
            <div>
                {events.map((event) => {
                    const dateAndTime = event.date
                    const dateTime = new Date(dateAndTime)    
                    const date = dateTime.toLocaleDateString()
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    return (
                        <EventCard data={event} date={date} time={time}/>
                    )
                })}
            </div>
        </>
    )
}

export default EventsList