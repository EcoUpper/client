import { Link } from "react-router-dom";

function ProposalCard(props) {

    const {time, date} = props

    return (    
            <div className="proposal-card" key={props.data._id}>
                <p>Date: {date} at {time}</p>
                <p>Status: {props.data.status}</p>
                {props.user._id === props.item.owner._id ? null 
                :                   
                props.link?<Link to={`/market/${props.link}`}><p>{props.item.name}</p></Link> : null
                }
            </div>     
    )
}

export default ProposalCard;