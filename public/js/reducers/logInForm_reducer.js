function logInForm(state=[], action) {
  console.log(state, 'was state in reducers/logInForm_reducer');
  console.log(action, 'was action in reducers/logInForm_reducer');
  switch(action.type){

    case "UPDATE_FORM_USERNAME":
      return {
        ...state,
        'username': action.formUsername
      }

    case "UPDATE_FORM_PASSWORD":
      return {
        ...state,
        'password': action.formPassword
      }
      // [
      //   //basically the same as update form username, but with the password field.
      // ]
    default:
      return state;
  }
}

export default logInForm;
