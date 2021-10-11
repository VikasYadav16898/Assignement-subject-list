export const subjectListAnimation = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      type: "spring",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      duration: 1,
    },
  },
};
