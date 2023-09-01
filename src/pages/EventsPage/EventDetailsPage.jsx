import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

function EventDetailsPage() {

    const { eventId } = useParams();
    const [eventInfo, setEventInfo] = useState({});
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/events/" + eventId

    const dateAndTime = eventInfo.date
    const dateTime = new Date(dateAndTime)

    const date = dateTime.toLocaleDateString()
    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setEventInfo(data);
                console.log(data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [apiUrl]);

    if (!eventInfo) {
        return <p>Loading...</p>
    }

    return (
        <>
        <div>
            <Link to={"/events"}><p>All events</p></Link>
            <div key={eventInfo._id}>
                <p>{eventInfo.title}</p>
                <p>Hosted by: {eventInfo.created_by?.username}</p>
                <p>{date}</p>
                <p>{time}</p>
                <img style={{height: "300px"}} src={eventInfo.image_url} alt="Event image" />
                <p>{eventInfo.content}</p>
            </div>
        </div>
        </>
    )
}

export default EventDetailsPage