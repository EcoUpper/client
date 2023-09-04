import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
import Rodal from "rodal"
import "rodal/lib/rodal.css"

function ItemsList() {
    const [items, setItems] = useState([])
    const [showRodal, setShowRodal] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items"



    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
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

    const openRodal = (item) => {
        setSelectedItem(item)
        setShowRodal(true)
    }
    const closeRodal = () => {
        setSelectedItem(null)
        setShowRodal(false)
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
                            <h3 onClick={() => openRodal(item)}>{item.name}</h3>
                            <h4>
                                <strong>{item.status}</strong>
                            </h4>
                            <img
                                style={{ height: "300px" }}
                                src={item.image_url}
                                alt={item.name}
                            />
                            <p>{item.description}</p>
                            {item.type === "food" && <p>{item.expirationDate}</p>}
                            <h4>Current Proposals</h4>
                            {item.proposals?.map((proposal) => {
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
                            })}
                        </div>
                    )
                })}
            </div>
            <Rodal
                visible={showRodal}
                onClose={closeRodal}
                animation="fade"
                width={600}
                height={440}
            >
                {selectedItem && (
                    <>
                        <h3>{selectedItem.name}</h3>
                        <h4>
                            <strong>{selectedItem.status}</strong>
                        </h4>
                        <img
                            style={{ height: "300px" }}
                            src={selectedItem.image_url}
                            alt={selectedItem.name}
                        />
                        <p>{selectedItem.description}</p>
                        {selectedItem.type === "food" && <p>{selectedItem.expirationDate}</p>}
                        <h4>Current Proposals</h4>
                        {selectedItem.proposals?.map((proposal) => {
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
                        })}
                    </>
                )}
            </Rodal>
        </>
    )
}

export default ItemsList

