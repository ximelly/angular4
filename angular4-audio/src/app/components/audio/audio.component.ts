import { Component,OnInit,ViewChild,ElementRef,EventEmitter,Input,Output,DoCheck} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: "./audio.component.html",
  styleUrls:['./audio.component.css']
})
export class AudioComponent implements OnInit,DoCheck {
  @Input() public audiosrc: string = '';
  @ViewChild('audioElement') _audio: ElementRef;
  private allTime:number=0;//音频总时长
  public preload:string="none";//是否预加载
  public loop:boolean=false;//是否循环播放
  public autoplay:boolean=false;//是否自动播放
  private currentTime:number=0;//播放时间
  private progross:string;//播放进度百分比
  private audioStatus:string="noload";//音频播放状态,初始为未加载
  //对外开放的事件
  @Output() public onPlayAudio: EventEmitter<AudioComponent> = new EventEmitter<AudioComponent>();
  @Output() public onPauseAudio: EventEmitter<AudioComponent> = new EventEmitter<AudioComponent>();
  constructor(){ }
  ngOnInit() {
  }
  ngDoCheck(): void{}

  public playAudio(): void{
    this._audio.nativeElement.play();
    this.audioStatus="playing";
  }
  public pauseAudio(): void{
    this.onPauseAudio.emit(this);
    this._audio.nativeElement.pause();
    this.audioStatus="pause";
  }
  
  public handleButton(): void{
    if(this._audio.nativeElement.paused){
      if(this._audio.nativeElement.preload=="none"&&this.audioStatus=="noload"){
        this._audio.nativeElement.load();
        this.audioStatus="loading";
      }else{//预加载或者暂停状态，直接播放
        this.playAudio();
      }
    }else{
      this.pauseAudio();
    }
  }
  canPlay(){//音频加载成功
    this.playAudio();
  }
  audioError(){//音频加载失败
    this.audioStatus="error";
  }
  currentTimeChange(){//监听播放时间变化
    this.currentTime=parseInt(this._audio.nativeElement.currentTime);
    this.progross=(-1!=(JSON.stringify(this.currentTime/this.allTime).indexOf(".")))?(JSON.stringify(Math.ceil(this.currentTime*100/this.allTime)) + "%"):"0%";
  }
  getDuration(){//获取音频总时长
    this.allTime=parseInt(this._audio.nativeElement.duration);
  }
}
