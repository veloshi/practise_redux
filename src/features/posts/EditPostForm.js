import React from 'react';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { selectPostById ,updatePost } from './PostsSlice';
import { useParams,useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../users/usersSlice';

const EditPostForm = () => {
    const {postId} = useParams()
    const navigate = useNavigate()

    const post = useSelector((state)=>selectPostById(state,Number(postId)))
    const users = useSelector(selectAllUsers)


    const [title,setTitle]= useState(post?.title)
    const [body,setContent] = useState(post?.body)
    const [userId,setUserId] = useState(post?.userId)
    const [requestStatus,setRequestStatus] = useState('idle');

    const dispatch = useDispatch();
    if (!post)
    {
        return(
            <>
            <section>
                <h2>
                    Post Not Found!
                </h2>
            </section>
            </>
        )
    }
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(Number(e.target.value))
    const canSave = [title,body,userId].every(Boolean) && requestStatus === 'idle';
    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setRequestStatus('pending')
                dispatch(updatePost({id:post.id,title,body:body,userId,reactions:post.reactions})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            }
            catch(err){
                console.log("Failed to save the post");
            }
            finally{
                setRequestStatus('idle');
            }
        }
    }
    const usersOptions = users.map(user =>(
        <option key = {user.id}
        value = {user.id}>
            {user.name}
        </option>
    )) 

//to enable and disable the can save button
    // const canSave = Boolean(title) && Boolean(body) && Boolean(userId)
    
    return (
        <section>
            <h2>Edit Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" defaultValue={userId} onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={body}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
  }//defaultValue is used becoz it already has an author hence default Value

export default EditPostForm