export class Characters {
  private charString : string;
  private dev = true;
  // #lineIndices;

  constructor() {
    this.charString = "";
  }

  setCharacters(characters: string){
    this.charString = characters;
    // console.log(this.charString)
  }

  getCharacters(){
    return this.charString;
  }

  getWordByIndex(startIndex: number){
    let endIndex = this.charString.indexOf(" ", startIndex);
    // console.log("start: " + startIndex + ", char: " + this.charString.charAt(startIndex) + " ,end: " + endIndex);
    if(endIndex === -1){
      endIndex = this.charString.length;
    }

    return this.charString.substring(startIndex, endIndex);
  }

  reset(){
    this.charString = "";
  }

  devPrint(message: any){
    if(this.dev){
      console.log("Characters")
      console.log(message);
    }
  }
}
