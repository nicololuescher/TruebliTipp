import { wineStore } from '../../store/WineStore';

export const getAllWines = () => {
  fetch('http://localhost:3000/getWines')
    .then((response) => response.json())
    .then((json) => {
      wineStore.setWines(json);
      console.log(json);
    })
    .catch((error) => console.error(error));
};
