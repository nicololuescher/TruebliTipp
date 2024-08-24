import { Wine } from '../src/model/Wine';
import { makeAutoObservable } from 'mobx';

class CopiedWineStore {
  wine: Wine = {} as Wine;

  constructor() {
    makeAutoObservable(this); // Makes the store observable and actions automatic
  }

  setCopiedWine(wine: Wine) {
    this.wine = wine;
  }

  removeCopiedWine() {
    this.wine = {} as Wine;
  }

  get copiedWine() {
    return this.wine;
  }
}

export const copiedWineStore = new CopiedWineStore();
