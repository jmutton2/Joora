import { myStore } from "../localStorage/localStorage";

//Random entry generator
// const getItems = (count, offset = 0) =>
//   Array.from({ length: count }, (v, k) => k).map((k) => ({
//     id: `item-${k + offset}-${new Date().getTime()}`,
//     content: `item ${k + offset}`,
//     description: "This is a description of the entry",
//     severity: "critical",
//   }));

const initialState = myStore.state;

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
const move = (source, destination) => {
  const sourceClone = Array.from(myStore.state.state[source.droppableId]);
  const destClone = Array.from(myStore.state.state[destination.droppableId]);

  const [removed] = sourceClone.splice(source.index, 1);
  destClone.splice(destination.index, 0, removed);

  const result = [];
  result[source.droppableId] = sourceClone;
  result[destination.droppableId] = destClone;

  const newState = [...myStore.state.state];

  newState[source.droppableId] = result[source.droppableId];
  newState[destination.droppableId] = result[destination.droppableId];

  return newState;
};

//Removing an item from the list
const remove = (sourceDroppableID, deleteIndex) => {
  const destClone = Array.from(myStore.state.state[sourceDroppableID]);

  destClone.splice(deleteIndex, 1);

  const result = [];
  result[sourceDroppableID] = destClone;

  const newState = [...myStore.state.state];
  newState[sourceDroppableID] = result[sourceDroppableID];

  return newState;
};

//Removing a column XXDEPRECIATEDXX
const removeColumn = (list) => {
  const destClone = Array.from(list);

  destClone.pop();

  return destClone;
};

//Adding a new random item to the first list
const addItem = () => {
  // myStore.state.setState((myStore.state.state[0] = 1));
  const destClone = Array.from(myStore.state.state[0]);

  let item = {
    id: `item-0-${new Date().getTime()}`,
    content: `item 0`,
    description: "This is a description of the entry",
    severity: "critical",
  };

  destClone.push(item);

  const result = [];
  result[0] = destClone;

  const newState = [...myStore.state.state];
  newState[0] = result[0];

  return newState;
};

//List of reducers
function addReducer(state = initialState, action) {
  switch (action.type) {
    case "MOVE":
      if (myStore.state.state) {
        myStore.state.state = [
          ...move(action.payload.source, action.payload.destination),
        ];
        return myStore.state.state;
      }
      return myStore.state.state;

    case "REORDER":
      if (myStore.state.state) {
        myStore.state.state = [
          ...reorder(
            action.payload.sourceDroppableID,
            action.payload.sourceIndex,
            action.payload.destinationIndex
          ),
        ];
        return myStore.state.state;
      }
      return myStore.state.state;

    case "REMOVE":
      if (myStore.state.state) {
        myStore.state.state = [
          ...remove(
            action.payload.sourceDroppableID,
            action.payload.removeIndex
          ),
        ];
        return myStore.state.state;
      }
      return myStore.state.state;

    case "ADDCOLUMN":
      if (state.length <= 4) {
        myStore.state.state = [...state, []];
      }
      return myStore.state.state;

    case "REMOVECOLUMN":
      myStore.state.state = [...removeColumn()];
      return myStore.state.state;

    case "ADDITEM":
      myStore.state.state = [...addItem()];
      return myStore.state.state;
    default:
      return myStore.state.state;
  }
}

export default addReducer;
