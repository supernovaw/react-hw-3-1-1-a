const base = "service-details "; // action base

// fetch request states

const loadInitiate = () => ({ type: base + "load-initiate" });
const loadFailed = error => ({ type: base + "load-failed", payload: { error } });
const loadSucceeded = details => ({ type: base + "load-succeeded", payload: { details } });

const saveInitiate = () => ({ type: base + "save-initiate" });
const saveFailed = error => ({ type: base + "save-failed", payload: { error } });
const saveSucceeded = () => ({ type: base + "save-succeeded" });

// local
const resetSaveStatus = () => ({ type: base + "save-status-reset" });
const resetDetails = () => ({ type: base + "reset" });


// redux-thunk

const load = id => async dispatch => {
  dispatch(loadInitiate());
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + "/services/" + +id);
    if (!response.ok) throw new Error(response.statusText);
    dispatch(loadSucceeded(await response.json()));
  } catch (e) {
    dispatch(loadFailed(e.message));
  }
};


const save = (details, successCallback) => async dispatch => {
  dispatch(saveInitiate());
  try {
    const response = await fetch(process.env.REACT_APP_API_URL + "/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details)
    });
    if (!response.ok) throw new Error(response.statusText);
    dispatch(saveSucceeded());
    successCallback(); // force serviceList to reload
  } catch (e) {
    dispatch(saveFailed(e.message));
  }
}


export default {
  load,
  save,
  resetSaveStatus,
  resetDetails
};