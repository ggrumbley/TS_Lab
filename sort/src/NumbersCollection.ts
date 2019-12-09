import { Sorter } from './Sorter';

export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    super();
  }

  get length():number { return this.data.length; }

  compare = (left: number, right: number): boolean => this.data[left] > this.data[right];

  swap = (left: number, right: number): void => {
    const l = this.data[left];
    this.data[left] = this.data[right];
    this.data[right] = l;
  }
}
