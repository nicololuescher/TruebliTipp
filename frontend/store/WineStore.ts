import { Wine } from '../src/model/Wine';
import { makeAutoObservable } from 'mobx';

class WineStore {
  wines: Wine[] = [
    {
      id: 1,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 2,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 3,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 4,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 5,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 6,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 7,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 8,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
    {
      id: 9,
      name: 'Cabernet Sauvignon',
      year: 2018,
      country: 'Swiss',
      region: 'Valais',
      used: false,
      description: 'nice',
      feedback: 5,
      grapes: 'idk',
      price: 12.5,
      tags: ['nice'],
      type: 'Red',
    },
  ];

  constructor() {
    makeAutoObservable(this); // Makes the store observable and actions automatic
  }

  addWine(wine: Wine) {
    this.wines.push(wine);
  }

  removeWine(id: number) {
    this.wines = this.wines.filter((wine) => wine.id !== id);
  }

  getWineById(id: number) {
    return this.wines.find((wine) => wine.id === id);
  }

  get totalWines() {
    return this.wines.length;
  }
}

export const wineStore = new WineStore();
