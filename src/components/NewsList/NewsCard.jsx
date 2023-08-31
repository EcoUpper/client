import { Link } from "react-router-dom";

function NewsCard(props) {

    return (

        <Link to={props.data.url}>
            <div className="newsCard">
                <h3>{props.data.title}</h3>
                <h3>{props.data.url}</h3>
            </div>
        </Link>


    )

}
export default NewsCard;