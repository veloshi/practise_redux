import { useSelector,useDispatch } from "react-redux";
import { fetchPosts, getPostError, selectAllPosts,getPostStatus } from "./PostsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useEffect } from "react";

const PostsList = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);
    const postsStatus = useSelector(getPostStatus);
    const error = useSelector(getPostError);
    // console.log(posts);
    useEffect(()=>
    {
        if (postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    },[postsStatus,dispatch]);
    let content;
    // useEffect(() => {
    //     dispatch(fetchPosts());
    // }, [dispatch])

    if(postsStatus === 'loading'){
        content = <p>Loading . . .</p>;
    }
    else if(postsStatus === 'succeeded'){
     const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));
     console.log(orderedPosts);
    content = posts.map((post,index) => (<PostsExcerpt key = {index} posts = {post}/>
    
    ))
    // console.log(posts);
    }
    else if (postsStatus === 'failed' ){
        content = <p>{error?.message}</p>
    
    }
    
  
    return (
        <div>
            <h2>Posts</h2>
            {content}
        </div>
    )
}
export default PostsList