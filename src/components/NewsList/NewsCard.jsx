import { Link } from "react-router-dom"


function NewsCard(props) {

    return (
            <Link to={props.data.url} className="containerCard" target="_blank" >
                <img src={props.data.image_url} alt="News image" />
                <div className="newsTextCard">
                    <h3>{props.data.title}</h3>
                    <p>Source: {props.data.source}</p>
                </div>
            </Link>
    )

}
export default NewsCard;