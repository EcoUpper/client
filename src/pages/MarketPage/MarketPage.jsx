import ItemsList from "./../../components/Market/ItemsList"
import NewItem from "./../../components/Market/NewItem"
import { useState, useEffect, useContext } from "react"
import Rodal from "rodal"
import "rodal/lib/rodal.css"
import "./MarketPage.css"
import { AuthContext } from "../../context/auth.context"



function MarketPage() {

    const { isLoggedIn } = useContext(AuthContext)

    const [items, setItems] = useState([])
    const [allItems, setAllItems] = useState([])
    const [showRodal, setShowRodal] = useState(false)
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items"

    function scrollToTop() {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

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


    function filterItems(type) {
        console.log(type);
        if (type === "All") {
            return setItems(allItems)
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
            {isLoggedIn ? <button onClick={() => setShowRodal(true)}>Create Item</button> : null}
            <Rodal visible={showRodal} animation="fade" width={600} height={440}>
                <NewItem fetchItems={fetchItems} setShowRodal={setShowRodal} />
            </Rodal>

            <div>
                <button onClick={(e) => filterItems(e.target.value)} value="All">All items</button>
                <button onClick={(e) => filterItems(e.target.value)} value="Food">Food</button>
                <button onClick={(e) => filterItems(e.target.value)} value="Clothing">Clothing</button>
                <button onClick={(e) => filterItems(e.target.value)} value="Other">Other</button>
            </div>

            <div>
            {items.length === 0 ? <p>There are currently no available items matching your search.</p> 
            
            : <ItemsList items={items} />}
            </div>
            <button onClick={scrollToTop}>Back to top</button>

        </>
    )
}

export default MarketPage