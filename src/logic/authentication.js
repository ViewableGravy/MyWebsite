export const logout = (dispatch) => {
  dispatch({
    token: null,
    username: null
  });
}