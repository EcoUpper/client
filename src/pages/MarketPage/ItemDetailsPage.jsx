import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom"
import NewProposal from "./../../components/Proposal/NewProposal"
import ProposalCard from "../../components/Proposal/ProposalCard"

function ItemDetailsPage() {

    const { itemId } = useParams();
    const { user } = useContext(AuthContext)
    const [itemInfo, setItemInfo] = useState("");

    const dateAndTimePropEx = itemInfo.expiration_date
    const dateTimeEx = new Date(dateAndTimePropEx)
    const expirationDate = dateTimeEx.toLocaleDateString()

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
          .then((data) => {
            const updatedItemInfo = { ...itemInfo };
            const updatedProposals = updatedItemInfo.proposals.map((prop) => {
              if (prop._id === propId) {
                prop.status = newStatus;
              }
              return prop;
            });
            updatedItemInfo.proposals = updatedProposals;
            setItemInfo(updatedItemInfo);
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
                <Link to={"/market"}><p>Market</p></Link>
                <div key={itemInfo._id}>
                    <p>{itemInfo.name}</p>
                    <p>{itemInfo.description}</p>
                    <img style={{ height: "300px" }} src={itemInfo.image_url} alt="Item image" />
                    <p>{itemInfo.type}</p>
                    {itemInfo.type === "food" && <p>{expirationDate}</p>}
                    <p>{itemInfo.status}</p>
                    <p>{itemInfo.owner?.username}</p>

                    <h2>Make a new proposal</h2>
                    <NewProposal />

                    {user._id === itemInfo.owner._id ?

                        <div className="proposals">
                            <h2>Proposals on the item</h2>
                            {
                                itemInfo.proposals?.length !== 0 ?

                                    itemInfo.proposals?.map((prop) => {
                                        const dateAndTimeProp = prop.date
                                        const dateTime = new Date(dateAndTimeProp)
                                        const date = dateTime.toLocaleDateString()
                                        const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                                        return (
                                            <div>
                                                <ProposalCard data={prop} user={user} key={prop._id} item={itemInfo} date={date} time={time} />
                                                <button onClick={(e) => handleProposalChange(e, prop._id, "Accepted")}>Accepted</button>
                                                <button onClick={(e) => handleProposalChange(e, prop._id, "Rejected")}>Rejected</button>
                                            </div>
                                        )

                                    })
                                    : <p>There are no proposals on this item</p>
                            }
                        </div>
                        :
                        itemInfo.proposals.length !== 0 ?
                            [...itemInfo.proposals].filter((proposal) => {
                                console.log("proposals", itemInfo.proposals);
                                return proposal.created_by == user._id
                            }).map((prop) => {
                                const dateAndTimeProp = prop.date
                                const dateTime = new Date(dateAndTimeProp)
                                const date = dateTime.toLocaleDateString()
                                const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

                                return <ProposalCard data={prop} user={user} key={prop._id} item={itemInfo} date={date} time={time} />
                            })
                            : null
                    }

                </div>
            </div>
        </>
    )
}

export default ItemDetailsPage