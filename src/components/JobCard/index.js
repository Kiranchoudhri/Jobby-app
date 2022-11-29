import './index.css'
import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {RiHandbagFill} from 'react-icons/ri'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    title,
    jobDescription,
    rating,
    employmentType,
    location,
    packagePerAnnum,
    id,
  } = jobDetails
  console.log(id)

  return (
    <Link to={`/jobs/${id}`} className="linkContainer">
      <li className="jobCard">
        <div className="companySection">
          <img
            alt="company logo"
            src={companyLogoUrl}
            className="companyLogo"
          />
          <div className="companyRating">
            <h1 className="companyName">{title}</h1>
            <div className="ratingContainer">
              <AiFillStar className="ratingLogo" />
              <p className="ratingNumber">{rating}</p>
            </div>
          </div>
        </div>
        <div className="packageWrapper">
          <div className="locationWrapper">
            <div className="locationContainer">
              <IoLocationSharp className="locationIcon" />
              <p className="location">{location}</p>
            </div>
            <div className="employmentContainer">
              <RiHandbagFill className="internIcon" />
              <p className="employmentType">{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="descriptionContainer">
          <h1 className="descriptionTitle">Description</h1>
          <p className="description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
