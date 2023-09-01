// import { useState, useContext } from "react"
// import { useNavigate } from "react-router-dom"
// import { AuthContext } from "../../context/auth.context"

// function NewItem () {

//     const {user} = useContext(AuthContext)
//     const [name, setName] = useState("")
//     const [description, setDescription] = useState("")
//     const [image, setImage] = useState("")
//     const [type, setType] = useState("")
//     const [expirationDate, setExpirationDate] = useState("")
//     const [status, setStatus] = useState("Pending")
    
//     const navigate = useNavigate()
//     const apiUrl = "http://localhost:5005/db/items/create/new"

//     function handleSubmit (e) {
//         e.preventDefault()

//         const body = {
//             name: name,
//             description: description,
//             image_url: image,
//             type: type,
//             expiration_date: expirationDate,
//             status: status
//         }

//         fetch(apiUrl, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(body)
//         })
//         .then((res) => {
//             res.json()
//         })
//         .then((newItem) => {
//             console.log(newItem)
//             setName("")
//             setDescription("")
//             setImage("")
//             setType("")
//             setExpirationDate("")
//             setStatus("Pending")

//             navigate("/market")
//         })
//         .catch((err) => {
//             console.log(err)
//         })
//     }

    
//     return (
//         <>
//         <div>
//                 <form onSubmit={handleSubmit} >
//                     <div>
//                         <label>Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             onChange={(e) => setName(e.target.value)}
//                             value={name}
//                         />
//                     </div>
//                     <div>
//                         <label>Description</label>
//                         <textarea
//                             type="text"
//                             name="description"
//                             onChange={(e) => setDescription(e.target.value)}
//                             value={description}
//                         />
//                     </div>
//                     <div>
//                         <label>Image</label>
//                         <input
//                             type="text"
//                             name="image"
//                             onChange={(e) => setImage(e.target.value)}
//                             value={image}
//                         />
//                     </div>
//                     <div>
//                         <label>Date</label>
//                         <input
//                             type="date"
//                             name="date"
//                             onChange={(e) => setDate(e.target.value)}
//                             value={date}
//                         />
//                     </div>
//                     <div>
//                         <label>Starting time</label>
//                         <input
//                             type="time"
//                             name="time"
//                             onChange={(e) => setTime(e.target.value)}
//                             value={time}
//                         />
//                     </div>
//                     <div>
//                         <label>Location</label>
//                         <input
//                             type="text"
//                             name="location"
//                             onChange={(e) => setLocation(e.target.value)}
//                             value={location}
//                         />
//                     </div>
//                     <button type="submit">Create event</button>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default NewItem