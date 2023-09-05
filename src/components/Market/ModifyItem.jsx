import "./ModifyItem.css"
import { useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import uploadImage from "../../services/file-upload.service"

function ModifyItem (props) {

    const {fetchItemInfo} = props
    const {item} = props
    const { itemId } = useParams();

    const { user } = useContext(AuthContext)
    const [name, setName] = useState(item.name)
    const [description, setDescription] = useState(item.description)
    const [image, setImage] = useState(item.image_url)
    const [type, setType] = useState(item.type)
    const [expirationDate, setExpirationDate] = useState(item.expiration_date)
    const [status, setStatus] = useState(item.status)
    const [location, setLocation] = useState(item.location)

    const navigate = useNavigate()
    

    function handleFileUpload (e) {
        const formData = new FormData()
        formData.append("image_url", e.target.files[0])
    
        uploadImage(formData)
        .then((res)=>{
          setImage(res.image_url)
        })
        .catch(err => console.log(err))
      }

    function handleSubmit(e) {
        e.preventDefault()

        const modifyItemUrl = process.env.REACT_APP_SERVER_URL + "/db/items/" + itemId

        const body = {
            name,
            description,
            image_url: image,
            type,
            expiration_date: expirationDate,
            status,
            owner: user,
            location
        }

        fetch(modifyItemUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
            .then((res) => res.json())

            .then((updatedItem) => {
                console.log(updatedItem)

                fetchItemInfo()
                navigate(`/market/${itemId}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="modifyForm">
                <form className="formContainer" onSubmit={handleSubmit} >
                    <div className="innerForm">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>
                    <div className="innerForm">
                        <label>Description</label>
                        <textarea
                            type="text"
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>
                    <div className="innerForm">
                        <label>Image</label>
                        <input className="imgInput" type="file" onChange={(e) => handleFileUpload (e)} />
                    </div>
                    <div className="innerForm">
                    <label>Type</label>
                        <select name="type" onChange={(e) => setType(e.target.value)} value={type}>
                            <option value="other">Other</option>
                            <option value="food">Food</option>
                            <option value="clothing">Clothing</option>
                        </select>
                    </div>
                    {type === "food" && 
                    <div className="innerForm">
                        <label>Expiration Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={(e) => setExpirationDate(e.target.value)}
                            value={expirationDate}
                        />
                    </div>
                    }
                    <div className="innerForm">
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </div>
                    <div className="innerForm">
                        <label>Status</label>
                        <select name="status" onChange={(e) => setStatus(e.target.value)} value={status}>
                            <option value="available">Available</option>
                            <option value="reserved">Reserved</option>
                            <option value="gifted">Gifted</option>
                        </select>
                    </div>
                    <button type="submit">Modify item</button>
                </form>
            </div>
        </>
    )
}

export default ModifyItem