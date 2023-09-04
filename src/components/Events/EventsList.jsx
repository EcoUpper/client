import EventCard from "./EventCard"


function EventsList(props) {

    const {events} = props
 
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