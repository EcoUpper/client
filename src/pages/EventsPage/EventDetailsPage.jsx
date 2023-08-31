import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function EventDetailsPage() {

    const { eventId } = useParams();
    const [eventInfo, setEventInfo] = useState({});
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/events/" + eventId

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
            <div key={eventInfo._id}>
                <p>Hello</p>
                <p>{eventInfo.title}</p>
                <p>{eventInfo.created_by}</p>
                <p>{eventInfo.content}</p>
                <img src={eventInfo.image_url} alt="Event image" />
            </div>
        </>
    )
}

export default EventDetailsPage