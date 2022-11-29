import './index.css'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    console.log('login')
    history.replace('/login')
  }
  return (
    <ul className="navHeader">
      <li>
        <Link to="/">
          <img
            className="headerLogo"
            alt=" website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          />
        </Link>
      </li>

      <li>
        <ul className="navTitlesContainer">
          <Link to="/" className="navLink">
            <li className="navTitle">Home</li>
          </Link>
          <Link to="/jobs" className="navLink">
            <li className="navTitle">Jobs</li>
          </Link>
        </ul>
      </li>

      <li>
        <button type="button" className="logoutBtn" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}

export default withRouter(Header)
