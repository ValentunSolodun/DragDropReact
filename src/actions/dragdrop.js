export const dropOnTarget = (itemSource, itemTarget) => ({
  type: "DROP",
  itemSource: {
    ...itemSource
  },
  itemTarget : {
    ...itemTarget
  }
});