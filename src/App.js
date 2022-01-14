import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reorder } from "./actions";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { store } from "./app/store";

function App() {
  const counter = useSelector((state) => state.counter);
  const order = useSelector((state) => state.entries);
  const dispatch = useDispatch();

  let handleDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(reorder(result));
  };

  return (
    <div className="App">
      <header className="App-header">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="entries">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {order.map(({ title, content, key, index }) => {
                  return (
                    <Draggable key={key} draggableId={title} index={index}>
                      {(provided) => (
                        <div style={{backgroundColor: "#"+((1<<24)*Math.random()|0).toString(16) }}>
                          <li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <h1>{title}</h1>
                            <p>{content}</p>
                          </li>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
