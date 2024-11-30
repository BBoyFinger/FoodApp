import axios from "axios";

export const createOrderGhn = (orderId) => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await axios.post(
      `http://localhost:5555/api/orders/update/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );
    dispatch({ type: "CREATE_ORDER_GHN", payload: data });
  } catch (error) {
    dispatch({ type: "CREATE_ORDER_GHN_FAIL", payload: error });
  }
};

export const PrintOrderGhn = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5555/api/orders/print/${orderId}`
    );
    window.open(data);
    dispatch({ type: "PRINT_ORDER_GHN", payload: data });
  } catch (error) {}
};
