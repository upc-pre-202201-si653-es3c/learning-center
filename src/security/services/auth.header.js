// auth.header.js
// Helper function for generating Authorization header is available

const USER_KEY = 'user';

export default function authHeader() {
  let user = JSON.parse(localStorage.getItem(USER_KEY));

  if (user && user.token) {
    return { 'Authorization': `Bearer ${user.token}`};
  } else {
    return {};
  }

}
