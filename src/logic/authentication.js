export const logout = (dispatch) => {
  dispatch({
    token: null,
    username: null
  });

  localStorage.setItem('token', null);
  localStorage.setItem('username', null);
}