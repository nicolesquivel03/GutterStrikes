import { Injectable } from '@angular/core';
import { Frame } from '../models/frame';
import { FRAMES } from '../models/frames';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FrameService {
  frames = FRAMES;
  
  constructor() { }

  getFrames(): Observable<Frame[]> {
    return of(FRAMES);
  }

  resetFrames(): void {
    this.frames.forEach(frame => {
      frame.score1 = '';
      frame.score2 = '';
      frame.score3 = '';
      frame.total = 0;
      frame.isSpare = false;
      frame.isStrike = false;
    });
  }

  addScore(score: string, frameIndex: number): void {
    let isFirstScore = true;
    let isSecondScore = false;
    let isTenthFrame = frameIndex == 9 ? true : false;
    if(this.frames[frameIndex].score1 != '') {
      isFirstScore = false;

      if(isTenthFrame && this.frames[frameIndex].score2 != '') {
        isSecondScore = false;
      } else {
        isSecondScore = true;
      }
    }

    if(isFirstScore)
    {
      if(score == 'X')
      {
        this.frames[frameIndex].isStrike = true;
      }
      this.frames[frameIndex].score1 = score;
    }
    else if(isSecondScore) {
      if(score == '/')
      {
        this.frames[frameIndex].isSpare = true;
      }
      this.frames[frameIndex].score2 = score;
    } else {
      this.frames[frameIndex].score3 = score;
    }
  }

  updateScoreTotals(currentIndex: number): void {
    for(let i = 0; i < currentIndex; i++) {
      let score = 0;
      let previousFrameTotal = 0;
      if(i != 9 && this.frames[i].isStrike) {
        score += 10 + this.getStrikeBonus(i);
      } else if(i != 9 && this.frames[i].isSpare) {
        score += 10 + this.getSpareBonus(i);
      } else {
        score += this.getFrameTotal(i);
      }

      if(i != 0) {
        previousFrameTotal = this.frames[i-1].total;
      }

      let sum = score + previousFrameTotal;

      this.frames[i].total = sum;
    } 
  }

  getFrameTotal(index: number): number {
    let score1 = this.frames[index].score1;
    let score2 = this.frames[index].score2;
    let score3 = this.frames[index].score3;

    if(index == 9) {
      if(this.frames[index].isStrike) {
        score1 = '10';

        if(score2 == 'X') {
          score2 = '10';
        }
      } else if(this.frames[index].isSpare) {
        score2 = (10 - +score1).toString();
      }

      if(score3 == 'X') {
        score3 = '10';
      } else if(score3 == '/') {
        score3 = (10 - +score2).toString();
      }
    }

    return +score1 + +score2 + +score3;    
  }

  getStrikeBonus(index: number): number {
    let strikeBonus = 0;

    if(this.frames[index+1] && this.frames[index+1].isStrike){
      strikeBonus = 10;

      if(this.frames[index+2]) {
        if(this.frames[index+2].isStrike) {
          strikeBonus += 10;
        } else {     
          strikeBonus += +this.frames[index+2].score1;
        }
      } else {
        if(this.frames[index+1].score2 == 'X') {
          strikeBonus += 10;
        } else {
          strikeBonus += +this.frames[index+1].score2;
        }
      }
    } else {
      if(this.frames[index+1].isSpare)
      {
        strikeBonus = 10;
      } else {
        strikeBonus = this.getFrameTotal(index+1);
      }
    }

    return strikeBonus;
  }

  getSpareBonus(index: number): number {
    let spareBonus = 0;
    if(this.frames[index+1].isStrike){
      spareBonus = 10;
    } else {
      spareBonus = +this.frames[index+1].score1;
    }
    return spareBonus;
  }
}
