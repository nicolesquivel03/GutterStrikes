import { Component, OnInit, Input } from '@angular/core';
import { Frame } from '../models/frame';
import { FrameService } from '../services/frame.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.css']
})
export class FrameComponent implements OnInit {
  @Input() frame:Frame;

  constructor(private frameService: FrameService) { }

  ngOnInit(): void {
  }
}
