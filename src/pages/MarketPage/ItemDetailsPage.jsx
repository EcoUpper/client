import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import NewProposal from "./../../components/Proposal/NewProposal";
import ProposalCard from "../../components/Proposal/ProposalCard";
import ModifyItem from "../../components/Market/ModifyItem";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./ItemDetailsPage.css";


function ItemDetailsPage() {
  const { itemId } = useParams();
  const { user } = useContext(AuthContext);
  const [itemInfo, setItemInfo] = useState("");
  const [itemProposals, setItemProposals] = useState([]);
  const navigate = useNavigate();
  const [showRodal, setShowRodal] = useState(false);

  const dateAndTimePropEx = itemInfo.expiration_date;
  const dateTimeEx = new Date(dateAndTimePropEx);
  const expirationDate = dateTimeEx.toLocaleDateString();

  const authToken = localStorage.getItem("authToken")
  const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items/" + itemId;
  const proposalUrl =
    process.env.REACT_APP_SERVER_URL + "/db/proposals/" + itemId;
  const itemLocation = "https://maps.google.com/?q=" + itemInfo.location;

  useEffect(() => {
    fetchItemInfo();
    fetchProposals();
  }, []);

  function fetchItemInfo() {
    fetch(apiUrl)
      .then((res) => {
        return res.json();
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
        return res.json();
      })
      .then((data) => {
        const datedProposals = data.map((prop) => ({
          ...prop,
          createdAt: new Date(prop.createdAt),
        }));

        const sortedProposals = datedProposals.sort((a, b) => {
          if (a.createdAt < b.createdAt) {
            return 1;
          } else if (a.createdAt > b.createdAt) {
            return -1;
          } else {
            return 0;
          }
        });
        setItemProposals(sortedProposals);
        console.log("HERE", sortedProposals);
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
        Authorization: `Bearer ${authToken}`
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
        setItemInfo(updatedItemInfo);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleItemSubmit(e, itemId) {
    e.preventDefault();

    const deleteItemUrl =
      process.env.REACT_APP_SERVER_URL + "/db/items/" + itemId;

    fetch(deleteItemUrl, {
      method: "DELETE",
      headers: {Authorization: `Bearer ${authToken}`},
    })
      .then((res) => {
        res.json();

        navigate("/market");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!itemInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="main-cont">
      <div className="item-detail-cont">
      <h1><strong>{itemInfo.name}</strong></h1>
        <div key={itemInfo._id}>
          <div className="item-info-cont">
            <img
              style={{ height: "300px" }}
              src={itemInfo.image_url}
              alt="Item image"
            />
            <div className="item-info">
            <p><strong>Status:</strong> {itemInfo.status}</p>
            <p><strong>Description:</strong> {itemInfo.description}</p>
            <p><strong>Category:</strong> {itemInfo.type}</p>
            {itemInfo.type === "food" && <p><strong>Expires on: </strong>{expirationDate}</p>}
            <p>
            <strong>Pick up at:</strong>{" "}
              <a target="_blank" href={itemLocation}>
                {itemInfo.location}
              </a>
            </p>
            
              <p><strong>Giver:</strong> <Link to={`/profile/${itemInfo.owner._id}`}>{itemInfo.owner?.username}</Link></p>
            
            </div>
          </div>

          {/* IF THE USER IS THE OWNER OF THE ITEM */}
          {user._id === itemInfo.owner._id ? (
            <div className="userIsOwner">
              <button onClick={() => setShowRodal(true)}>Edit</button>
              <Rodal
                visible={showRodal}
                animation="fade"
                width={600}
                height={440}
                onClose={() => setShowRodal(false)}
              >
                <ModifyItem
                  item={itemInfo}
                  key={itemInfo._id}
                  fetchItemInfo={fetchItemInfo}
                  setShowRodal={setShowRodal}
                />
              </Rodal>
              <button className="delete-btn" onClick={(e) => handleItemSubmit(e, itemInfo._id)}>
                Delete
              </button>
              <h3>Proposals on the item</h3>
              <div className="proposals">
              <div className="proposal-container">
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
                        <ProposalCard
                          data={prop}
                          user={user}
                          item={itemInfo}
                          date={date}
                          time={time}
                        />
                        <button
                          onClick={(e) =>
                            handleProposalChange(e, prop._id, "Accepted")
                          }
                        >
                          Accept
                        </button>
                        <button className="delete-btn"
                          onClick={(e) =>
                            handleProposalChange(e, prop._id, "Rejected")
                          }
                        >
                          Reject
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p>
                    There are no proposals for your item yet. Why don't you{" "}
                    <Link to="posts">post</Link> it to get more views?
                  </p>
                )}
                </div>
              </div>
            </div>
          ) : (
            // IF THE USER IS NOT THE OWNER
            <div className="userIsNotOwner">
              <div className="proposals">
                {itemProposals.length === 0 && (
                  <p>
                    There are no proposals for this item yet, now's your chance!
                  </p>
                )}
                <h3>Make a proposal</h3>
                <NewProposal fetchProposals={fetchProposals} />
                <div className="proposal-container">
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
                      <ProposalCard
                        data={prop}
                        user={user}
                        item={itemInfo}
                        date={date}
                        time={time}
                      />
                    </div>
                  );
                })}
                </div>
              </div>
            </div>
          )}
        </div>
        <Link to={"/market"}>
          <p>Go back to market</p>
        </Link>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
