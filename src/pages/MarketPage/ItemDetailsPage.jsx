import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import NewProposal from "./../../components/Proposal/NewProposal"

function ItemDetailsPage() {

    const { itemId } = useParams();
    const [itemInfo, setItemInfo] = useState({});
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items/" + itemId

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItemInfo(data);
                console.log(data);

            })
            .catch((err) => {
                console.log(err);
            });
    }, [apiUrl]);

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

                    itemInfo.proposals.map((prop)=>{
                        return <ProposalCard data={prop} user={user} key={prop._id} item={itemInfo} />
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