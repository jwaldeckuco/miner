export class PerformanceTimer {
  startTime: number;
  stopTime: number;
  totalTime: number;

  constructor() {
    this.startTime = 0;
    this.stopTime = 0;
    this.totalTime = 0;
  }

  start(){
    this.startTime = performance.now();
  }

  stop(){
    this.stopTime = performance.now();
    this.totalTime = this.stopTime - this.startTime;
  }

  getTotalTime(): number{
    return this.totalTime;
  }

  reset(){
    this.startTime = 0;
    this.stopTime = 0;
    this.totalTime = 0;
  }
}
