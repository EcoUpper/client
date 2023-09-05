import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom"
import NewProposal from "./../../components/Proposal/NewProposal"
import ProposalCard from "../../components/Proposal/ProposalCard"

function ItemDetailsPage() {

    const { itemId } = useParams();
    const { user } = useContext(AuthContext)
    const [itemInfo, setItemInfo] = useState("")
    const [itemProposals, setItemProposals] = useState("")

    const dateAndTimePropEx = itemInfo.expiration_date
    const dateTimeEx = new Date(dateAndTimePropEx)
    const expirationDate = dateTimeEx.toLocaleDateString()

    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items/" + itemId
    const proposalUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/" + itemId

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

        fetchProposals()
    }, []);

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

        const modifyProposalUrl =
            process.env.REACT_APP_SERVER_URL + "/db/proposals/" + propId;

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
                    <p>
                        <strong>{itemInfo.name}</strong>
                    </p>
                    <p>{itemInfo.status}</p>
                    <img
                        style={{ height: "300px" }}
                        src={itemInfo.image_url}
                        alt="Item image"
                    />
                    <p>{itemInfo.description}</p>
                    <p>{itemInfo.type}</p>
                    {itemInfo.type === "food" && <p>{expirationDate}</p>}
                    <p>{itemInfo.owner?.username}</p>

                    <h3>Make a proposal</h3>
                    <NewProposal fetchProposals={fetchProposals} />

                    {user._id === itemInfo.owner._id ? (
                        <div className="proposals">
                            {itemInfo.proposals?.length !== 0 ? (
                                itemInfo.proposals?.map((prop) => {
                                    const dateAndTimeProp = prop.date;
                                    const dateTime = new Date(dateAndTimeProp);
                                    const date = dateTime.toLocaleDateString();
                                    const time = dateTime.toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });

                                    return (
                                        <div key={prop._id}>
                                            <ProposalCard data={prop} user={user} item={itemInfo} date={date} time={time}/>
                                            <button onClick={(e) => handleProposalChange(e, prop._id, "Accepted")}>Accepted</button>
                                            <button onClick={(e) => handleProposalChange(e, prop._id, "Rejected")}>Rejected</button>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>
                                    There are no proposals for this item yet,
                                    now's your chance!
                                </p>
                            )}
                        </div>
                    ) : itemProposals.length !== 0 ? (
                        <div className="proposals">
                            {itemProposals.map((prop) => {
                                console.log("PARROP", prop);
                                const dateAndTimeProp = prop.date;
                                const dateTime = new Date(dateAndTimeProp);
                                const date = dateTime.toLocaleDateString();
                                const time = dateTime.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                });

                                return (
                                     <div key={prop._id}>
                                       <ProposalCard data={prop} user={user} item={itemInfo} date={date} time={time}/>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p>There are no proposals for this item yet, now's your chance!</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ItemDetailsPage