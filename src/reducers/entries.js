localStorage.setItem("state", JSON.stringify([[], [], [], []]));
const initialState = JSON.parse(localStorage.getItem("state"));

const addItem = (state) => {
  const destCloneUnsliced = Array.from(
    JSON.parse(localStorage.getItem("state"))[0]
  );

  let item = {
    id: state.id + `item-0-${new Date().getTime()}`,
    content: state.content,
    description: state.description,
    severity: state.severity,
  };

  let destClone = destCloneUnsliced.slice();
  destClone.unshift(item);

  const result = [];
  result[0] = destClone;

  const newState = [...JSON.parse(localStorage.getItem("state"))];
  newState[0] = result[0];

  localStorage.setItem("state", JSON.stringify([...newState]));
  return newState;
};

//Changing the order of items vertically
const reorder = (sourceDroppableID, sourceIndex, destIndex) => {
  const destClone = Array.from(
    JSON.parse(localStorage.getItem("state"))[sourceDroppableID]
  );

  const [removed] = destClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, removed);

  const result = [];
  result[sourceDroppableID] = destClone;

  const newState = [...JSON.parse(localStorage.getItem("state"))];
  newState[sourceDroppableID] = result[sourceDroppableID];

  localStorage.setItem("state", JSON.stringify([...newState]));
  return newState;
};

//Changing the order of items horizontally
const move = (source, destination) => {
  const sourceClone = Array.from(
    JSON.parse(localStorage.getItem("state"))[source.droppableId]
  );
  const destClone = Array.from(
    JSON.parse(localStorage.getItem("state"))[destination.droppableId]
  );

  const [removed] = sourceClone.splice(source.index, 1);
  destClone.splice(destination.index, 0, removed);

  const result = [];
  result[source.droppableId] = sourceClone;
  result[destination.droppableId] = destClone;

  const newState = [...JSON.parse(localStorage.getItem("state"))];

  newState[source.droppableId] = result[source.droppableId];
  newState[destination.droppableId] = result[destination.droppableId];

  localStorage.setItem("state", JSON.stringify([...newState]));
  return newState;
};

//Removing an item from the list
const remove = (sourceDroppableID, deleteIndex) => {
  const destClone = Array.from(
    JSON.parse(localStorage.getItem("state"))[sourceDroppableID]
  );

  destClone.splice(deleteIndex, 1);

  const result = [];
  result[sourceDroppableID] = destClone;

  const newState = [...JSON.parse(localStorage.getItem("state"))];
  newState[sourceDroppableID] = result[sourceDroppableID];

  localStorage.setItem("state", JSON.stringify([...newState]));
  return newState;
};

//Removing a column XXDEPRECIATEDXX
const removeColumn = (list) => {
  const destClone = Array.from(list);

  destClone.pop();

  return destClone;
};

//List of reducers
function addReducer(state = initialState, action) {
  switch (action.type) {
    case "MOVE":
      if (JSON.parse(localStorage.getItem("state"))) {
        localStorage.setItem(
          "state",
          JSON.stringify([
            ...move(action.payload.source, action.payload.destination),
          ])
        );
        return JSON.parse(localStorage.getItem("state"));
      }
      return JSON.parse(localStorage.getItem("state"));

    case "REORDER":
      if (JSON.parse(localStorage.getItem("state"))) {
        localStorage.setItem(
          "state",
          JSON.stringify([
            ...reorder(
              action.payload.sourceDroppableID,
              action.payload.sourceIndex,
              action.payload.destinationIndex
            ),
          ])
        );
        return JSON.parse(localStorage.getItem("state"));
      }
      return JSON.parse(localStorage.getItem("state"));

    case "REMOVE":
      if (JSON.parse(localStorage.getItem("state"))) {
        localStorage.setItem(
          "state",
          JSON.stringify([
            ...remove(
              action.payload.sourceDroppableID,
              action.payload.removeIndex
            ),
          ])
        );
        return JSON.parse(localStorage.getItem("state"));
      }
      return JSON.parse(localStorage.getItem("state"));

    case "ADDCOLUMN":
      if (state.length <= 4) {
        localStorage.setItem("state", JSON.stringify([...state, []]));
      }
      return JSON.parse(localStorage.getItem("state"));

    case "REMOVECOLUMN":
      localStorage.setItem("state", JSON.stringify([...removeColumn()]));
      return JSON.parse(localStorage.getItem("state"));

    case "ADDITEM":
      localStorage.setItem(
        "state",
        JSON.stringify([...addItem(action.payload)])
      );
      return JSON.parse(localStorage.getItem("state"));
    default:
      return JSON.parse(localStorage.getItem("state"));
  }
}

export default addReducer;
