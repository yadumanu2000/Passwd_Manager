import './index.css'

const PasswordItem = props => {
  const {passwordDetails, showPassword, deletePassword} = props
  const {
    id,
    website,
    username,
    password,
    initialBackgroundColorClassName,
  } = passwordDetails

  const onDeletePassword = () => {
    deletePassword(id)
  }

  const renderPassword = () => {
    if (showPassword) {
      return <p className="password">{password}</p>
    }
    return (
      <p>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
          alt="stars"
          className="star-img"
        />
      </p>
    )
  }

  return (
    <li className="list-container">
      <div className="profile-logo">
        <p className={initialBackgroundColorClassName}>{website[0]}</p>
      </div>
      <div className="password-details">
        <p className="website-name">{website}</p>
        <p className="username">{username}</p>
        {renderPassword()}
      </div>

      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={onDeletePassword}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-logo"
        />
      </button>
    </li>
  )
}

export default PasswordItem