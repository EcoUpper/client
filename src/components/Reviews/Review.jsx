export default function ReviewCard(props) {
    return(
        <div className="review-card">
            <h4>{props.data.title}</h4>
            <p>{props.data.comment}</p>
            <p>{props.data.rating}</p>
        </div>
    )
}