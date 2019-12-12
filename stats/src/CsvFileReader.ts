import fs from 'fs';

export abstract class CsvFileReader<T> {
  data: T[] = [];
  constructor(public file: string) {}

  abstract mapRow(row: string[]): T;

  read = (): void => {
    this.data = fs.readFileSync(this.file, { encoding: 'utf-8' })
      .split('\n')
      .map((row: string): string[] => row.split(','))
      .map(this.mapRow);
  }
}
