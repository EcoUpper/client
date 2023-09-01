import { Link } from "react-router-dom";

export default function EventCard(props) {


  return (
    <div style={{ width: "400px" }}>
      <Link key={props.data._id} to={`/events/${props.data._id}`}>
        <h3>{props.data.title}</h3>
      </Link>
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
  );
}
