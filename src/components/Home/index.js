import './index.css'

import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'

const Home = props => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="homeContainer">
      <div className="homeWrapper">
        <Header />
        <div className="homeContent">
          <h1 className="homeHeading">Find The Job That Fits Your Life</h1>
          <p className="homeDesc">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs" className="jobsButtonLink">
            <button type="button" className="findJobsBtn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
