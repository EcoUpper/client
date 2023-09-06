import { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { useNavigate } from "react-router-dom"

export default function PostCard(props) {

    const navigate = useNavigate()
    const {user} = useContext(AuthContext)

    const [likes, setLikes] = useState(props.data?.likes)

    function makeLike () {
        const likeApi = process.env.REACT_APP_SERVER_URL + "/db/posts/" + props.data._id
    
        const body = {
            content: props.data.content,
            image_url: props.data.image_url,
            created_by: props.data.created_by,
            userId : user?._id
        }
    
        fetch(likeApi, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
        .then((res) => {
            return res.json()
        })
        .then((result)=>{
            console.log("ERRRRRRRRRRRIK", result.likes.slice(-1));
            
            setLikes(likes => [...likes, result.likes.slice(-1)])
            console.log("LIKES",  likes);
            navigate("/posts")
        })
        .catch((err) => {
            console.log(err)
        })
    }

    return (
        <div className="post-card" key={props.key}>
            {props.data.image_url ?
            <img src={props.data.image_url} alt="" /> : null}
            <p>{props.data.content}</p>
            <p>{props.data.created_by.username}</p>
            <p>{props.date} at {props.time}</p>
            <p>{likes?.length} {likes?.find(like => (like._id == user?._id))? "❤️" : <button onClick={makeLike}>❤️</button>}</p>
        </div>
    )
}