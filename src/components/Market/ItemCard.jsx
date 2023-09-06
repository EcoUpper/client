import { Link } from "react-router-dom"
import "./ItemCard.css"


function ItemCard(props) {

    const {item} = props

    function statusCheck () {
        if (item.status === "available") {
             return "available" 
        } else if (item.status === "reserved") {
            return "reserved" 
       } else return "gifted"
    }

    return (
        <Link key={item._id} to={`/market/${item._id}`}>
            <div className={`cardContainer ${statusCheck()}`}>
                <img className="itemImg" src={item.image_url} alt="Item image" />
                <h3>{item.name}</h3>
                <h5 style={{ textTransform: "capitalize" }}>{item.status}</h5>
            </div>
        </Link>
    )
}

export default ItemCard;