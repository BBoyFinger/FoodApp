import axios from "axios";

export const getAllTypeProduct = () => async (dispatch) => {
  try {
    const { data } = await axios.get("http://localhost:5555/api/type-products");
    dispatch({ type: "GET_ALL_TYPE_PRODUCT", payload: data });
  } catch (error) {}
};

export const CreateNewTypeProduct = (type) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5555/api/type-products/create`,
      type
    );
    dispatch({ type: "CREATE_NEW_TYPE_PRODUCT", payload: data });
  } catch (error) {
    throw new Error(error?.response?.data?.message);
  }
};

export const deleteTypeProduct = (type) => async (dispatch) => {
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/typeList/delete/${type._id}`
    );
    dispatch({ type: "DELETE_TYPE_PRODUCT", payload: data });
  } catch (error) {}
};
