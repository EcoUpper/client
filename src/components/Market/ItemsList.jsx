import ItemCard from "./ItemCard"



function ItemsList(props) {

    const {items} = props


    // const openRodal = (item) => {
    //     setSelectedItem(item)
    //     setShowRodal(true)
    // }
    // const closeRodal = () => {
    //     setSelectedItem(null)
    //     setShowRodal(false)
    // }

    return (
        <>
            <div className="itemsContainer">
                {items.map((item) => {
                    const dateAndTimePropEx = item.expiration_date
                    const dateTimeEx = new Date(dateAndTimePropEx)

                    const expirationDate = dateTimeEx.toLocaleDateString()

                    return (
                        <ItemCard item={item} expirationDate={expirationDate}/>
                    )
                })}
            </div>
            {/* <Rodal
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
            </Rodal> */}
        </>
    )
}

export default ItemsList

