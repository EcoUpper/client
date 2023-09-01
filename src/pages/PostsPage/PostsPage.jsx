import { useState, useEffect } from "react"
import PostCard from "../../components/Posts/PostCard"
import NewPost from "../../components/Posts/NewPost"

function PostsPage() {

    const [posts, setPosts] = useState([])
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/posts"

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setPosts(data)
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    if (!posts) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div>
                <NewPost/>
                {posts.map((post) => {
                    const dateAndTime = post.createdAt
                    const dateTime = new Date(dateAndTime)

                    const date = dateTime.toLocaleDateString()
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    return (
                        <PostCard data={post} date={date} time={time}/>
                    )
                })}
            </div>
        </>
    )
}

export default PostsPage