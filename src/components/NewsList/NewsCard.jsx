import { Link } from "react-router-dom";

function NewsCard(props) {

    return (

        <Link to={props.data.url} target="_blank" >
            <div className="newsCard">
                <h3>{props.data.title}</h3>
            </div>
        </Link>


    )

}
export default NewsCard;