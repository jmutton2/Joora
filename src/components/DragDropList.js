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
import { Delete } from "@material-ui/icons";

//\\####STYLING####\\//
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  margin: `0 0 20px 0`,
  height: 140,
  background: isDragging ? "#2c2f33" : "#2c2f33",
  ...draggableStyle,
});

const getListStyle = () => ({
  background: "rgb(55, 58, 62)",
  borderRadius: "7px",
  padding: 10,
  width: 280,
  marginTop: 10,
  marginInline: 20,
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
      {JSON.parse(localStorage.getItem("state")).map((el, ind) => (
        <div style={{ overflow: "hidden" }} key={el + ind}>
          <Droppable key={ind} droppableId={`${ind}`}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
                {...provided.droppableProps}
              >
                <div style={{ paddingBottom: 20 }}>{titles[ind]}</div>

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
                            display: "grid",
                            width: "100%",
                            height: "100%",
                            fontFamily: "Palatino",
                            gridTemplateColumns: "1.8fr 0.2fr",
                            gridTemplateRows: ".5fr",
                            gap: "0px 0px",
                          }}
                        >
                          <div
                            style={{
                              paddingTop: 10,
                              fontWeight: "bold",
                              padding: 10,
                              overflow: "hidden",
                            }}
                          >
                            {item.content}
                          </div>

                          <br></br>
                          <div style={{ paddingLeft: 10 }}>
                            {item.description}
                          </div>
                          <div
                            style={{ display: "flex", alignItems: "flex-end" }}
                          >
                            <Button
                              style={{
                                height: 35,
                              }}
                              type="button"
                              onClick={() => {
                                dispatch(removeItemAction(index, ind));
                              }}
                            >
                              <Delete />
                            </Button>
                          </div>
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
