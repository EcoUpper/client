import { Link } from "react-router-dom";
import "./News.css"


function NewsCard(props) {

    return (
        <div className="containerCard">
        <Link to={props.data.url} className="newsCard" target="_blank" >
            <div>
                <h3>{props.data.title}</h3>
            </div>
        </Link>
        </div>


    )

}
export default NewsCard;