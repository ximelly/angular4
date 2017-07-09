import { Component, OnInit,ViewChild,ElementRef,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-audio',
  template: `<audio [src]="audiosrc" controls preload="none" #audioElement></audio>
            <div><span *ngIf="allTime">总时间：{{allTime}}</span>
            <span *ngIf="currentTime">当前播放时间：{{currentTime}}'</span>
            <span *ngIf="progross">播放进度：{{progross}}</span></div>
            <div>
              <button (click)="playAudio()">播放</button>
              <button (click)="pauseAudio()">暂停</button>
            </div>
            <br/>
            `
})
export class AudioComponent implements OnInit {
  @Input() public audiosrc: string = '';
  @ViewChild('audioElement') _audio: ElementRef;
  private allTime:number;
  private currentTime:number;
  private progross:string;
  //对外开放的事件
  @Output() public onPlayAudio: EventEmitter<AudioComponent> = new EventEmitter<AudioComponent>();
  @Output() public onPauseAudio: EventEmitter<AudioComponent> = new EventEmitter<AudioComponent>();
  constructor() { }

  ngOnInit() {
  }

  public playAudio(): void{
    this._audio.nativeElement.play();
    setTimeout(()=>{
      this.allTime=parseInt(this._audio.nativeElement.duration);
    },500);
    setInterval(()=>{
      this.currentTime=parseInt(this._audio.nativeElement.currentTime);
      this.progross=(-1!=(JSON.stringify(this.currentTime/this.allTime).indexOf(".")))?(JSON.stringify(Math.ceil(this.currentTime*100/this.allTime)) + "%"):"0%";      
    },500)
  }
  public pauseAudio(): void{
    this.onPauseAudio.emit(this);
    this._audio.nativeElement.pause();
  }

}
