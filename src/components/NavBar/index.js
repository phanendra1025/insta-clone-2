import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'
import MenuItem from '../MobileMenuItem'

const MenuItemDetailsList = [
  {
    menuId: 'HOME',
    displayText: 'Home',
  },
  {
    menuId: 'SEARCH',
    displayText: 'Search',
  },
  {
    menuId: 'PROFILE',
    displayText: 'Profile',
  },
]

class NavBar extends Component {
  state = {
    activeMenuButtonId: MenuItemDetailsList[0].menuId,
    isMenuVisible: false,
  }

  showTheMenu = () => {
    this.setState({isMenuVisible: true})
  }

  closeTheMenu = () => {
    this.setState({isMenuVisible: false})
  }

  onChangeTheMenuItem = id => {
    this.setState({activeMenuButtonId: id})
  }

  logout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {activeMenuButtonId, isMenuVisible} = this.state
    const menuClass = isMenuVisible
      ? 'mobile-menu-details-list'
      : 'mobile-menu-details-list-off'
    const desktopMenuList = MenuItemDetailsList.filter(
      eachItem => eachItem.menuId !== 'SEARCH',
    )
    return (
      <nav className="nav-bar-container">
        <div className="nav-bar-content-container">
          <div className="nav-bar-logo-container">
            <img
              src="https://res.cloudinary.com/dytmw4swo/image/upload/c_pad,b_auto:predominant,fl_preserve_transparency/v1689749750/Insta%20Clone/Group_t5f0gl.jpg?_s=public-apps"
              alt="website logo"
              className="navbar-website-logo"
            />
            <h1 className="navbar-app-name">Insta Share</h1>
          </div>
          <div className="nav-items-container">
            <div className="search-bar-container">
              <input
                type="search"
                className="search-bar"
                placeholder="Search Caption"
              />
              <div className="search-icon-container">
                <FaSearch size={10} color="#989898" />
              </div>
            </div>
            <ul className="nav-items-list">
              {desktopMenuList.map(eachItem => (
                <MenuItem
                  menuDetails={eachItem}
                  key={eachItem.menuId}
                  isActive={eachItem.menuId === activeMenuButtonId}
                  onChangeTheMenuItem={this.onChangeTheMenuItem}
                />
              ))}
              <li>
                <button
                  type="button"
                  onClick={this.logout}
                  className="logout-button"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
          <div className="menu-icon-container">
            <button
              type="button"
              onClick={this.showTheMenu}
              className="hamburger-menu-button"
            >
              <GiHamburgerMenu color="#262626" size="24px" />
            </button>
          </div>
        </div>
        <ul className={menuClass}>
          {MenuItemDetailsList.map(eachItem => (
            <MenuItem
              menuDetails={eachItem}
              key={eachItem.menuId}
              isActive={eachItem.menuId === activeMenuButtonId}
              onChangeTheMenuItem={this.onChangeTheMenuItem}
            />
          ))}
          <li>
            <button
              type="button"
              onClick={this.logout}
              className="mobile-logout-button"
            >
              Logout
            </button>
          </li>
          <li>
            <button
              className="close-button"
              type="button"
              onClick={this.closeTheMenu}
            >
              <AiFillCloseCircle color="#262626" size="24px" />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(NavBar)
