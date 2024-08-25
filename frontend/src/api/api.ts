import { Wine } from '../model/Wine';

export const getAllWines = (): Promise<Response> => {
  return fetch('http://localhost:3000/getWines', {
    method: 'GET',
  });
};

export const getInfoFromLabel = (image: string): Promise<Response> => {
  return fetch('http://localhost:3000/getInfoFromLabel', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ image: image }),
  });
};

export const addNewWine = (wine: Wine): Promise<Response> => {
  return fetch('http://localhost:3000/postWine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...wine }),
  });
};

export const getPairingsForWine = (wine: Wine): Promise<Response> => {
  return fetch('http://localhost:3000/getPairingsForWine', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wine }),
  });
};

export const getSommelier = (step: string): Promise<Response> => {
  return fetch(`http://localhost:3000${step}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getPairingsForFood = (
  food: string,
  wines: Wine[]
): Promise<Response> => {
  return fetch('http://localhost:3000/getPairingsForFood', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ wines, food }),
  });
};

export const analyseMenu = (images: string[]): Promise<Response> => {
  return fetch('http://localhost:3000/postAnalyseMenu', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ images: [...images] }),
  });
};

export const removeWine = (id: number): Promise<Response> => {
  return fetch('http://localhost:3000/deleteWine', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  });
};
