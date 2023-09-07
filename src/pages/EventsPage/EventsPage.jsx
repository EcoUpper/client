import { useState, useEffect, useContext } from "react";
import EventsList from "./../../components/Events/EventsList";
import NewEvent from "./../../components/Events/NewEvent";
import Rodal from "rodal";
import "rodal/lib/rodal.css";
import { AuthContext } from "../../context/auth.context";
import "./EventsPage.css"

function EventsPage() {
  const { isLoggedIn } = useContext(AuthContext);

  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [showRodal, setShowRodal] = useState(false);
  const [search, setSearch] = useState("");
  const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/events";

  function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function fetchEvents() {
    fetch(apiUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const sortedEvents = data.sort((a, b) => {
          if (a.date < b.date) {
            return -1;
          } else if (a.date > b.date) {
            return 1;
          } else {
            return 0;
          }
        });
        setEvents(sortedEvents);
        setAllEvents(sortedEvents);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  function filterEvents(date) {
    console.log("DATE HERE", date);
    if (date === "All") {
      return setEvents(allEvents);
    }
    const newArray = allEvents.filter((event) => {
      const eventDate = new Date(event.date);
      console.log(event);
      return date == eventDate.getMonth() + 1;
    });
    console.log(newArray);

    setEvents(newArray);
  }

  return (
    <div className="event-cont">
      <div className="event-filter-cont">
        <div className="event-filter">
          <select onChange={(e) => filterEvents(e.target.value)} id="">
            <option>All</option>
            <option value="1">January</option>
            <option value="2">February</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="11">December</option>
          </select>

          <input
            className="event-search"
            type="text"
            name="search"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="event-btn">
          {isLoggedIn ? (
            <button onClick={() => setShowRodal(true)}>Create event</button>
          ) : null}
          <Rodal
            visible={showRodal}
            animation="fade"
            width={600}
            height={500}
            onClose={() => setShowRodal(false)}
          >
            <NewEvent fetchEvents={fetchEvents} setShowRodal={setShowRodal}/>
          </Rodal>
        </div>
      </div>

      <EventsList events={events} search={search} />
      <div>
        <button className="back-to-top" onClick={scrollToTop}>Back to top</button>
      </div>
    </div>
  );
}

export default EventsPage;
