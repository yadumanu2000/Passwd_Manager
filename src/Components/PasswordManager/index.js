import {Component} from 'react'
import {v4} from 'uuid'
import PasswordItem from '../PasswordItem/index'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class PasswordManager extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwordsList: [],
    showPassword: false,
    searchInput: '',
  }

  onWebsiteUpdate = event => {
    this.setState({website: event.target.value})
  }

  onUsernameUpdate = event => {
    this.setState({username: event.target.value})
  }

  onPasswordUpdate = event => {
    this.setState({password: event.target.value})
  }

  onSearchInputUpdate = event => {
    this.setState({searchInput: event.target.value})
  }

  onShowPasswords = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onAddPassword = event => {
    event.preventDefault()
    const {website, username, password} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const newPassword = {
      id: v4(),
      website,
      username,
      password,
      initialBackgroundColorClassName,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  deletePassword = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachList => eachList.id !== id,
      ),
    }))
  }

  render() {
    const {
      website,
      username,
      password,
      passwordsList,
      showPassword,
      searchInput,
    } = this.state

    const filteredPasswordList = passwordsList.filter(eachList =>
      eachList.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const lengthOfTheList = filteredPasswordList.length

    let passwordsContainer
    if (lengthOfTheList === 0) {
      passwordsContainer = (
        <div className="no-passwords-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
            alt="no passwords"
            className="no-passwords-img"
          />
          <p className="no-passwords-para">No Passwords</p>
        </div>
      )
    } else {
      passwordsContainer = (
        <ul className="passwords-list-container">
          {filteredPasswordList.map(eachPasswordList => (
            <PasswordItem
              passwordDetails={eachPasswordList}
              key={eachPasswordList.id}
              showPassword={showPassword}
              deletePassword={this.deletePassword}
            />
          ))}
        </ul>
      )
    }

    return (
      <div className="app-container">
        <div className="app-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="password-manager-container">
          <div className="user-input-container">
            <div className="user-input-section">
              <h3 className="user-input-section-heading">Add New Password</h3>
              <form className="form-container" onSubmit={this.onAddPassword}>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-container-logo"
                  />
                  <input
                    type="text"
                    className="user-input"
                    placeholder="Enter Website"
                    value={website}
                    onChange={this.onWebsiteUpdate}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-container-logo"
                  />
                  <input
                    type="text"
                    className="user-input"
                    placeholder="Enter Username"
                    value={username}
                    onChange={this.onUsernameUpdate}
                  />
                </div>
                <div className="input-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-container-logo"
                  />
                  <input
                    type="password"
                    className="user-input"
                    placeholder="Enter Password"
                    value={password}
                    onChange={this.onPasswordUpdate}
                  />
                </div>
                <div className="button-container">
                  <button className="add-button" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="user-input-logo-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
                alt="password manager"
                className="password-manager-logo"
              />
            </div>
          </div>
          {/* password storing section */}

          <div className="passwords-container">
            <div className="heading-and-search-section">
              <h1 className="passwords-heading">
                Your Passwords
                <p className="passwords-count">{lengthOfTheList}</p>
              </h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="input-container-logo"
                />
                <input
                  type="search"
                  className="user-search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onSearchInputUpdate}
                />
              </div>
            </div>
            <div className="show-password-input-container">
              <input
                type="checkbox"
                className="checkbox-input"
                id="showPasswordCheckbox"
                onChange={this.onShowPasswords}
              />
              <label className="checkbox-label" htmlFor="showPasswordCheckbox">
                Show Passwords
              </label>
            </div>

            {passwordsContainer}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
