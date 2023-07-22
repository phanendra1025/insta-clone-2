import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import './index.css'

const PostItem = props => {
  const {postItemDetails, updateTheLikesOfPost} = props
  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    profilePic,
    username,
    postId,
    message,
  } = postItemDetails
  console.log(message)
  const {caption, imageUrl} = postDetails
  const likeThePost = () => {
    updateTheLikesOfPost(postId, true)
  }
  const isLiked = message === 'Post has been liked'

  return (
    <li className="post-item">
      <div className="post-item-container">
        <div className="user-name-and-profile-container">
          <div className="post-profile-image-container">
            <img
              src={profilePic}
              className="post-profile-pic"
              alt="post author profile"
            />
          </div>
          <p className="post-user-name">{username}</p>
        </div>
        <img className="post-image" src={imageUrl} alt="post" />
        <div className="post-reactions-buttons-container">
          <button
            type="button"
            onClick={likeThePost}
            className="reactions-button"
          >
            {isLiked ? (
              <FcLike size="24px" />
            ) : (
              <BsHeart size="24px" color="#475569" />
            )}
          </button>
          <button type="button" className="reactions-button">
            <FaRegComment size="24px" color="#475569" />
          </button>
          <button type="button" className="reactions-button">
            <BiShareAlt size="24px" color="#475569" />
          </button>
        </div>
        <p className="post-likes-count">{likesCount} likes</p>
        <p className="post-caption">{caption}</p>
        <div className="post-comments-container">
          {comments.map(eachComment => {
            const {comment, userName, userId} = eachComment
            return (
              <div className="post-comment" key={userId}>
                <p className="comment-user-name">{userName}</p>
                <p className="post-comment">{comment}</p>
              </div>
            )
          })}
        </div>
        <p className="post-created-at">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostItem
