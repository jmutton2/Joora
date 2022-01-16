export function reorderItemAction(
  sourceDroppableID,
  sourceIndex,
  destinationIndex
) {
  return (dispatch) => {
    dispatch({
      type: "REORDER",
      payload: { sourceDroppableID, sourceIndex, destinationIndex },
    });
  };
}

export function moveItemAction(source, destination) {
  return (dispatch) => {
    dispatch({
      type: "MOVE",
      payload: {
        source,
        destination,
      },
    });
  };
}

export function removeItemAction(removeIndex, sourceDroppableID) {
  return (dispatch) => {
    dispatch({
      type: "REMOVE",
      payload: {
        removeIndex,
        sourceDroppableID,
      },
    });
  };
}

export function addColumnAction() {
  return (dispatch) => {
    dispatch({
      type: "ADDCOLUMN",
    });
  };
}

export function removeColumnAction() {
  return (dispatch) => {
    dispatch({
      type: "REMOVECOLUMN",
    });
  };
}

export function addItemAction() {
  return (dispatch) => {
    dispatch({
      type: "ADDITEM",
    });
  };
}
