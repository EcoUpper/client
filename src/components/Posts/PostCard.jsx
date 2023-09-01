export default function PostCard(props) {
    console.log(props)
    return (
        <div className="post-card" key={props.key}>
            {props.data.image_url ?
            <img src={props.data.image_url} alt="" /> : null}
            <p>{props.data.content}</p>
            <p>{props.data.created_by.username}</p>
            <p>{props.date} at {props.time}</p>
        </div>
    )
}