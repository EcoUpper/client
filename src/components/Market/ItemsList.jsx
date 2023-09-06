import { useState } from "react"
import ItemCard from "./ItemCard"
import "./ItemCard.css"


function ItemsList(props) {

    const {items, search} = props

    return (
        <> 
            
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
            
        </>
    )
}

export default ItemsList

