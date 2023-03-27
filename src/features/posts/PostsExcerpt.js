import React from 'react';
import PostsAuthor from "./PostsAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './PostsSlice';

let PostsExcerpt = ({postId}) => {
  console.log(postId);
  const post = useSelector(state=>selectPostById(state,postId))
  console.log(post);
  return (<article key = {post.id}>
    <h3>{post.title}</h3>
    <p className="excerpt">{post.body}</p>
    <p className="postCredit">
        <Link to= {`post/${post.id}`}>View Post</Link>
        <PostsAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />

</p>
    <ReactionButtons posts={post} /> 
</article>
  )
}

PostsExcerpt = React.memo(PostsExcerpt)
export default PostsExcerpt
