export class UserInfo {
  constructor({selectorUsername, selectorInfo, selectorAvatar}) {
    this._username = document.querySelector(selectorUsername);
    this._info = document.querySelector(selectorInfo);
    this._avatar = document.querySelector(selectorAvatar);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      info: this._info.textContent,
    }
  }

  getUserAvatar() {
    return {
      avatar: this._avatar.src
    }
  }

  setUserInfo({username, info}) {
    this._username.textContent = username;
    this._info.textContent = info;
  }

  setUserAvatar(data) {
    this._avatar.src = data.avatar;
  }
}
