import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import uploadImage from "../../services/file-upload.service"

function NewItem(props) {

    const {fetchPosts} = props

    const { user } = useContext(AuthContext)
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/posts/create/new"
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


    function handleSubmit(e) {
        e.preventDefault()

        const body = {
            content: content,
            image_url: image,
            created_by: user,
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
                setContent("")
                setImage("")
                
                fetchPosts()
                navigate("/posts")
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
                        <label>Post</label>
                        <textarea
                            type="text"
                            name="content"
                            placeholder="Share your thoughts!"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                        />
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="file" onChange={(e) => handleFileUpload (e)} />
                    </div>
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    )
}

export default NewItem