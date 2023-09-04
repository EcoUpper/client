import { Link } from "react-router-dom"

function ItemCard(props) {

    const {item, expirationDate } = props

    return (
        <div style={{ width: "400px" }}>
            <Link key={item._id} to={`/market/${item._id}`}><h3>{item.name}</h3></Link>
            <h4 style={{ textTransform: "capitalize" }}><strong>{item.status}</strong></h4>
            <img style={{ height: "300px" }} src={item.image_url} alt="Item image" />
            <p>{item.description}</p>
            {item.type === "food" && <p>{expirationDate}</p>}
            <h4>Current Proposals</h4>
            
            <p>Number of proposals: {item.proposals.length}</p>
            {/* <p>{item.owner?.username}</p> */}
        </div>
    )
}

export default ItemCard;