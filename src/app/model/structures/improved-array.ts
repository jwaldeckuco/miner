export class ImprovedArray extends Array implements Iterable<any>{
  // data: any[];

  constructor() {
    super();
  }

  add(element: any){
    super.push(element);
  }

  getElement(element: any){
    return this.find(element);
  }

  getElementByIndex(index: number): any {
    return this[index];
  }

  has(element: any): boolean{
    return super.includes(element);
  }

  // override find(element: any): any{
  //   super.find(arrayElement => arrayElement === element);
  // }

  remove(element: any){
    if(this.has(element)){
      let index = this.getElementByIndex(element);
      super.splice(index);
    }
  }

  getLast(): any {
    return this[this.length - 1];
  }

  getLength(): number {
    return super.length;
  }

  clear(){
    super.length = 0;
  }

  isEmpty(): boolean {
    return super.length === 0;
  }
}
