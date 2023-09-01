import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

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
                <img style={{height: "300px"}} src={itemInfo.image_url} alt="Event image" />
                <p>{itemInfo.type}</p>
                {itemInfo.type === "food" && <p>{itemInfo.expiration_date}</p>}
                {itemInfo.proposals?.map((proposal) => {
                    return (
                        <p>{proposal}</p>
                    )
                })
                }
                <p>{itemInfo.status}</p>
                <p>{itemInfo.owner?.username}</p>
            </div>
        </div>
        </>
    )
}

export default ItemDetailsPage