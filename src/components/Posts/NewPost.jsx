import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

function NewItem() {

    const { user } = useContext(AuthContext)
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")

    const navigate = useNavigate()
    const apiUrl = "http://localhost:5005/db/posts/create/new"

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
                        <input
                            type="text"
                            name="image"
                            onChange={(e) => setImage(e.target.value)}
                            value={image}
                        />
                    </div>
                    <button type="submit">Post</button>
                </form>
            </div>
        </>
    )
}

export default NewItem