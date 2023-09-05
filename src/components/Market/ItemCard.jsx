import { Link } from "react-router-dom"
import "./ItemCard.css"


function ItemCard(props) {

    const {item, expirationDate } = props

    return (
        <div className="cardContainer" style={{ width: "400px" }}>
            <Link key={item._id} to={`/market/${item._id}`}><h3>{item.name}</h3></Link>
            <h4 style={{ textTransform: "capitalize" }}><strong>{item.status}</strong></h4>
            <img className="itemImg" src={item.image_url} alt="Item image" />
        </div>
    )
}

export default ItemCard;