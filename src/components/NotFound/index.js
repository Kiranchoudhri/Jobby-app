import './index.css'
import Header from '../Header'

const NotFound = () => (
  <div className="notFound">
    <Header />
    <div className="notFoundContent">
      <img
        className="notFoundImage"
        alt="not found"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      />
      <h1 className="failureViewHeading">Page Not Found</h1>
      <p className="notFoundMsg">
        we're sorry, the page you requested could not be found"
      </p>
    </div>
  </div>
)

export default NotFound
