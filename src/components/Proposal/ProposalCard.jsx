import { Link } from "react-router-dom";
import "./ProposalCard.css"

function ProposalCard(props) {

    const {time, date} = props

    return (    
            <div className="proposal-info" key={props.data._id}>
                <p>Date: {date} {time}</p>
                <p>Status: {props.data.status === "Accepted"? "✅" : "❌"}</p>
                {props.user._id === props.item.owner._id ? null 
                :                   
                props.link?<Link to={`/market/${props.link}`}><p>{props.item.name}</p></Link> : null
                }
            </div>     
    )
}

export default ProposalCard;