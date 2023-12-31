import { useState, useEffect, useContext } from "react"
import PostCard from "../../components/Posts/PostCard"
import NewPost from "../../components/Posts/NewPost"
import { AuthContext } from "../../context/auth.context"

function PostsPage() {

    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [newPost, setNewPost] = useState(false)
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/posts"


    function scrollToTop() {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }

      
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
    }, [newPost])

    if (!posts) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className="postPage">
                <h1>What's in your mind?</h1>
                <h4 className="subheading">Share your thoughts and join this dynamic conversation where your voice matters.</h4>
                {user ? <NewPost fetchPosts={fetchPosts} newPost={newPost} setNewPost={setNewPost} /> : null}

                <div className="postsInnerContainer">
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
            </div>
            <div>
                <button className="back-top-btn" onClick={scrollToTop}>Back to top</button>
            </div>
        </>
    )
}

export default PostsPage