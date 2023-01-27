export class UserInfo {
  constructor({profileUserName, profileInfo}) {
    this._username = document.querySelector(profileUserName);
    this._info = document.querySelector(profileInfo);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      info: this._info.textContent
    }
  }

  setUserInfo({info, username}) {
    this._info.textContent = info;
    this._username.textContent = username;
  }
}
