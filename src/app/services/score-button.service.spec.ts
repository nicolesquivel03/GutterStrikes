import { TestBed } from '@angular/core/testing';

import { ScoreButtonService } from './score-button.service';

describe('ScoreButtonService', () => {
  let service: ScoreButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be all disabled', () => {
    service.scoreButtons.forEach(button => {
      if(button.isDisabled) {
        button.isDisabled = false;
      }
    })
    service.disableAllButtons();
    service.scoreButtons.forEach(button => {
      expect(button.isDisabled).toBeTrue();
    })
  });

  it('should be all enabled', () => {
    service.scoreButtons.forEach(button => {
      if(button.isDisabled) {
        button.isDisabled = true;
      }
    })
    service.enableButtons();
    service.scoreButtons.forEach(button => {
      expect(button.isDisabled).toBeFalse();
    })
  });

  it('spare should be disabled', () => {
    service.scoreButtons.forEach(button => {
      if(button.isDisabled) {
        button.isDisabled = false;
      }
    })
    service.disableButtons('X', 1);
    expect(service.scoreButtons[11].isDisabled).toBeTrue();
  });

  it('buttons should be disabled', () => {
    service.scoreButtons.forEach(button => {
      if(button.isDisabled) {
        button.isDisabled = false;
      }
    })

    let score = '4';    
    service.disableButtons(score, 1);

    expect(service.scoreButtons[11].isDisabled).toBeFalse();
    expect(service.scoreButtons[10].isDisabled).toBeTrue();

    let scoreIndex = service.scoreButtons.findIndex(s => +s.display == (10 - +score));
    for(let i = scoreIndex; i < 10; i++) {
      expect(service.scoreButtons[i].isDisabled).toBeTrue();
    }
  });

  it('should be reset without spare enabled', () => {
    service.scoreButtons.forEach(button => {
      if(button.isDisabled) {
        button.isDisabled = true;
      }
    })

    service.resetButtons();
    
    for(let i = 0; i < 10; i++) {
      expect(service.scoreButtons[i].isDisabled).toBeFalse();
    }
    
    expect(service.scoreButtons[11].isDisabled).toBeTrue();
  });
});
