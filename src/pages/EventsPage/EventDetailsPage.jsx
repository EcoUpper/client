import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import Rodal from "rodal"
import "rodal/lib/rodal.css"

function EventDetailsPage() {

    const { eventId } = useParams();
    const [eventInfo, setEventInfo] = useState({});
    const [showRodal, setShowRodal] = useState(false)
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
            
            <div >
                <p key={eventInfo._id} onClick={()=>setShowRodal(true)}>{eventInfo.title}</p>
                <p>Hosted by: {eventInfo.created_by?.username}</p>
                <p>{date}</p>
                <p>{time}</p>
                <img style={{height: "300px"}} src={eventInfo.image_url} alt="Event image" />
                <p>{eventInfo.content}</p>

                <Rodal visible={showRodal} animation="fade" width={600} height={440}onClose={()=>setShowRodal(false)}> 
                <p>{eventInfo.title}</p>
                <p>Hosted by: {eventInfo.created_by?.username}</p>
                <p>{date}</p>
                <p>{time}</p>
                <img style={{height: "300px"}} src={eventInfo.image_url} alt="Event image" />
                <p>{eventInfo.content}</p>
                </Rodal>          
                 </div>
        </div>
        </>
    )
}

export default EventDetailsPage