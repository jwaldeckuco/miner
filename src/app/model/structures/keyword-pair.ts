export class KeywordPair {
  private _keywords: string;
  private _url: string;

  constructor(keywords: string, url: string) {
    this._keywords = keywords;
    this._url = url;
  }

  getKeyword(){
    return this._keywords;
  }

  getUrl(){
    return this._url;
  }

  toString(): string{
    return "Keywords: " + this._keywords + ",\nURL: " + this.getUrl();
  }
}
