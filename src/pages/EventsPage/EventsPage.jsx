import { useState, useEffect } from "react"
import EventsList from "./../../components/Events/EventsList"
import NewEvent from "./../../components/Events/NewEvent"
import Rodal from "rodal"
import "rodal/lib/rodal.css"



function EventsPage() {

    const [events, setEvents] = useState([])
    const [showRodal, setShowRodal] = useState(false)
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
        <button onClick={()=>setShowRodal(true)}>Create event</button>
            <Rodal visible={showRodal} animation= "fade" width={600} height={440} onClose={()=>setShowRodal(false)}>
            <NewEvent fetchEvents={fetchEvents} />

            </Rodal>
            <EventsList events={events}/>
        </>
    )
}

export default EventsPage;