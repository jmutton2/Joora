export const reorder = (result) => {
  return {
    type: "REORDER",
    order: result,
  };
};

export const increment = () => {
  return {
    type: "INCREMENT",
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};
