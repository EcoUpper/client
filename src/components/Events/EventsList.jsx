import EventCard from "./EventCard"

// import Rodal from "rodal"
// import "rodal/lib/rodal.css"

function EventsList(props) {

    const { events } = props

    return (
        <>
            <div className="event-list">
                {events.filter((event)=>{
                    return props.search.toLowerCase() === "" ?
                    event :
                    event.title.toLowerCase().includes(props.search) || event.content.toLowerCase().includes(props.search) || event.location.toLowerCase().includes(props.search)
                })
               .map((event) => {
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