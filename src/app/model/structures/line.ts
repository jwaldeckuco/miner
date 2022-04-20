export class Line {
  private first: number;
  private offsets: Array<number>;

  constructor(first: number) {
    this.first = first;
    this.offsets = [];
  }

  getFirst() : number {
    return this.first;
  }

  getOffsets() : Array<number> {
    return [...this.offsets];
  }

  addOffset(offset: number){
    if(!this.hasOffset(offset)){
      this.offsets.push(offset);
    }
  }

  hasOffset(offset: number) : boolean {
    return this.offsets.includes(offset);
  }
}
