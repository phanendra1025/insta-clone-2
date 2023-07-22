import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'
import PostItem from '../PostItem'

const postsAPIStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProcess: 'IN_PROCESS',
}

class Posts extends Component {
  state = {
    postsData: [],
    postsAPIStatus: postsAPIStatusConstants.initial,
  }

  componentDidMount() {
    this.getThePostsData()
  }

  getThePostsData = async () => {
    this.setState({postsAPIStatus: postsAPIStatusConstants.inProcess})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(
      'https://apis.ccbp.in/insta-share/posts',
      options,
    )
    const data = await response.json()
    if (response.ok === true) {
      const {posts} = data
      const updatedPosts = posts.map(eachPosts => ({
        comments: eachPosts.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),
        createdAt: eachPosts.created_at,
        likesCount: eachPosts.likes_count,
        postDetails: {
          caption: eachPosts.post_details.caption,
          imageUrl: eachPosts.post_details.image_url,
        },
        postId: eachPosts.post_id,
        profilePic: eachPosts.profile_pic,
        userId: eachPosts.user_id,
        username: eachPosts.user_name,
      }))
      this.setState({
        postsData: updatedPosts,
        postsAPIStatus: postsAPIStatusConstants.success,
      })
    } else {
      this.setState({postsAPIStatus: postsAPIStatusConstants.failure})
    }
  }

  updateTheLikesOfPost = async (postId, likeStatus) => {
    console.log('method called')
    const {postsData} = this.state
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const jwtToken = Cookies.get('jwt_token')
    const postLikeStatus = {
      like_status: likeStatus,
    }
    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(postLikeStatus),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data.message)
    let updatedPostsData = postsData
    updatedPostsData = updatedPostsData.map(eachObject => {
      if (eachObject.postId === postId && likeStatus) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount + 1,
        }
      }
      if (eachObject.postId === postId && !likeStatus) {
        return {
          ...eachObject,
          message: data.message,
          likesCount: eachObject.likesCount - 1,
        }
      }

      return eachObject
    })
    this.setState({postData: updatedPostsData})
  }

  renderThePostsLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  renderThePostSuccessView = () => {
    const {postsData} = this.state
    return (
      <ul className="posts-list">
        {postsData.map(eachPost => (
          <PostItem
            postItemDetails={eachPost}
            updateTheLikesOfPost={this.updateTheLikesOfPost}
            key={eachPost.postId}
          />
        ))}
      </ul>
    )
  }

  renderThePostFailureView = () => (
    <div className="error-container">
      <img
        src="https://res.cloudinary.com/dytmw4swo/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1690027088/Insta%20Clone/alert-triangle_vszykg.jpg?_s=public-apps"
        alt="failure view"
        className="error-image"
      />
      <h1 className="error-text">Something went wrong. Please try again</h1>
      <button
        type="button"
        onClick={this.getThePostsData}
        className="retry-button"
      >
        Try again
      </button>
    </div>
  )

  renderTheAllPostViews = () => {
    const {postsAPIStatus} = this.state
    switch (postsAPIStatus) {
      case postsAPIStatusConstants.success:
        return this.renderThePostSuccessView()
      case postsAPIStatusConstants.failure:
        return this.renderThePostFailureView()
      case postsAPIStatusConstants.inProcess:
        return this.renderThePostsLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="posts-container">{this.renderTheAllPostViews()}</div>
  }
}

export default Posts
