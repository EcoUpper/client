import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import uploadImage from "../../services/file-upload.service"

function NewEvent (props) {
    
    const {fetchEvents} = props

    const {user} = useContext(AuthContext)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const [date, setDate] = useState("") // including time
    const [time, setTime] = useState("")
    const [location, setLocation] = useState("")
    
    const dateTime = new Date(date + 'T' + time);

    const navigate = useNavigate()
    const apiUrl = "http://localhost:5005/db/events/create/new"

    const handleFileUpload  = (e) => {
        const formData = new FormData()
        formData.append("image_url", e.target.files[0])
    
        uploadImage(formData)
        .then((res)=>{
          console.log("upload res", res);
          setImage(res.image_url)
        })
        .catch(err => console.log(err))
    
      }

    function handleSubmit (e) {
        e.preventDefault()

        const body = {
            title: title,
            content: content,
            created_by: user._id,
            image_url: image,
            date: dateTime,
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
        .then((data) => {
            console.log(data)
            setTitle("")
            setContent("")
            setImage("")
            setDate("")
            setTime("")
            setLocation("")

            fetchEvents()
            navigate("/events")
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
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea
                            type="text"
                            name="content"
                            placeholder="Tell us about your event!"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="file" onChange={(e) => handleFileUpload (e)} />

                    </div>
                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />
                    </div>
                    <div>
                        <label>Starting time</label>
                        <input
                            type="time"
                            name="time"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                        />
                    </div>
                    <div>
                        <label>Location</label>
                        <input
                            type="text"
                            name="location"
                            onChange={(e) => setLocation(e.target.value)}
                            value={location}
                        />
                    </div>
                    <button type="submit">Create</button>
                </form>
        </div>
       </> 
    )
}

export default NewEvent