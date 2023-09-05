import { Link } from "react-router-dom";
import "./News.css"


function NewsCard(props) {

    return (
        <div className="containerCard">
        <Link to={props.data.url} className="newsCard" target="_blank" >
            <div>
                <img src={props.data.image_url} alt="" height="100px"/>
                <h3>{props.data.title}</h3>
                <p>source: {props.data.source}</p>
            </div>
        </Link>
        </div>


    )

}
export default NewsCard;