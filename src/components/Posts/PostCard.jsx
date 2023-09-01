export default function PostCard(props) {
    return (
        <div className="post-card" key={props.key}>
            <h5>{props.data.created_by.username}</h5>
            {props.data.image_url ?
            <img src={props.data.image_url} alt="" /> : null}
            <p>{props.data.content}</p>
        </div>
    )
}