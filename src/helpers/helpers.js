const checkAuth = () => fetch(`/users/auth`, {
  method: 'POST',
  credentials: 'include',
  body: '',
  headers: {
    'Content-type': 'application/json'
  },
}).then(res => res.json());

/** 
 * Login the user with credentials in user object
 * @param {Object} user
 * @returns {Promise} Server response json
 */
const loginUser = (user) => fetch(`/users/login`, {
  method: 'POST',
  body: JSON.stringify(user),
  credentials: "include",
  headers: {
    'Content-type': 'application/json'
  },
}).then(res => res.json())

const logoutUser = (user) => fetch(`/users/logout`, {
  method: 'GET',
  credentials: "include",
  headers: {
    'Content-type': 'application/json'
  }
}).then(res => res.json())

const updateUserLocalStorage = (user) => {
  if (!user) {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    return;
  }
  localStorage.setItem('userId', user.id);
  localStorage.setItem('userEmail', user.email);
  localStorage.setItem('firstName', user.firstName);
  localStorage.setItem('lastName', user.lastName);
}

const getUserFromLocalStorage = () => {
  const user = {
    id: localStorage.getItem('userId'),
    email: localStorage.getItem('userEmail'),
    firstName: localStorage.getItem('firstName'),
    lastName: localStorage.getItem('lastName'),
  }
  return user;
}

export { checkAuth, loginUser, logoutUser, getUserFromLocalStorage, updateUserLocalStorage }
