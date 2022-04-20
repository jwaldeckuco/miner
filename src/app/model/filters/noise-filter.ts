export class NoiseFilter {

  static isNoise(word: string): boolean{
    const noiseWords = [
      "a", "an", "the", "and", "or", "of", "to", "be", "is", "in", "out",
      "by", "as", "at", "off"
    ];

    let result = false;

    noiseWords.forEach(tempWord => {
      if(tempWord === word){
        result = true;
      }
    });

    return result;
  }
}
