import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css"
import { Link } from "react-router-dom";

export default function EventCard(props) {
  const [showRodal, setShowRodal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)


  console.log(props)
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
      <div style={{ width: "400px" }}>

        <h3 onClick={() => openRodal(props.data)}>{props.data.title}</h3>
        <p>{props.date}</p>
        <img
          style={{ height: "300px" }}
          src={props.data.image_url}
          alt="Event image"
        />
      </div>
      <Rodal
        visible={showRodal}
        onClose={closeRodal}
        animation="fade"
        width={600}
        height={550}
      >
        {selectedEvent && (
          <>
            <h3>{selectedEvent.title}</h3>
            <p>Hosted by <Link to={`/profile/${props.data.created_by._id}`}>{props.data.created_by.username}</Link></p>
            <p>{props.date}</p>
            <p>{props.time}</p>
            <img
              style={{ height: "300px" }}
              src={selectedEvent.image_url}
              alt="Event image"
            />
            <p>{selectedEvent.content}</p>
          </>
        )}
      </Rodal>
    </>
  );
}

