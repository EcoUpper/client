import { useContext, useState, useRef, useEffect } from "react"
import { AuthContext } from "../../context/auth.context"
import { Link } from "react-router-dom"
import "./Posts.css"

export default function PostCard(props) {

    const { user } = useContext(AuthContext)

    const [likes, setLikes] = useState(props.likes)
    const [userHasLiked, setUserHasLiked] = useState(
        props.likes?.some((like) => like._id === user?._id)
    );

    function makeLike() {
        const likeApi = process.env.REACT_APP_SERVER_URL + "/db/posts/" + props.data._id

        const body = {
            content: props.data.content,
            image_url: props.data.image_url,
            created_by: props.data.created_by,
            userId: user?._id
        }

        fetch(likeApi, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then((res) => {
                return res.json()
            })
            .then((result) => {
                setUserHasLiked(true);
                setLikes(likes => [...likes, ...result.likes.slice(-1)])

            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        setLikes(props.likes)
        setUserHasLiked(props.likes?.some((like) => like._id === user?._id));
    }, [props])

    return (
        <div className="postsContainerCard" key={props.key}>
            <div className="postInfoDetails">
                <Link  to={`/profile/${props.data.created_by?._id}`} target="_blank"><p>@{props.data.created_by?.username}</p></Link>
                <p className="postDate">{props.date} at {props.time}</p>
                <p>  {likes?.length}{" "}
                    {userHasLiked ? (
                        "❤️"
                    ) : (
                        <button onClick={makeLike}>❤️</button>
                    )}
                </p>
            </div>
            <div className="postContent">
                {props.data.image_url ?
                    <img src={props.data.image_url} alt="" /> : null}
                <p>{props.data.content}</p>
            </div>

        </div>
    )
}