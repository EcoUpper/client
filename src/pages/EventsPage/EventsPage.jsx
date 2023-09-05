import { useState, useEffect } from "react"
import EventsList from "./../../components/Events/EventsList"
import NewEvent from "./../../components/Events/NewEvent"
import Rodal from "rodal"
import "rodal/lib/rodal.css"



function EventsPage() {

    const [events, setEvents] = useState([])
    const [allEvents, setAllEvents] = useState([])
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
                setAllEvents(sortedEvents);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    function filterEvents(date) {
        console.log("DATE HERE", date);
        if (date === "All") {
            return setEvents(allEvents)
        }
        const newArray = allEvents.filter((event) => {
            const eventDate = new Date(event.date)
            console.log(event);
            return date == eventDate.getMonth() +1;
        })
        console.log(newArray);

        setEvents(newArray)
    }


    return (
        <>
            <button onClick={() => setShowRodal(true)}>Create event</button>
            <Rodal visible={showRodal} animation="fade" width={600} height={440} onClose={() => setShowRodal(false)}>
                <NewEvent fetchEvents={fetchEvents} />
            </Rodal>

            <select onChange={(e) => filterEvents(e.target.value)} id="">
                <option>All</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="11">December</option>

            </select>
            <EventsList events={events} />
        </>
    )
}

export default EventsPage;