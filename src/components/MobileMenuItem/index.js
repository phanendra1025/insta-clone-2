import './index.css'

const MenuItem = props => {
  const {menuDetails, isActive, onChangeTheMenuItem} = props
  const {menuId, displayText} = menuDetails
  const menuItemClass = isActive ? 'active-menu-text' : 'menu-text'
  const changeTheId = () => {
    onChangeTheMenuItem(menuId)
  }
  return (
    <li className="mobile-menu-item">
      <button type="button" onClick={changeTheId} className="menu-item-button">
        <p className={menuItemClass}>{displayText}</p>
      </button>
    </li>
  )
}

export default MenuItem
