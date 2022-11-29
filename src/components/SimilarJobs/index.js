import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {RiHandbagFill} from 'react-icons/ri'
import {FiExternalLink} from 'react-icons/fi'

const SimilarJobs = props => {
  const {productDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    title,
    rating,
  } = productDetails
  return (
    <li className="similarJobsCard">
      <div className="companySection">
        <img
          alt="similar job company logo"
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
      <div className="similarDescriptionContainer">
        <h1 className="similarDescription">Description</h1>
        <p className="description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobs
