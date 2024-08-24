import { Wine } from '../src/model/Wine';
import { makeAutoObservable } from 'mobx';

class ScannedWineCardStore {
  wines: Wine[] = [];

  constructor() {
    makeAutoObservable(this); // Makes the store observable and actions automatic
  }

  setWines(wines: Wine[]) {
    this.wines = wines;
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

  get allWines() {
    return this.wines;
  }

  get totalWines() {
    return this.wines.length;
  }
}

export const scannedWineCardStore = new ScannedWineCardStore();
