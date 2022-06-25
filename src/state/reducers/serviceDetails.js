const actionBase = "service-details ";

const statusIdle = error => ({ loading: false, error });
const statusWait = () => ({ loading: true, error: null });

const defaultState = {
  details: null,
  loadStatus: statusIdle(),
  saveStatus: statusIdle()
}

export default (state = defaultState, { type, payload }) => {
  if (!type.startsWith(actionBase)) return state;
  const subAction = type.substring(actionBase.length);

  switch (subAction) {
/**/ case "load-initiate": return { ...state, loadStatus: statusWait() }
/**/   case "load-failed": return { ...state, loadStatus: statusIdle(payload.error) }
/**/case "load-succeeded": return { ...state, loadStatus: statusIdle(), details: payload.details }

/**/ case "save-initiate": return { ...state, saveStatus: statusWait() }
/**/   case "save-failed": return { ...state, saveStatus: statusIdle(payload.error) }
/**/case "save-succeeded": return { ...state, saveStatus: statusIdle() }

/**/            case "reset": return { ...defaultState }
/**/case "save-status-reset": return { ...state, saveStatus: statusIdle() }
  }

  console.error("unrecognized " + actionBase + "subaction '" + subAction + "'!");
  return state;
};

// comments in switch are for straight alignment (so that auto-formatter doesn't ruin it all the time)