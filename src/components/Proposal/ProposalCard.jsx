import { Link } from "react-router-dom";

function ProposalCard(props) {

    console.log("props are", props.data);

    return (    
                props.data.proposals?.map((proposal)=>{
                return <div className="proposal-card">
                            <p>Date: {proposal.date}</p>
                            <p>Status: {proposal.status}</p>                       
                            <Link to={`/market/${props.data._id}`}><p>{props.data.name}</p></Link>
                        </div>         
                })
    )
}

export default ProposalCard