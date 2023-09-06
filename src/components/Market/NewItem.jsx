import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import uploadImage from "../../services/file-upload.service"


function NewItem(props) {

    const { fetchItems } = props

    const { user } = useContext(AuthContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [type, setType] = useState("other")
    const [expirationDate, setExpirationDate] = useState("")
    const [status, setStatus] = useState("available")
    const [location, setLocation] = useState("")

    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items/create/new"

    const handleFileUpload = (e) => {
        const formData = new FormData()
        formData.append("image_url", e.target.files[0])

        uploadImage(formData)
            .then((res) => {
                console.log("upload res", res);
                setImage(res.image_url)
            })
            .catch(err => console.log(err))

    }

    function handleSubmit(e) {
        e.preventDefault()

        const body = {
            name: name,
            description: description,
            image_url: image,
            type: type,
            expiration_date: expirationDate,
            status: status,
            owner: user,
            location: location
        }

        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then((res) => {
                res.json()
            })
            .then((newItem) => {
                console.log(newItem)
                setName("")
                setDescription("")
                setImage("")
                setType("other")
                setExpirationDate("")
                setStatus("available")
                setLocation("")

                fetchItems()
                navigate("/market")
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <div>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            type="text"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="file" onChange={(e) => handleFileUpload(e)} />
                    </div>
                    <div>
                        <label>Type</label>
                        <select
                            name="type"
                            onChange={(e) => setType(e.target.value)}
                            value={type}
                        >
                            <option value="other">Other</option>
                            <option value="food">Food</option>
                            <option value="clothing">Clothing</option>
                        </select>
                    </div>
                    {type === "food" &&
                        <div>
                            <label>Expiration Date</label>
                            <input
                                type="date"
                                name="date"
                                onChange={(e) => setExpirationDate(e.target.value)}
                                value={expirationDate}
                            />
                        </div>
                    }
                    <div>
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </div>
                    {/* <div>
                        <label>Status</label>
                        <select
                            name="status"
                            onChange={(e) => setStatus(e.target.value)}
                            value={status}
                        >
                            <option value="available">Available</option>
                            <option value="reserved">Reserved</option>
                            <option value="gifted">Gifted</option>
                        </select>
                    </div> */}
                    <button type="submit">Create item</button>
                </form>
            </div>
        </>
    )
}

export default NewItem