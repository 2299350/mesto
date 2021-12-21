class UserInfo {
  constructor({ userName, userInfo }) {
    this.userName = document.querySelector(userName);
    this.userInfo = document.querySelector(userInfo);
  }

  // Public methods
  getUserInfo() {
    return {
      userName: this.userName.textContent,
      userInfo: this.userInfo.textContent,
    };
  }

  setUserInfo(userName, userInfo) {
    this.userName.textContent = userName;
    this.userInfo.textContent = userInfo;
  }
}

export default UserInfo;
