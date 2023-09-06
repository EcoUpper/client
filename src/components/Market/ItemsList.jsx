import { useState } from "react"
import ItemCard from "./ItemCard"


function ItemsList(props) {

    const {items} = props

    const [search, setSearch] = useState("")

    return (
        <>
            <div className="itemsContainer">
            <input type="text" name="search" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)}/>

                {items.filter((item)=>{
                    return search.toLowerCase() === "" ?
                    item :
                    item.name.toLowerCase().includes(search) || item.description.toLowerCase().includes(search) || item.location.toLowerCase().includes(search)
                })               
                .map((item) => {
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

