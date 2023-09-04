import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom"
import NewProposal from "./../../components/Proposal/NewProposal"
import ProposalCard from "../../components/Proposal/ProposalCard"

function ItemDetailsPage() {

    const { itemId } = useParams();
    const [itemInfo, setItemInfo] = useState("");
    const { user } = useContext(AuthContext)

    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items/" + itemId

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItemInfo(data);
                console.log("item", data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    if (!itemInfo) {
        return <p>Loading...</p>
    }

    return (
        <>
        <div>
            <Link to={"/market"}><p>Market</p></Link>
            <div key={itemInfo._id}>
                <p>{itemInfo.name}</p>
                <p>{itemInfo.description}</p>
                <img style={{height: "300px"}} src={itemInfo.image_url} alt="Item image" />
                <p>{itemInfo.type}</p>
                {itemInfo.type === "food" && <p>{itemInfo.expiration_date}</p>}
                <p>{itemInfo.status}</p>
                <p>{itemInfo.owner?.username}</p>
                
                <h2>Make a new proposal</h2>
                <NewProposal/>

                {user._id === itemInfo.owner._id?
                
                <div className="proposals">
                    <h2>Proposals on the item</h2>
                    {
                    itemInfo.proposals?.length !== 0 ?

                    itemInfo.proposals?.map((prop)=>{
                        const dateAndTimeProp = prop.date
                        const dateTime = new Date(dateAndTimeProp)
                        const date = dateTime.toLocaleDateString()
                        const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                        
                        return <ProposalCard data={prop} user={user} key={prop._id} item={itemInfo} date={date} time={time} />
                    })
                    : <p>There are no proposals on this item</p>
                    }
                </div>
                :  
                itemInfo.proposals.length !== 0?
                [...itemInfo.proposals].filter((proposal)=>{
                    console.log("proposals", itemInfo.proposals);
                    return proposal.created_by == user._id
                }).map((prop) =>{
                    return <ProposalCard data={prop} user={user} key={prop._id} item={itemInfo} />
                })
                : null
                }

            </div>
        </div>
        </>
    )
}

export default ItemDetailsPage