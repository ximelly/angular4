import { Component,OnInit,ViewChild,ElementRef,EventEmitter,Input,Output,DoCheck} from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: "./audio.component.html",
  styleUrls:['./audio.component.css']
})
export class AudioComponent implements OnInit,DoCheck {
  @Input() public audiosrc: string = '';
  @ViewChild('audioElement') _audio: ElementRef;
  private allTime:number=0;//当前音频总时长
  public preload:string="none";//是否预加载
  public loop:boolean=false;//是否循环播放
  private currentTime:number=0;//当前播放时间
  private progross:string;//当前播放进度百分比
  private audo_loading:boolean=false;
  private audo_error:boolean=false;
  private audo_status:boolean=false;
  //对外开放的事件
  @Output() public onPlayAudio: EventEmitter<AudioComponent> = new EventEmitter<AudioComponent>();
  @Output() public onPauseAudio: EventEmitter<AudioComponent> = new EventEmitter<AudioComponent>();
  constructor(){ }
  ngOnInit() {
  }
  ngDoCheck(): void{}

  public playAudio(): void{
    this._audio.nativeElement.play();
    this.audo_status=true;
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
    this.audo_status=false;
  }
  
  public handleButton(): void{
    console.log(this._audio)
    if(!this._audio.nativeElement.preload){
      return;
    }
    if(this._audio.nativeElement.paused){
      this.playAudio();
    }else{
      this.pauseAudio();
    }
  }

}
