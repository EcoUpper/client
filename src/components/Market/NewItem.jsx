import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import uploadImage from "../../services/file-upload.service"
import * as yup from 'yup'
import "./NewItem.css"


function NewItem(props) {

    const { fetchItems, setShowRodal } = props

    const { user } = useContext(AuthContext)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [image, setImage] = useState("")
    const [type, setType] = useState("other")
    const [expirationDate, setExpirationDate] = useState("")
    const [status, setStatus] = useState("available")
    const [location, setLocation] = useState("")

    const navigate = useNavigate()

    const authToken = localStorage.getItem("authToken")
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/items/create/new"

    const itemSchema = yup.object().shape({
        name: yup.string().required(),
        description: yup.string().required(),
        location: yup.string().required(),
      })

    async function validateForm() {
    
        let dataObject = {
            name: name,
            description: description,
            location: location
        }
    
    
        try {
            await itemSchema.validate(dataObject);
          } catch (err) {
             alert(err.errors)
            }
        setShowRodal(false)
      }

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
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
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
            <div className="form-container">
                <form onSubmit={handleSubmit} >
                    <h3>Create an event</h3>
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
                        <input class="file-input" type="file" onChange={(e) => handleFileUpload(e)} />
                    </div>
                    <div className="type-select">
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

                    <button type="submit" onClick={() => validateForm()}>Create item</button>
                </form>
            </div>
        </>
    )
}

export default NewItem