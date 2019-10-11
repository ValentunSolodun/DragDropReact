export const registerAction = (e) => {
  e.preventDefault();
  return {
    type: 'REGISTERSEND',
    name: e.target.name_register.value,
    email: e.target.email_register.value,
    password: e.target.password_register.value
  }
}

export const loginAction = (e) => {
  e.preventDefault();
  return {
    type: 'LOGINSEND',
    email: e.target.email_login.value,
    password: e.target.password_login.value
  }
}
//
//
// export const validationAction = e => {
//     e.preventDefault();
//     return {
//         type: 'VALIDATION',
//         payload: { id: e.target.id, value: e.target.value }
//     }
// }
//
// export const logOutAction = () => {
//     history.push('/login');
//     cookie.remove('token');
//     return {
//         type: "LOGOUT"
//     }
//
// }