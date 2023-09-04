import { useState, useEffect } from "react"
import EventsList from "./../../components/Events/EventsList"
import NewEvent from "./../../components/Events/NewEvent"



function EventsPage() {

    const [events, setEvents] = useState([])
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/events"

    function fetchEvents() {
        fetch(apiUrl)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const sortedEvents = data.sort((a, b) => {
                if (a.date < b.date) {
                    return -1;
                } else if (a.date > b.date) {
                    return 1;
                } else {
                    return 0;
                }                    
            });
            setEvents(sortedEvents);
        })
        .catch((err) => {
            console.log(err)
        })
    }


    useEffect(() => {
        fetchEvents()
    }, [])


    return (
        <>
            <NewEvent fetchEvents={fetchEvents} />
            <EventsList events={events}/>
        </>
    )
}

export default EventsPage;