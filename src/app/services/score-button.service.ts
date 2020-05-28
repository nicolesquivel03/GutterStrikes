import { Injectable } from '@angular/core';
import { SCOREBUTTONS } from '../models/scoreButtons';
import { ScoreButton } from '../models/scoreButton';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreButtonService {

  scoreButtons = SCOREBUTTONS;
  
  constructor() { }

  getScoreButtons(): Observable<ScoreButton[]> {
    return of(SCOREBUTTONS);
  }

  disableAllButtons(): void {
    this.scoreButtons.forEach(button => {
      button.isDisabled = true;
    });
  }

  disableButtons(score: string, scoreIndex: number): void {
    if(score != 'X' && score != '/' && (scoreIndex == 1 || scoreIndex == 3)) {
      this.scoreButtons[10].isDisabled = true;
      this.scoreButtons[11].isDisabled = false;
      
      let index = this.scoreButtons.findIndex(s => s.id == (10 - +score));
      for(let i = index; i < 10; i++) {
        this.scoreButtons[i].isDisabled = true;
      }
    } else {
      this.scoreButtons[11].isDisabled = true;
    }
  }

  enableButtons(): void {
    this.scoreButtons.forEach(button => {
      if(button.isDisabled)
      {
        button.isDisabled = false;
      }
    });
  }

  resetButtons():void {
    this.enableButtons();
    this.scoreButtons[11].isDisabled = true;
  }
}
