import { Component, OnInit } from '@angular/core';
import { SCOREBUTTONS } from '../models/scoreButtons';
import { Scoresheet } from '../models/scoresheet';
import { FrameService } from '../services/frame.service';
import { ScoreButtonService } from '../services/score-button.service';
import { FRAMES } from '../models/frames';

@Component({
  selector: 'app-scoresheet',
  templateUrl: './scoresheet.component.html',
  styleUrls: ['./scoresheet.component.css']
})
export class ScoresheetComponent implements OnInit {
  frames = FRAMES;
  buttons = SCOREBUTTONS;
  scoresheet: Scoresheet;
  breakpoint: number;

  constructor(private frameService: FrameService, private scoreButtonService: ScoreButtonService) { }

  ngOnInit(): void {
    this.scoresheet = { currentFrameId: 0, currentScoreIndex: 1 };
    this.onClickReset();
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 6;
  }

  onClickScore(score: string): void {
    let frameIndex = this.scoresheet.currentFrameId;
    this.frameService.addScore(score, frameIndex);
    
    if(frameIndex == 9) {
      if(this.scoresheet.currentScoreIndex == 1) {
        this.scoreButtonService.disableButtons(score, this.scoresheet.currentScoreIndex);
        this.scoresheet.currentScoreIndex = 2;
      } else if (this.scoresheet.currentScoreIndex == 2 && (this.frames[frameIndex].isStrike || this.frames[frameIndex].isSpare)) {
        this.scoreButtonService.enableButtons();
        this.scoresheet.currentScoreIndex = 3;
        this.scoreButtonService.disableButtons(score, this.scoresheet.currentScoreIndex);
      }
      else {
        this.scoresheet.currentFrameId++;
        this.scoresheet.currentScoreIndex = 1;
        this.frameService.updateScoreTotals(this.scoresheet.currentFrameId);
        this.scoreButtonService.disableAllButtons();
      }
    } else if(this.frames[frameIndex].isStrike || this.scoresheet.currentScoreIndex == 2) {
      this.scoreButtonService.enableButtons();
      this.scoreButtonService.disableButtons(score, this.scoresheet.currentScoreIndex);
      this.scoresheet.currentFrameId++;
      this.scoresheet.currentScoreIndex = 1;
      this.frameService.updateScoreTotals(this.scoresheet.currentFrameId);
    } else {
      this.scoreButtonService.disableButtons(score, this.scoresheet.currentScoreIndex);
      this.scoresheet.currentScoreIndex = 2;
    }
  }

  onClickReset(): void {
    this.scoreButtonService.resetButtons();
    this.frameService.resetFrames();
    this.scoresheet.currentFrameId = 0;
    this.scoresheet.currentScoreIndex = 1;
  }
}
