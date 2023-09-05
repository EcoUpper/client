import ItemsList from "./../../components/Market/ItemsList"
import NewItem from "./../../components/Market/NewItem"
import { useState, useEffect } from "react"


function MarketPage() {
    
    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items"
    
    function fetchItems() {
        fetch(apiUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const datedItems = data.map((item) => ({
                    ...item,
                    createdAt: new Date(item.createdAt)
                }));

                const sortedItems = datedItems.sort((a, b) => {
                    if (a.createdAt < b.createdAt) {
                        return 1;
                    } else if (a.createdAt > b.createdAt) {
                        return -1;
                    } else {
                        return 0;
                    }
                });
                setItems(sortedItems);
                setAllItems(sortedItems);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    useEffect(() => {
        fetchItems()
    }, [])

    // CREAR funcion filterItems(type) que se activa en el onchange del select
    // esta funcion debe incluir un nuevo array con los items filtrados const newArray = items.filter((item)= return item.type === type)
    
    function filterItems(type) {
        console.log(type);
        if (type === "All"){
            return setItems (allItems)
        }
        const newArray = allItems.filter((item) => {
            console.log(item);
            return item.type === type.toLowerCase();
        });
        console.log(newArray);

        setItems(newArray)
    }

    if (!items) {
        return <p>Loading...</p>
    }

    return (

        <>
            <NewItem fetchItems={fetchItems}/>
            <select onChange={(e)=>filterItems(e.target.value)} id="">
                    <option >All</option>
                    <option >Food</option>
                    <option >Clothing</option>
                    <option >Other</option>
                </select>
            <ItemsList items={items}/>
        </>
    )
}

export default MarketPage