import { Sorter } from './Sorter';

export class CharactersCollection extends Sorter {
  constructor(public data: string) {
    super();
  }

  get length():number { return this.data.length; }

  compare = (left: number, right: number): boolean => (
    this.data[left].toLowerCase() > this.data[right].toLowerCase()
  )

  swap = (left: number, right: number): void => {
    const characters = this.data.split('');
    const l = characters[left];
    characters[left] = characters[right];
    characters[right] = l;
    this.data = characters.join('');
  }
}
