const jooraEntries = [
  {
    index: 0,
    title: "entry1",
    content: "This is an entry",
    key: 1,
  },
  {
    index: 1,
    title: "entry2",
    content: "This is an entry",
    key: 2,
  },
  {
    index: 2,
    title: "entry3",
    content: "This is an entry",
    key: 3,
  },
  {
    index: 3,
    title: "entry4",
    content: "This is an entry",
    key: 4,
  },
];

const entries = (state = jooraEntries, action) => {
  switch (action.type) {
    case "REORDER":
      if (!action.order.destination) return;
      const items = Array.from(state);
      const [reorderedItem] = items.splice(action.order.source.index, 1);
      items.splice(action.order.destination.index, 0, reorderedItem);
      return (state = items);

    default:
      return state;
  }
};

export default entries;
