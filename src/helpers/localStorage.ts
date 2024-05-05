export const getLocalStorageValue = () => {
  let savedIndexArray: string[];
  const savedIndex = localStorage.getItem("index");
  if (savedIndex != null) {
    savedIndexArray = JSON.parse(savedIndex);
    return savedIndexArray;
  } else {
    return [];
  }
};
export const saveAsFavourites = (id: string) => {
  const savedIndexArray = getLocalStorageValue();
  if (savedIndexArray != null) {
    if (!savedIndexArray.includes(id)) {
      savedIndexArray.push(id);
      localStorage.setItem("index", JSON.stringify(savedIndexArray));
    }
  } else {
    localStorage.setItem("index", JSON.stringify([id]));
  }
};
export const removeFromFavourites = (id: string) => {
  const savedIndexArray = getLocalStorageValue();
  if (savedIndexArray != null) {
    const arrayIndex = savedIndexArray.indexOf(id);
    if (arrayIndex !== -1) {
      savedIndexArray.splice(arrayIndex, 1);
      localStorage.setItem("index", JSON.stringify(savedIndexArray));
    }
  }
};
