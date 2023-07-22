import {Component} from 'react'
import './index.css'
import NavBar from '../NavBar'
import UserStories from '../UserStories'
import Posts from '../Posts'

class HomeRoute extends Component {
  render() {
    return (
      <div className="home-container">
        <NavBar />
        <UserStories />
        <Posts />
      </div>
    )
  }
}

export default HomeRoute
