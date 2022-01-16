const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset}`,
  }));

const initialState = [getItems(10), getItems(5, 10), getItems(3, 15)];

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

const remove = (list, sourceDroppableID, deleteIndex) => {
  const destClone = Array.from(list[sourceDroppableID]);

  destClone.splice(deleteIndex, 1);

  const result = [];
  result[sourceDroppableID] = destClone;

  const newState = [...list];
  newState[sourceDroppableID] = result[sourceDroppableID];

  return newState;
};

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
    default:
      return state;
  }
}

export default addReducer;
