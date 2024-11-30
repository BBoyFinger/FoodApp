import axios from "axios";

export const login = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5555/api/users/login",
      user
    );
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    document.location.href = "/";
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAIL", payload: error.response.data.message });
  }
};

export const SignupUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5555/api/users/add-user",
      user
    );
    localStorage.setItem("userInfo", JSON.stringify(data));
    dispatch({ type: "USER_SIGNUP_SUCCESS", payload: data });
    document.location.href = "/";
  } catch (error) { }
};

export const SignoutUser = (user) => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: "USER_SIGNOUT_SUCCESS", payload: {} });
  document.location.href = "/";
};

export const getUserById = async (id) => {
  try {
    const data = await axios.get(
      `http://localhost:5555/api/users/detail/${id}`
    );
    return data
  } catch (error) {
    return error
  }
};

export const getAllUser = () => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.get("http://localhost:5555/api/users", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: "GET_ALL_USER", payload: data });
  } catch (error) {
    dispatch({ type: "GET_ALL_USER_FAIL", payload: error.message });
  }
};
export const updateUser = (body) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `http://localhost:5555/api/users/update/${body._id}`,
      body,
      config
    );
    return data;
  } catch (error) {
    return error;
  }
};


export const deleteUser = (userId) => async (dispatch, getState) => {
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = await axios.delete(
      `http://localhost:5555/api/users/delete/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "DELETE_USER", payload: data });
  } catch (error) {
    dispatch({ type: "DELETE_USER_FAIL", error: error.message });
  }
};
