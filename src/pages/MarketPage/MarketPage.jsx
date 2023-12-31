import ItemsList from "./../../components/Market/ItemsList";
import NewItem from "./../../components/Market/NewItem";
import { useState, useEffect, useContext } from "react";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import "./MarketPage.css";
import { AuthContext } from "../../context/auth.context";
import Loading from "../../components/Loading/Loading";

function MarketPage() {
  const { isLoggedIn} = useContext(AuthContext);

  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [showRodal, setShowRodal] = useState(false);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("")

  const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items";

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function handleBtnClick(e) {
    setActive(e.target.id)
  }

  function fetchItems() {
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const datedItems = data.map((item) => ({
          ...item,
          createdAt: new Date(item.createdAt),
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
    fetchItems();
  }, []);

  function filterItems(type) {
    if (type === "All") {
      return setItems(allItems);
    }
    const newArray = allItems.filter((item) => {
      return item.type === type.toLowerCase();
    });

    setItems(newArray);
  }

  if (!items) {
    return <p>Loading...</p>;
  }

  return (
    <div className="market-page">
      <h1>EcoUpper Market</h1>
      <h4 className="subheading">Welcome to our vibrant market community where sharing is caring! <br></br>Share items you no longer need or delicious food that's about to go to waste with fellow community members. <br /> Join us in reducing waste and fostering a spirit of generosity while discovering hidden treasures in your neighborhood.</h4>
      <div className="market-section">
        <div className="filter-cont">
          <div className="filters">
            <button className={active === "1" ? "active" : undefined} onClick={(e) => { filterItems(e.target.value); handleBtnClick(e) }} value="All" id={"1"}>
              All items
            </button>
            <button className={active === "2" ? "active" : undefined} onClick={(e) => { filterItems(e.target.value); handleBtnClick(e) }} value="Food" id={"2"}>
              Food
            </button>
            <button
              className={active === "3" ? "active" : undefined}
              onClick={(e) => { filterItems(e.target.value); handleBtnClick(e) }}
              value="Clothing"
              id={"3"}
            >
              Clothing
            </button>
            <button className={active === "4" ? "active" : undefined} onClick={(e) => { filterItems(e.target.value); handleBtnClick(e) }} value="Other" id={"4"}>
              Other
            </button>
            <input className="marketSearchInput" type="text" name="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

          </div>
          <div className="create-btn">
            {isLoggedIn ? (
              <button onClick={() => setShowRodal(true)}>Create Item</button>
            ) : null}

            <Rodal
              visible={showRodal}
              animation="fade"
              width={500}
              height={500}
              onClose={() => setShowRodal(false)}
            >
              <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <NewItem fetchItems={fetchItems} setShowRodal={setShowRodal} />
              </div>
            </Rodal>
          </div>

        </div>

        <div className="items-list">
          {items.length === 0 ? (
            <Loading/>
          ) : (
            <ItemsList items={items} search={search} />
          )}
        </div>
        <div>
          <button className="back-top-btn" onClick={scrollToTop}>Back to top</button>
        </div>
      </div>
    </div>
  );
}

export default MarketPage;
