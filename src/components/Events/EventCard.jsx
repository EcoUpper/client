import { useState } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { Link } from "react-router-dom";
import "./EventCard.css";

export default function EventCard(props) {
  const [showRodal, setShowRodal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const itemLocation = "https://maps.google.com/?q=" + props.data.location

  const openRodal = (event) => {
    setSelectedEvent(event);
    setShowRodal(true);
  };
  const closeRodal = () => {
    setSelectedEvent(null);
    setShowRodal(false);
  };

  return (
    <div className="event-list">
      <div className="event-card" onClick={() => openRodal(props.data)}>
        <img
          src={props.data.image_url}
          alt="Event image"
        />
        <div className="event-info">
          <h3>{props.data.title}</h3>
          <p>
            <strong>Date:</strong> {props.date}
          </p>
          <p>
            <strong>Location:</strong>{" "}
            <a target="_blank" href={itemLocation}>
              {props.data.location}
            </a>
          </p>
        </div>
      </div>
      <Rodal
        visible={showRodal}
        onClose={closeRodal}
        animation="fade"
        width={500}
        height={500}
      >
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        {selectedEvent && (
          <div className="rodal-main">
            <div className="rodal-cont">
              <img
                style={{ height: "300px", width: "90%" }}
                src={selectedEvent.image_url}
                alt="Event image"
              />
              <div className="rodal-info">
                <h3>{selectedEvent.title}</h3>
                <p>
                  <strong>Hosted by:</strong>{" "}
                  <Link to={`/profile/${props.data.created_by?._id}`}>
                    {props.data.created_by?.username}
                  </Link>
                </p>
                <p>
                  <strong>Date:</strong> {props.date} {props.time}
                </p>
                <p>
                  <strong>Location:</strong> <a target="_blank" href={itemLocation}>
              {props.data.location}
            </a>
                </p>
              </div>
            </div>
                <p className="description">{selectedEvent.content}</p>
          </div>
        )}</div>
      </Rodal>
    </div>
  );
}
