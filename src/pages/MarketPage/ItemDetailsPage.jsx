import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom"
import NewProposal from "./../../components/Proposal/NewProposal"
import ProposalCard from "../../components/Proposal/ProposalCard"
import ModifyItem from "../../components/Market/ModifyItem"
import Rodal from "rodal"
import "rodal/lib/rodal.css"
import ProfilePage from "../ProfilePage/ProfilePage"

function ItemDetailsPage() {

    const { itemId } = useParams();
    const { user } = useContext(AuthContext)
    const [itemInfo, setItemInfo] = useState("")
    const [itemProposals, setItemProposals] = useState([])
    const navigate = useNavigate()
    const [showRodal, setShowRodal] = useState(false)

    const dateAndTimePropEx = itemInfo.expiration_date
    const dateTimeEx = new Date(dateAndTimePropEx)
    const expirationDate = dateTimeEx.toLocaleDateString()

    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items/" + itemId
    const proposalUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/" + itemId
    const itemLocation = "https://maps.google.com/?q=" + itemInfo.location

    useEffect(() => {

        fetchItemInfo()
        fetchProposals()
    }, []);

    function fetchItemInfo() {
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
    }

    function fetchProposals() {
        fetch(proposalUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const datedProposals = data.map((prop) => ({
                    ...prop,
                    createdAt: new Date(prop.createdAt)
                }));

                const sortedProposals = datedProposals.sort((a, b) => {
                    if (a.createdAt < b.createdAt) {
                        return 1;
                    } else if (a.createdAt > b.createdAt) {
                        return -1;
                    } else {
                        return 0;
                    }
                })
                setItemProposals(sortedProposals);
                console.log("HERE", sortedProposals)
            })
            .catch((err) => {
                console.log(err);
            });
    }


    function handleProposalChange(e, propId, newStatus) {
        console.log("PROPID", propId);
        e.preventDefault();

        const modifyProposalUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/" + propId;

        fetch(modifyProposalUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: newStatus }),
        })
            .then((res) => res.json())
            .then(() => {
                const updatedItemInfo = { ...itemInfo };
                const updatedProposals = updatedItemInfo.proposals.map((prop) => {
                    if (prop._id === propId) {
                        prop.status = newStatus;
                    }
                    return prop;
                });
                updatedItemInfo.proposals = updatedProposals;
                setItemInfo(updatedItemInfo)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleItemSubmit(e, itemId) {
        e.preventDefault()

        const deleteItemUrl = process.env.REACT_APP_SERVER_URL + "/db/items/" + itemId

        fetch(deleteItemUrl, {
            method: "DELETE"
        })
            .then((res) => {
                res.json()

                navigate("/market")
            })
            .catch((err) => {
                console.log(err)
            })

    }


    if (!itemInfo) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div>
                <Link to={"/market"}>
                    <p>Go back to market</p>
                </Link>
                <div key={itemInfo._id}>
                    <p><strong>{itemInfo.name}</strong></p>
                    <p>{itemInfo.status}</p>
                    <img style={{ height: "300px" }} src={itemInfo.image_url} alt="Item image" />
                    <p>{itemInfo.description}</p>
                    <p>{itemInfo.type}</p>
                    {itemInfo.type === "food" && <p>{expirationDate}</p>}
                    <p>Pick up at <a target="_blank" href={itemLocation}>{itemInfo.location}</a></p>
                    <Link to={`/profile/${itemInfo.owner._id}`}><p>{itemInfo.owner?.username}</p></Link>

                    {/* IF THE USER IS THE OWNER OF THE ITEM */}
                    {user._id === itemInfo.owner._id ? (
                        <div className="userIsOwner">
                            <button onClick={() => setShowRodal(true)}>Edit</button>
                            <Rodal visible={showRodal} animation="fade" width={600} height={440} onClose={() => setShowRodal(false)}>
                                <ModifyItem item={itemInfo} key={itemInfo._id} fetchItemInfo={fetchItemInfo} />
                            </Rodal>
                            <button onClick={(e) => handleItemSubmit(e, itemInfo._id)}>Delete</button>
                            <div className="proposals">
                                {itemInfo.proposals?.length !== 0 ? (
                                    itemInfo.proposals?.map((prop) => {
                                        const dateAndTimeProp = prop.date;
                                        const dateTime = new Date(dateAndTimeProp);
                                        const date = dateTime.toLocaleDateString();
                                        const time = dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

                                        return (
                                            <div key={prop._id}>
                                                <ProposalCard data={prop} user={user} item={itemInfo} date={date} time={time} />
                                                <button onClick={(e) => handleProposalChange(e, prop._id, "Accepted")}>Accepted</button>
                                                <button onClick={(e) => handleProposalChange(e, prop._id, "Rejected")}>Rejected</button>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p>There are no proposals for your item yet. Why don't you <Link to="posts">post</Link> it to get more views?</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        // IF THE USER IS NOT THE OWNER
                        <div className="userIsNotOwner">
                            
                                <div className="proposals">
                                    {itemProposals.length === 0 && <p>There are no proposals for this item yet, now's your chance!</p>}
                                    <h3>Make a proposal</h3>
                                    <NewProposal fetchProposals={fetchProposals} />
                                    {itemProposals.map((prop) => {
                                        console.log("PARROP", prop);
                                        const dateAndTimeProp = prop.date;
                                        const dateTime = new Date(dateAndTimeProp);
                                        const date = dateTime.toLocaleDateString();
                                        const time = dateTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                                        
                                        return (
                                            <div key={prop._id}>
                                                <ProposalCard data={prop} user={user} item={itemInfo} date={date} time={time} />
                                            </div>
                                        )
                                    })}
                                </div>
                                
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ItemDetailsPage