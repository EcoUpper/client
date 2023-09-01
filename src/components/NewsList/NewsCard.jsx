import { Link } from "react-router-dom";
import "./NewsList.css"

function NewsCard(props) {

    return (

        <Link to={props.data.url} target="_blank" className="newsCard">
            <div>
                <h3>{props.data.title}</h3>
            </div>
        </Link>


    )

}
export default NewsCard;