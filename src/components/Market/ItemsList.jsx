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

                    return (
                        <ItemCard item={item}/>
                    )
                })}
            </div>
        </>
    )
}

export default ItemsList

