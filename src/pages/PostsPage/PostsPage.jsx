import { useState, useEffect, useContext } from "react"
import PostCard from "../../components/Posts/PostCard"
import NewPost from "../../components/Posts/NewPost"
import { AuthContext } from "../../context/auth.context"

function PostsPage() {

    const {user} = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState(false)
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/posts"

    console.log("NEWWWWWWW POOOOOOOST", newPost);


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
            console.log("NEW FETCH");
        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchPosts()
    }, [newPost])

    if (!posts) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div>
                {user? <NewPost fetchPosts={fetchPosts} newPost={newPost} setNewPost={setNewPost}/> : null}
                
                {posts.map((post) => {
                    const dateAndTime = post.createdAt
                    const dateTime = new Date(dateAndTime)

                    const date = dateTime.toLocaleDateString()
                    const time = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    return (
                        <PostCard data={post} date={date} time={time} likes={post.likes}/>
                    )
                })}
            </div>
        </>
    )
}

export default PostsPage