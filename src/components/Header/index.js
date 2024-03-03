import './index.css'
import Cookie from 'js-cookie'
import {withRouter} from 'react-router-dom'

const Header = props => {
  const onLogout = () => {
    Cookie.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="header-container">
      <img
        className="logo"
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
        alt="website logo"
      />
      <button type="button" className="logout-btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  )
}

export default withRouter(Header)
