import { useState, useEffect } from "react"
import PostCard from "../../components/Posts/PostCard"
import NewPost from "../../components/Posts/NewPost"

function PostsPage() {

    const [posts, setPosts] = useState([])
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/posts"


    function fetchPosts() {
        fetch(apiUrl)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const datedPosts = data.map((post) => ({
                ...post,
                createdAt: new Date(post.createdAt)
            }));

            const sortedPosts = datedPosts.sort((a, b) => {
                if (a.createdAt < b.createdAt) {
                    return 1;
                } else if (a.createdAt > b.createdAt) {
                    return -1;
                } else {
                    return 0;
                }                    
            });
            setPosts(sortedPosts);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    if (!posts) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div>
                <NewPost fetchPosts={fetchPosts} />
                {posts.map((post) => {
                    const dateAndTime = post.createdAt
                    const dateTime = new Date(dateAndTime)

                    const date = dateTime.toLocaleDateString()
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    return (
                        <PostCard data={post} date={date} time={time} />
                    )
                })}
            </div>
        </>
    )
}

export default PostsPage