import EventCard from "./EventCard"
import Rodal from "rodal"
import "rodal/lib/rodal.css"

function EventsList(props) {

    const { events } = props

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