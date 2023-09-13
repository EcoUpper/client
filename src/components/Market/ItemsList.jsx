import ItemCard from "./ItemCard"
import "./ItemCard.css"


function ItemsList(props) {

    const {items, search} = props

    return (
        <>      
                {items.filter((item)=>{
                    return search.toLowerCase() === "" ?
                    item :
                    item.name.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase()) 
                    || item.location.toLowerCase().includes(search.toLowerCase())
                })               
                .map((item) => {

                    return (
                        <ItemCard item={item} key={item._id}/>
                    )
                })}
        </>
    )
}

export default ItemsList

