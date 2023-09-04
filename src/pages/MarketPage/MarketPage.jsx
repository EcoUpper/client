import ItemsList from "./../../components/Market/ItemsList"
import NewItem from "./../../components/Market/NewItem"
import { useState, useEffect } from "react"


function MarketPage() {
    
    const [items, setItems] = useState([])
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
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    useEffect(() => {
        fetchItems()
    }, [])
    
    if (!items) {
        return <p>Loading...</p>
    }

    return (

        <>
            <NewItem fetchItems={fetchItems}/>
            <ItemsList items={items}/>
        </>
    )
}

export default MarketPage