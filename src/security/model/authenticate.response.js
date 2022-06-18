export default class AuthenticateResponse {
  constructor(id, firstName, lastName, username, token) {
    this.id = id;
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.token = token;
  }
}
