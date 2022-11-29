import './index.css'
import Loader from 'react-loader-spinner'

const apiConstants = {
  initial: 'INITIAL',
  loading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const Profile = props => {
  const {profileData, profileDataStatus, triggerRetry} = props
  const {profileImageUrl, name, shortBio} = profileData

  const reFetchProfileUrl = () => {
    triggerRetry()
  }

  const renderSuccessView = () => (
    <div className="profileCard">
      <div className="profileWrapper">
        <img src={profileImageUrl} className="profileImage" alt="profile" />
        <h1 className="profileName">{name}</h1>
        <p className="bio">{shortBio}</p>
      </div>
    </div>
  )

  const renderFailureView = () => (
    <div className="profileCardFailure">
      <button type="button" className="retryBtn" onClick={reFetchProfileUrl}>
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="profileCard">
      <div className="profileWrapperLoading">
        <div className="products-details-loader-container">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </div>
  )

  switch (profileDataStatus) {
    case apiConstants.success:
      return renderSuccessView()
    case apiConstants.failure:
      return renderFailureView()
    case apiConstants.loading:
      return renderLoadingView()
    default:
      return null
  }
}

export default Profile
