import { Link } from "react-router-dom";

function ProposalCard(props) {

    console.log("props are", props.data);

    return (    
            <div className="proposal-card" key={props.data._id}>
                <p>Date: {props.data.date}</p>
                <p>Status: {props.data.status}</p>
                {props.user._id === props.item.owner._id ? null 
                :                    
                <Link to={`/market/${props.item._id}`}><p>{props.item.name}</p></Link>
                }
            </div>     
    )
}

export default ProposalCard;