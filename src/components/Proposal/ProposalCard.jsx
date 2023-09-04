import { Link } from "react-router-dom";

function ProposalCard(props) {

    console.log("props are", props.data);

    const {time, date} = props

    console.log("time", time);

    return (    
            <div className="proposal-card" key={props.data._id}>
                <p>Date: {date} at {time}</p>
                <p>Status: {props.data.status}</p>
                {props.user._id === props.item.owner._id ? null 
                :                    
                <Link to={`/market/${props.item._id}`}><p>{props.item.name}</p></Link>
                }
            </div>     
    )
}

export default ProposalCard;