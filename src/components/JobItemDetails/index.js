import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {IoLocationSharp} from 'react-icons/io5'
import {RiHandbagFill} from 'react-icons/ri'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobItemDetailsList: {},
    similarJobs: [],
    skillsList: [],
    companyLife: {},
    apiStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiConstants.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log('jobDetails', response)
      const convertedData = eachData => ({
        companyLogoUrl: eachData.company_logo_url,
        companyWebsiteUrl: eachData.company_website_url,
        employmentType: eachData.employment_type,
        id: eachData.id,
        jobDescription: eachData.job_description,
        lifeAtCompany: {
          description: eachData.life_at_company.description,
          imageUrl: eachData.life_at_company.image_url,
        },
        location: eachData.location,
        packagePerAnnum: eachData.package_per_annum,
        rating: eachData.rating,
        skills: eachData.skills.map(eachSkill => ({
          imageUrl: eachSkill.image_url,
          name: eachSkill.name,
        })),
        title: eachData.title,
      })
      const updatedData = convertedData(data.job_details)
      const {skills, lifeAtCompany} = updatedData

      const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobItemDetailsList: updatedData,
        similarJobs: updatedSimilarJobs,
        skillsList: skills,
        companyLife: lifeAtCompany,
        apiStatus: apiConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      jobItemDetailsList,
      similarJobs,
      skillsList,
      companyLife,
    } = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      id,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobItemDetailsList
    const {description, imageUrl} = companyLife

    console.log('similar', similarJobs)

    return (
      <div className="jobItemDetailContainer">
        <Header />
        <div className="jobItemDetailsWrapper">
          <div className="jobItemDetailsContents">
            <div className="companySection">
              <img
                alt="job details company logo"
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
              <div className="headingAndLink">
                <h1 className="ItemDescriptionTitle">Description</h1>
                <a
                  href={companyWebsiteUrl}
                  className="websiteLink"
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="linkText">Visit</p>
                  <FiExternalLink className="linkIcon" />
                </a>
              </div>

              <p className="itemDescription">{jobDescription}</p>
            </div>
            <div className="skillsContainer">
              <h1 className="skillsTitle">Skills</h1>
              <ul className="skillsList">
                {skillsList.map(eachSkill => (
                  <li className="skillWrapper" key={eachSkill.name}>
                    <img
                      src={eachSkill.imageUrl}
                      alt={eachSkill.name}
                      className="skillsIcon"
                    />
                    <p className="skillName">{eachSkill.name}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="companyLifeSection">
              <h1 className="companyLifeHeading">Life at Company</h1>
              <div className="descAndImageContainer">
                <p className="companyLifeDesc">{description}</p>
                <img
                  src={imageUrl}
                  className="companyLifeImage"
                  alt="life at company"
                />
              </div>
            </div>
          </div>
          <div className="similarJobsSection">
            <h1 className="similarJobsHeading">Similar Jobs</h1>
            <ul className="similarJobsList">
              {similarJobs.map(eachProduct => (
                <SimilarJobs
                  key={eachProduct.id}
                  productDetails={eachProduct}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="jobItemDetailContainer">
      <Header />
      <div className="jobDetailsFailureWrapper">
        <div className="jobsFailureContainer">
          <img
            className="failureImage"
            alt="failure view"
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          />
          <h1 className="failureHeading">Oops! Something Went Wrong</h1>
          <p className="failureInfo">
            We cannot seem to find the page you are looking for
          </p>
          <button
            className="retryBtn"
            type="button"
            onClick={this.getJobItemDetails}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  )

  renderLoadingView = () => (
    <div className="jobItemDetailContainer">
      <Header />
      <div className="jobDetailsLoaderContainer">
        <div className="products-details-loader-container">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      case apiConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default JobItemDetails
