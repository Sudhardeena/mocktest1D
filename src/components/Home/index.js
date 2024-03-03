import './index.css'

import Header from '../Header'

const Home = () => (
  <div className="home-page">
    <Header />
    <div className="content">
      <h1>Your Flexibility, Our Excellence</h1>
      <img
        className="card-img"
        src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
        alt="digital card"
      />
    </div>
  </div>
)

export default Home
