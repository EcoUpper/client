// import {useState} from "react"
// import "./SearchBarEvents.css"



// // TENEMOS QUE RECIBIR AQUÍ ALLEVENTS PARA HACER EL FILTRO
// // NECESITAMOS ACCESO AL SETEVENTS PARA CAMBIAR LOS ENVENTS EN PANTALLA
// // CREAMOS UNA FUNCIÓN QUE DETECTE UN ONCHANGE EN UN INPUT
// // ESTA FUNCION HACE UN FILTER IGUAL QUE CON EL SELECTE DE EVENTS

// function SearchBarEvents(title) {

//     const [events, setEvents] = useState([])
//     const [allEvents, setAllEvents] = useState([])

//     console.log(title);
//     if (title === "") {
//         return setEvents(allEvents)
//     }
//     const newArray = allEvents.filter((event) => {
//         return event.title.includes(title)

//     })
// }
// export default SearchBarEvents;


import { useState } from "react"

function SearchBarEvents(props) {

    const [searchInput, setSearchInput] = useState("");

    function submitSearch(event) {
        event.preventDefault()
        setSearchInput(event.target.value) 

        props.searchForProduct(event.target.value)
       
    }



    return (
      
            <input placeholder="Search" value={searchInput} onChange={(event) => submitSearch(event)}/>
       
    )
}

export default SearchBarEvents
