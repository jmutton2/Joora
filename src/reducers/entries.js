const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const reorder = (list, sourceDroppableID, startIndex, endIndex) => {
  const result = Array.from(list[sourceDroppableID]);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  const newState = [...result];

  return newState;
};

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

  return result;
};

const remove = (list, sourceDroppableID, deleteIndex) => {
  const result = Array.from(list[sourceDroppableID]);
  result.splice(deleteIndex, 1);

  const newState = [...result];

  return newState;
};

const initialState = [getItems(10), getItems(5, 10)];

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
        state[action.payload.sourceDroppableID] = reorder(
          state,
          action.payload.sourceDroppableID,
          action.payload.sourceIndex,
          action.payload.destinationIndex
        );
        return state;
      }
      return state;

    case "REMOVE":
      if (state) {
        state[action.payload.sourceDroppableID] = remove(
          state,
          action.payload.sourceDroppableID,
          action.payload.removeIndex
        );
        return state;
      }
      return state;
    default:
      return state;
  }
}

export default addReducer;
