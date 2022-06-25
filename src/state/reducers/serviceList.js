const actionBase = "service-list ";

const statusIdle = error => ({ loading: false, error });
const statusWait = () => ({ loading: true, error: null });

const removeId = (state, id) => state.removePendingIds.filter(entry => entry !== id);
const addId = (state, id) => { const list = removeId(state, id); list.push(id); return list };

const defaultState = {
  items: [],
  loadStatus: statusIdle(),
  removePendingIds: []
}

export default (state = defaultState, { type, payload }) => {
  if (!type.startsWith(actionBase)) return state;
  const subAction = type.substring(actionBase.length);

  switch (subAction) {
/* */  case "load-initiate": return { ...state, loadStatus: statusWait() }
/*   */  case "load-failed": return { ...state, loadStatus: statusIdle(payload.error) }
/**/  case "load-succeeded": return { ...state, loadStatus: statusIdle(), items: payload.items }

/* */case "remove-initiate": return { ...state, removePendingIds: addId(state, payload.id) }
/*   */case "remove-failed": return { ...state, removePendingIds: removeId(state, payload.id) }
/**/case "remove-succeeded": return { ...state, items: state.items.filter(item => item.id !== payload.id), removePendingIds: removeId(state, payload.id) }
  }

  console.error("unrecognized " + actionBase + "subaction '" + subAction + "'!");
  return state;
};

// comments in switch are for straight alignment (so that auto-formatter doesn't ruin it all the time)