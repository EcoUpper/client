import ItemCard from "./ItemCard"


function ItemsList(props) {

    const {items} = props


    return (
        <>
            <div>
                {items.map((item) => {
                    const dateAndTimePropEx = item.expiration_date
                    const dateTimeEx = new Date(dateAndTimePropEx)

                    const expirationDate = dateTimeEx.toLocaleDateString()

                    return (
                        <ItemCard item={item} expirationDate={expirationDate}/>
                    )
                })}
            </div>
        </>
    )
}

export default ItemsList