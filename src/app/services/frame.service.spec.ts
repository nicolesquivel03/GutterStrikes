import { TestBed } from '@angular/core/testing';

import { FrameService } from './frame.service';

describe('FrameService', () => {
  let service: FrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FrameService);
    let frames = [
      { id: 1, name: 'Frame 1', score1: '4', score2: '3', score3: '', total: 7, isStrike: false, isSpare: false},
      { id: 2, name: 'Frame 2', score1: 'X', score2: '', score3: '', total: 20, isStrike: true, isSpare: false},    
      { id: 3, name: 'Frame 3', score1: '2', score2: '1', score3: '', total: 23, isStrike: false, isSpare: false},    
      { id: 4, name: 'Frame 4', score1: '', score2: '', score3: '', total: 0, isStrike: false, isSpare: false},    
      { id: 5, name: 'Frame 5', score1: '', score2: '', score3: '', total: 0, isStrike: false, isSpare: false},    
      { id: 6, name: 'Frame 6', score1: '', score2: '', score3: '', total: 0, isStrike: false, isSpare: false},    
      { id: 7, name: 'Frame 7', score1: '', score2: '', score3: '', total: 0, isStrike: false, isSpare: false},    
      { id: 8, name: 'Frame 8', score1: '', score2: '', score3: '', total: 0, isStrike: false, isSpare: false},    
      { id: 9, name: 'Frame 9', score1: '', score2: '', score3: '', total: 0, isStrike: false, isSpare: false},    
      { id: 10, name: 'Frame 10', score1: '', score2: '', score3: '', total: 0, isStrike: false, isSpare: false}
    ];
    service.frames = frames;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be reset', () => {
    service.resetFrames();

    service.frames.forEach(frame => {
      expect(frame.score1).toEqual('');
      expect(frame.score2).toEqual('');
      expect(frame.score3).toEqual('');
      expect(frame.total).toEqual(0);
      expect(frame.isSpare).toBeFalse();
      expect(frame.isStrike).toBeFalse();
    });
  });

  it('should add second score', () => {

    service.addScore('3', 3);

    expect(service.frames[3].score1).toEqual('3');
    expect(service.frames[3].score2).toEqual('');
    expect(service.frames[3].score3).toEqual('');
    expect(service.frames[3].total).toEqual(0);
    expect(service.frames[3].isSpare).toBeFalse();
    expect(service.frames[3].isStrike).toBeFalse();
  });

  it('should add second score', () => {
    service.frames[3].score1 = '3';

    service.addScore('6', 3);

    expect(service.frames[3].score1).toEqual('3');
    expect(service.frames[3].score2).toEqual('6');
    expect(service.frames[3].score3).toEqual('');
    expect(service.frames[3].total).toEqual(0);
    expect(service.frames[3].isSpare).toBeFalse();
    expect(service.frames[3].isStrike).toBeFalse();
  });

  it('should add third score', () => {
    service.frames[9].score1 = 'X';
    service.frames[9].score2 = 'X';

    service.addScore('6', 9);

    expect(service.frames[9].score1).toEqual('X');
    expect(service.frames[9].score2).toEqual('X');
    expect(service.frames[9].score3).toEqual('6');
    expect(service.frames[9].total).toEqual(0);
    expect(service.frames[9].isSpare).toBeFalse();
    expect(service.frames[9].isStrike).toBeFalse();
  });

  it('should add strike', () => {

    service.addScore('X', 5);

    expect(service.frames[5].score1).toEqual('X');
    expect(service.frames[5].score2).toEqual('');
    expect(service.frames[5].score3).toEqual('');
    expect(service.frames[5].total).toEqual(0);
    expect(service.frames[5].isSpare).toBeFalse();
    expect(service.frames[5].isStrike).toBeTrue();
  });

  it('should add spare', () => {
    service.frames[5].score1 = '3';

    service.addScore('/', 5);

    expect(service.frames[5].score1).toEqual('3');
    expect(service.frames[5].score2).toEqual('/');
    expect(service.frames[5].score3).toEqual('');
    expect(service.frames[5].total).toEqual(0);
    expect(service.frames[5].isSpare).toBeTrue();
    expect(service.frames[5].isStrike).toBeFalse();
  });

  it('should update total', () => {
    let index = 3;
    service.frames[index].score1 = '3';
    service.frames[index].score2 = '/';
    service.frames[index].isSpare = true;

    service.updateScoreTotals(index+1);

    expect(service.frames[index].score1).toEqual('3');
    expect(service.frames[index].score2).toEqual('/');
    expect(service.frames[index].score3).toEqual('');
    expect(service.frames[index].total).toEqual(33);
    expect(service.frames[index].isSpare).toBeTrue();
    expect(service.frames[index].isStrike).toBeFalse();
  });
});
