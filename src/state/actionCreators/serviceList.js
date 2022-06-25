const base = "service-list "; // action base

// fetch request states

const loadInitiate = () => ({ type: base + "load-initiate" });
const loadFailed = error => ({ type: base + "load-failed", payload: { error } });
const loadSucceeded = items => ({ type: base + "load-succeeded", payload: { items } });

const removeInitiate = id => ({ type: base + "remove-initiate", payload: { id } });
const removeFailed = (id, error) => ({ type: base + "remove-failed", payload: { id, error } });
const removeSucceeded = id => ({ type: base + "remove-succeeded", payload: { id } });


// redux-thunk

const load = async dispatch => {
  dispatch(loadInitiate());
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + "/services");
    if (!response.ok) throw new Error(response.statusText);
    dispatch(loadSucceeded(await response.json()));
  } catch (e) {
    dispatch(loadFailed(e.message));
  }
};

const remove = id => async (dispatch) => {
  dispatch(removeInitiate(id));
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + "/services/" + +id, { method: "DELETE" });
    if (!response.ok) throw new Error(response.statusText);
    dispatch(removeSucceeded(id));
  } catch (e) {
    dispatch(removeFailed(id, e.message));
  }
};


export default {
  load,
  remove
};