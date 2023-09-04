import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css"

export default function EventCard(props) {
  const [showRodal, setShowRodal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

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

        <p>Hosted by: {props.data.created_by.username}</p>
        <p>{props.date}</p>
        <p>{props.time}</p>
        <img
          style={{ height: "300px" }}
          src={props.data.image_url}
          alt="Event image"
        />
        <p>{props.data.content}</p>
      </div>
      <Rodal
        visible={showRodal}
        onClose={closeRodal}
        animation="fade"
        width={600}
        height={440}
      >
        {selectedEvent && (
          <>
            <h3>{selectedEvent.title}</h3>
            <p>Hosted by: {selectedEvent.username}</p>
            <p>{selectedEvent.date}</p>
            <p>{selectedEvent.time}</p>
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

