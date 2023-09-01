function ItemCard (props) {
    return (
        <div className="item-card">
            <h3>{props.data.name}</h3>
            <p>{props.data.description}</p>
            <img src={props.data.image_url} alt="Item image" />
            <p>{props.data.type}</p>
            <p>{props.data.status}</p>
            <p>Proposals: {props.data.proposals.length}</p>
        </div>
    )
}

export default ItemCard;