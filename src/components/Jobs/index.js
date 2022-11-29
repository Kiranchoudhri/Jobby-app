import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import {AiOutlineSearch} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'
import FilterCard from '../FilterCard'
import PackageFilter from '../PackageFilter'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
    isChecked: false,
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
    isChecked: false,
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
    isChecked: false,
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
    isChecked: false,
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstants = {
  initial: 'INITIAL',
  loading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    profileData: {},
    employmentFilterList: employmentTypesList,
    salaryRange: '',
    searchInput: '',
    jobsDataStatus: apiConstants.initial,
    profileDataStatus: apiConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
    this.getProfileDetails()
  }

  recordSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  showSearchResults = () => {
    this.getJobsData()
  }

  onChangeEmploymentType = checkedId => {
    this.setState(
      prevState => ({
        employmentFilterList: prevState.employmentFilterList.map(eachItem => {
          if (eachItem.employmentTypeId === checkedId) {
            return {...eachItem, isChecked: !eachItem.isChecked}
          }
          return eachItem
        }),
      }),
      this.getJobsData,
    )
  }

  onChangeSalaryRange = salaryValue => {
    this.setState({salaryRange: salaryValue}, this.getJobsData)
  }

  getProfileDetails = async () => {
    this.setState({profileDataStatus: apiConstants.loading})
    const url = 'https://apis.ccbp.in/profile'
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
      const profileDetails = eachProfile => ({
        profileImageUrl: eachProfile.profile_image_url,
        name: eachProfile.name,
        shortBio: eachProfile.short_bio,
      })
      const updatedProfileDetails = profileDetails(data.profile_details)
      console.log(updatedProfileDetails)
      this.setState({
        profileData: updatedProfileDetails,
        profileDataStatus: apiConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({profileDataStatus: apiConstants.failure})
    }
  }

  getJobsData = async () => {
    console.log('jobsData')
    this.setState({jobsDataStatus: apiConstants.loading})
    const {employmentFilterList, searchInput, salaryRange} = this.state
    console.log('salary', salaryRange)
    const filterQueryList = employmentFilterList.filter(
      eachValue => eachValue.isChecked === true,
    )
    const checkedList = filterQueryList.map(
      eachItem => eachItem.employmentTypeId,
    )
    const employmentTypeQuery = checkedList.join()
    console.log('queryList', employmentTypeQuery)

    console.log('queryPar', checkedList)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeQuery}&minimum_package=${salaryRange}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const {jobs, total} = data
      const updatedData = jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobsList: updatedData,
        jobsDataStatus: apiConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({jobsDataStatus: apiConstants.failure})
    }
  }

  triggerRetry = () => {
    this.getProfileDetails()
  }

  reFetchJobsData = () => {
    this.getJobsData()
  }

  renderSuccessView = () => {
    const {
      jobsList,
      profileData,
      profileDataStatus,
      employmentFilterList,
    } = this.state
    console.log('checkbox', employmentFilterList)
    const isEmpty = jobsList.length === 0
    return (
      <div className="jobsPage">
        <Header />
        <ul className="jobsContent">
          <li className="profileAndFilters">
            <Profile
              profileData={profileData}
              profileDataStatus={profileDataStatus}
              triggerRetry={this.triggerRetry}
            />
            <hr className="lineBreak" />
            <div className="employmentFilterSection">
              <h1 className="employmentTitle">Type of Employment</h1>
              <ul className="employmentTypeList">
                {employmentTypesList.map(eachType => (
                  <FilterCard
                    key={eachType.employmentTypeId}
                    employmentDetails={eachType}
                    onChangeEmploymentType={this.onChangeEmploymentType}
                  />
                ))}
              </ul>
            </div>
            <hr className="lineBreak" />
            <div className="employmentFilterSection">
              <h1 className="employmentTitle">Salary Range</h1>
              <ul className="employmentTypeList">
                {salaryRangesList.map(eachRange => (
                  <PackageFilter
                    key={eachRange.salaryRangeId}
                    packageDetails={eachRange}
                    onChangeSalaryRange={this.onChangeSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </li>
          <li className="searchAndJobsContainer">
            <div className="searchContainer">
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
                onChange={this.recordSearch}
              />
              <button
                type="button"
                className="searchBtn"
                onClick={this.showSearchResults}
                // testid="searchButton"
              >
                <AiOutlineSearch className="searchIcon" />
              </button>
            </div>
            {isEmpty ? (
              <div className="noJobsWrapper">
                <div className="noJobsContainer">
                  <img
                    alt="no jobs"
                    className="noJobsImage"
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png "
                  />
                  <h1 className="noJobsHeading">No Jobs Found</h1>
                  <p>We could not find any jobs. Try other filters</p>
                </div>
              </div>
            ) : (
              <ul className="allJobsContainer">
                {jobsList.map(eachJob => (
                  <JobCard key={eachJob.id} jobDetails={eachJob} />
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    )
  }

  renderFailureView = () => {
    const {jobsList, profileData, profileDataStatus} = this.state

    return (
      <div className="jobsPage">
        <Header />
        <div className="jobsContent">
          <div className="profileAndFilters">
            <Profile
              profileData={profileData}
              profileDataStatus={profileDataStatus}
              triggerRetry={this.triggerRetry}
            />

            <hr className="lineBreak" />
            <div className="employmentFilterSection">
              <h1 className="employmentTitle">Type of Employment</h1>
              <ul className="employmentTypeList">
                {employmentTypesList.map(eachType => (
                  <FilterCard
                    key={eachType.employmentTypeId}
                    employmentDetails={eachType}
                  />
                ))}
              </ul>
            </div>
            <hr className="lineBreak" />
            <div className="employmentFilterSection">
              <h1 className="employmentTitle">Salary Range</h1>
              <ul className="employmentTypeList">
                {salaryRangesList.map(eachRange => (
                  <PackageFilter
                    key={eachRange.salaryRangeId}
                    packageDetails={eachRange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="searchAndJobsContainer">
            <div className="searchContainer">
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
                onChange={this.recordSearch}
              />
              <button
                type="button"
                className="searchBtn"
                onClick={this.showSearchResults}
              >
                <AiOutlineSearch className="searchIcon" />
              </button>
            </div>
            <div className="jobsFailureWrapper">
              <div className="jobsFailureContainer">
                <img
                  className="failureImage"
                  alt="failure view"
                  src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
                />
                <h1 className="failureHeading">Oops! Something Went Wrong</h1>
                <p className="failureInfo">
                  We cannot seem to find the page you are looking for.
                </p>
                <button
                  className="retryBtn"
                  type="button"
                  onClick={this.reFetchJobsData}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderLoadingView = () => {
    const {jobsList, profileData, profileDataStatus} = this.state

    return (
      <div className="jobsPage">
        <Header />
        <div className="jobsContent">
          <div className="profileAndFilters">
            <Profile
              profileData={profileData}
              profileDataStatus={profileDataStatus}
              triggerRetry={this.triggerRetry}
            />
            <hr className="lineBreak" />
            <div className="employmentFilterSection">
              <h1 className="employmentTitle">Type of Employment</h1>
              <ul className="employmentTypeList">
                {employmentTypesList.map(eachType => (
                  <FilterCard
                    key={eachType.employmentTypeId}
                    employmentDetails={eachType}
                  />
                ))}
              </ul>
            </div>
            <hr className="lineBreak" />
            <div className="employmentFilterSection">
              <h1 className="employmentTitle">Salary Range</h1>
              <ul className="employmentTypeList">
                {salaryRangesList.map(eachRange => (
                  <PackageFilter
                    key={eachRange.salaryRangeId}
                    packageDetails={eachRange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="searchAndJobsContainer">
            <div className="searchContainer">
              <input
                type="search"
                placeholder="Search"
                className="searchInput"
                onChange={this.recordSearch}
              />
              <button
                type="button"
                className="searchBtn"
                onClick={this.showSearchResults}
              >
                <AiOutlineSearch className="searchIcon" />
              </button>
            </div>
            <div className="loaderContainer">
              <div
                className="products-details-loader-container"
                // testid="loader"
              >
                <Loader
                  type="ThreeDots"
                  color="#ffffff"
                  height="50"
                  width="50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {jobsDataStatus} = this.state
    switch (jobsDataStatus) {
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

export default Jobs
