class AuthO {
  static loggedIn() {

    return !!localStorage.getItem("token")
  }
}

export default AuthO
