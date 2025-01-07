import Cookies from 'js-cookie'

export class Local {
  static setAccessToken(token: string) {
    Cookies.set(Keys.ACCESS_TOKEN, token)
  }

  static getAccessToken(): string | undefined {
    return Cookies.get(Keys.ACCESS_TOKEN)
  }
}

enum Keys {
  ACCESS_TOKEN = 'ACCESS_TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
}
