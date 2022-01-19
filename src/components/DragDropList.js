import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  moveItemAction,
  reorderItemAction,
  removeItemAction,
} from "../actions";
import "../css/style.css";
import Button from "@mui/material/Button";
import { myStore } from "../localStorage/localStorage";

//\\####STYLING####\\//
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: 30,
  margin: `0 0 20px 0`,
  height: 80,
  background: isDragging ? "#2c2f33" : "#2c2f33",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: "rgb(55, 58, 62)",
  padding: 10,
  width: 280,
  marginTop: 10,
  marginInline: 10,
  maxHeight: "96vh",
  overflowY: "auto",
});

//\\####STYLING####//\\

const DragDropList = () => {
  const dispatch = useDispatch();

  let titles = ["TO DO", "IN PROGRESS", "REVIEW", "DONE"];

  return (
    <div
      style={{
        display: "flex",
        background: "#23272a",
        paddingTop: 25,
        height: "95vh",
      }}
    >
      {myStore.state.state.map((el, ind) => (
        <div style={{ overflow: "hidden" }}>
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                {titles[ind]}
                {el.map((item, index) => (
                  <Draggable
                    className="droppable"
                    key={item.id}
                    draggableId={item.id}
                    index={index}
                  >
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
                          key={item}
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                            fontFamily: "Uni Sans Heavy",
                          }}
                        >
                          {item.content}
                          <br></br>
                          {item.description}
                          <Button
                            type="button"
                            onClick={() => {
                              dispatch(removeItemAction(index, ind));
                            }}
                          >
                            delete
                          </Button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
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
    <div style={{ background: "#23272a" }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <DragDropListContainer />
      </DragDropContext>
    </div>
  );
};

export default DragDropContextContainer;
