//Random entry generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
    description: "This is a description of the entry",
    severity: "critical",
  }));

//Get random items as the state
const initialState = [getItems(10), getItems(5, 10), getItems(3, 15), getItems(0)];

//Changing the order of items vertically
const reorder = (list, sourceDroppableID, sourceIndex, destIndex) => {
  const destClone = Array.from(list[sourceDroppableID]);

  const [removed] = destClone.splice(sourceIndex, 1);
  destClone.splice(destIndex, 0, removed);

  const result = [];
  result[sourceDroppableID] = destClone;

  const newState = [...list];
  newState[sourceDroppableID] = result[sourceDroppableID];

  return newState;
};

//Changing the order of items horizontally
const move = (list, source, destination) => {
  const sourceClone = Array.from(list[source.droppableId]);
  const destClone = Array.from(list[destination.droppableId]);

  const [removed] = sourceClone.splice(source.index, 1);
  destClone.splice(destination.index, 0, removed);

  const result = [];
  result[source.droppableId] = sourceClone;
  result[destination.droppableId] = destClone;

  const newState = [...list];

  newState[source.droppableId] = result[source.droppableId];
  newState[destination.droppableId] = result[destination.droppableId];

  return newState;
};

//Removing an item from the list
const remove = (list, sourceDroppableID, deleteIndex) => {
  const destClone = Array.from(list[sourceDroppableID]);

  destClone.splice(deleteIndex, 1);

  const result = [];
  result[sourceDroppableID] = destClone;

  const newState = [...list];
  newState[sourceDroppableID] = result[sourceDroppableID];

  return newState;
};

//Removing a column
const removeColumn = (list) => {
  const destClone = Array.from(list);

  destClone.pop();

  return destClone;
};

//Adding a new random item to the first list
const addItem = (list, amt) => {
  const destClone = Array.from(list[0]);

  destClone.splice(0, 0, getItems(1)[0]);

  const result = [];
  result[0] = destClone;

  const newState = [...list];
  newState[0] = result[0];

  return newState;
};

//List of reducers
function addReducer(state = initialState, action) {
  switch (action.type) {
    case "MOVE":
      if (state) {
        state = [
          ...move(state, action.payload.source, action.payload.destination),
        ];
        return state;
      }
      return state;

    case "REORDER":
      if (state) {
        state = [
          ...reorder(
            state,
            action.payload.sourceDroppableID,
            action.payload.sourceIndex,
            action.payload.destinationIndex
          ),
        ];
        return state;
      }
      return state;

    case "REMOVE":
      if (state) {
        state = [
          ...remove(
            state,
            action.payload.sourceDroppableID,
            action.payload.removeIndex
          ),
        ];
        return state;
      }
      return state;

    case "ADDCOLUMN":
      if (state.length <= 4) {
        state = [...state, []];
      }
      return state;

    case "REMOVECOLUMN":
      state = [...removeColumn(state)];
      return state;

    case "ADDITEM":
      state = [...addItem(state, 1)];
      return state;
    default:
      return state;
  }
}

export default addReducer;
