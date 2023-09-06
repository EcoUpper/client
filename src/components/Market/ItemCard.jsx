import { Link } from "react-router-dom"
import "./ItemCard.css"


function ItemCard(props) {

    const {item, expirationDate } = props

    function statusCheck () {
        if (item.status === "available") {
             return "available" 
        } else if (item.status === "reserved") {
            return "reserved" 
       } else return "gifted"
    }

    return (
        <div className={`cardContainer ${statusCheck()}`}>
            <img className="itemImg" src={item.image_url} alt="Item image" />
            <Link key={item._id} to={`/market/${item._id}`}><h3>{item.name}</h3></Link>
            <h4 style={{ textTransform: "capitalize" }}><strong>{item.status}</strong></h4>
        </div>
    )
}

export default ItemCard;