import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

function ItemsList() {
    const [items, setItems] = useState([])
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items"

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setItems(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (!items) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div>
                {items.map((item) => {
                     const dateAndTimePropEx = item.expiration_date
                     const dateTimeEx = new Date(dateAndTimePropEx)

                     const expirationDate = dateTimeEx.toLocaleDateString()

                    return (
                        <div style={{ width: "400px" }}>
                            <Link key={item._id} to={`/market/${item._id}`}><h3>{item.name}</h3></Link>
                            <h4><strong>{item.status}</strong></h4>
                            <img style={{ height: "300px" }} src={item.image_url} alt="Item image" />
                            <p>{item.description}</p>
                            {item.type === "food" && <p>{expirationDate}</p>}
                            <h4>Current Proposals</h4>
                            {/* {item.proposals?.map((proposal) => {
                                const dateAndTimeProp = proposal.date
                                const dateTime = new Date(dateAndTimeProp)

                                const date = dateTime.toLocaleDateString()
                                const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                return (
                                    <div key={proposal._id}>
                                        <p>{date} at {time}</p>
                                        <p>{proposal.status}</p>
                                    </div>
                                )
                            })
                            } */}
                            <p>Number of proposals: {item.proposals.length}</p>
                            {/* <p>{item.owner?.username}</p> */}
                        </div>

                    )
                })}
            </div>
        </>
    )
}

export default ItemsList