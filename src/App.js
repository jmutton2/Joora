import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  moveItemAction,
  reorderItemAction,
  removeItemAction,
  addColumnAction,
  removeColumnAction,
  addItemAction
} from "./actions";

//\\####STYLING####\\//
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 40,
  margin: `0 0 20px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: 5,
  width: 250,
});

//\\####STYLING####//\\

const DragDropList = (props) => {
  const dispatch = useDispatch();
  return (
    <div style={{ display: "flex" }}>
      <div>
        <button
          type="button"
          onClick={() => {
            dispatch(addColumnAction());
          }}
        >
          Add new group
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(removeColumnAction());
          }}
        >
          Remove last column
        </button>
        <button
          type="button"
          onClick={() => {
            dispatch(addItemAction());
          }}
        >
          Add new item
        </button>
      </div>

      {props.state.map((el, ind) => (
        <Droppable key={ind} droppableId={`${ind}`}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {el.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        {item.content}
                        <button
                          type="button"
                          onClick={() => {
                            dispatch(removeItemAction(index, ind));
                          }}
                        >
                          delete
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export const DragDropListContainer = () => {
  const state = useSelector((state) => state);
  if (state) {
    return <DragDropList state={state} />;
  } else {
    return <span>NO ENTRIES</span>;
  }
};

export const DragDropContextContainer = () => {
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sourceDroppableID = +result.source.droppableId;
    const destinationDroppableID = +result.destination.droppableId;

    if (sourceDroppableID === destinationDroppableID) {
      dispatch(
        reorderItemAction(
          sourceDroppableID,
          result.source.index,
          result.destination.index
        )
      );
    } else {
      dispatch(moveItemAction(result.source, result.destination));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <DragDropListContainer />
    </DragDropContext>
  );
};

export default DragDropContextContainer;
