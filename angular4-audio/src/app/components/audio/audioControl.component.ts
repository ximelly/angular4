import { Component,ElementRef,AfterViewInit,EventEmitter,Input,Output} from '@angular/core';

@Component({
  selector: 'audioControl',
  template: ` <div class="audioOne">
                <audio [src]="audiosrc" controls [preload]="preload" [loop]='loop' [autoplay]="autoplay"></audio>
                <div class='audioWrap'>
                    <div class="handleButton" (click)="handleButton()">
                        <span class="loading" *ngIf="audioStatus=='loading'" ></span>
                        <span class="error" *ngIf="audioStatus=='error'"></span>
                        <span class="play" *ngIf="audioStatus=='playing'"></span>
                        <span class="pause" *ngIf="audioStatus=='noload'||audioStatus=='pause'"></span>
                    </div>
                    <div class="progress">
                        <div class="bar_bg" (click)="changeCurrent()" id="progressBar">
                            <div class="loadBar" [style.width.%]="loadrogross"></div>
                            <div class="currentBar" [style.width.%]="progross"></div>
                            <div class="barCircle" [style.left.%]="progross"><div></div></div>
                        </div>
                        <div class="audioTime">
                            <div class="currentTime">{{currentTime*1000|date:"mm:ss"}}</div>
                            <div class="allTime">{{allTime*1000|date:"mm:ss"}}</div>
                        </div>
                    </div>
                </div>
            </div>`,
  styles:[`
    audio{display:none;}
    .audioOne{padding-right:4px;}
    .audioOne .audioWrap{padding:0 12px 0 50px;background:#F8F8F8;box-shadow:2px 2px 2px #e8e4e4;height:50px;position:relative;box-sizing:border-box;}
    .audioOne .handleButton{box-sizing:border-box;position:absolute;left:10px;top:7px;width:30px;height:30px;border:1px solid #ed6c00;border-radius: 100%;}
    .audioOne .handleButton span{display: block;height:100%;background-position: center center;background-repeat: no-repeat;background-size:auto 50%;}
    .audioOne .handleButton span.play{background-size:auto 60%;}
    .audioOne .loading{background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAclBMVEVMaXHzbyLycCLycCLycCLybyHxbST0cSH/cCn/YxjybyLycCHzcCLycCLxcCLycCLycCLxcCLycCLycCHycCHzcCLzcCLybyLxcCPzcCLycCLxbST0cCD0biLxcSLycCLycCLxcCL0ciHycCLycCHycCJbDjEaAAAAJXRSTlMApqrc/M8LFwYDlDe49FzV+G3HsIxS4Z4kZegRMEOBePJLL72hvY7BbgAAAMhJREFUeNqdk2kPgjAMhivXuEFUEFDx6v//i7abYVymic+XNXnXY10LI+ch7TwsXaftYUWS4kgZq7kYxDjj3k5V5X/dCr/2jNmEVnWRyOIk4kCPAzJOBIawQmJn8110sCMYbmR7e5gQOqxfzYNKMrVqiTiBq8M3HBkWBDUi5mT05JwpWHIiuaIz11WsKaggOt4kPwG23FNzq4Mtkpw7kyG+4Ddc95+yEFwoTXiY0BahqcKXCB8qjIMwTMIoCoMsr4G8RHYFcbmCH9k2JVaFntcsAAAAAElFTkSuQmCC");}
    .audioOne .error{background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAGFBMVEVMaXHybyHycCLycSHycCLycCLycSLycCIT5w/wAAAAB3RSTlMATvpN8ethOPUrVgAAAFlJREFUeNq1kjkKwDAMBGUd3v//OE1giGDLuFrN4ANLcXsq1qrpGy3l+fKTUscIA9dEJQae9QYMJdEXdjthGfgy8GXgy8C98Ef5y/1z4X/9m22Uba0dBjs+D3wzBK3DbG3lAAAAAElFTkSuQmCC");}
    .audioOne .pause{background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAUVBMVEVMaXH0cATtbQD0cAT0bwX1cAX0cQD0cAX1cQX/gADzcAb1cAX2cgXxcQfzcQX1bwX0cQT0cAX0cAX0cAX0cAT0cAb1bwX0cAX1cAX0cAX0cAXdbybDAAAAGnRSTlMAtQ51ztoW+i8FhPM4JGqVSOzBouRZZPKS649I2v0AAAB1SURBVHjapdM5FoAgDEVRB4bgiOKY/S/Uk4Lyp4ivvQ0Q0kj93VKDi8zx6SCz9F4KS24CXCtBZR77hFnyGXCtnVXmOHSYpeMEXNtJZY5rwCxtS8IsOVKZ/R92pB/NerGdjI8qI7EO1GfzZyrB+pHfy7hEeAU/EiYr5VkY8XUAAAAASUVORK5CYII=");}
    .audioOne .play{background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAYCAMAAAAS21dbAAAAD1BMVEVMaXH0cAXzbwb1cAX0cAV5whrwAAAABHRSTlMA+4X09iagoAAAACtJREFUeNrt0CESAAAIAkFR/v9mZ8SkyS7ptmIebpoShNRJUqp837z+nH8nkZkCFeScQsgAAAAASUVORK5CYII=");}
    .audioOne .progress{box-sizing:border-box;height:100%;padding-top:12px;}
    .audioOne .bar_bg{width:100%;height:6px;border-radius: 5px;background:#e7e7e7;margin-bottom:7px;position:relative;}
    .audioOne .audioTime>div{width:50%;float:left;font-size: 12px;color:#636666}
    .audioOne .audioTime>div:last-of-type{text-align: right;}
    .audioOne .currentBar,.audioOne .loadBar{width:0;height:100%;background:#ed6c00;border-radius: 5px;}
    .audioOne .currentBar{position:absolute;top:0;left:0;z-index:2;}
    .audioOne .loadBar{background:#f9b085;}
    .audioOne .barCircle{margin-left:-6px;width:12px;height:12px;border-radius:12px;background:#fff;box-shadow:0px 1px 1px #e7e7e7;box-sizing:border-box;position:absolute;left:0;top:-3px;z-index:5;}
    .audioOne .barCircle>div{width:4px;height:4px;background:#ed6c00;margin:4px auto 0;border-radius: 4px;}
  `]
})
export class AudioControlComponent implements AfterViewInit{
  @Input() audiosrc: string;//音频资源地址
  @Input() autoplay:boolean=false;//是否自动播放
  @Input() preload:string="none";//是否预加载
  @Input() loop:boolean=false;//是否循环播放
  private _audio:HTMLMediaElement;//_audio元素
  private progressBar:HTMLElement;//进度条
  private currentTime:number=0;//播放时间
  private allTime:number=0;//音频总时长
  private progross:number=0;//播放进度百分比
  private loadrogross:number=0;//音频加载百分比
  public audioStatus:string="noload";//音频播放状态,初始为未加载
  //对外开放的事件
  @Output() public onPlayAudio: EventEmitter<AudioControlComponent> = new EventEmitter<AudioControlComponent>();
  @Output() public onPauseAudio: EventEmitter<AudioControlComponent> = new EventEmitter<AudioControlComponent>();
  @Output() public onEndAudio: EventEmitter<AudioControlComponent> = new EventEmitter<AudioControlComponent>();
  constructor(private elementRef: ElementRef) { }
  ngAfterViewInit(){
    let _this=this;
    this._audio=<HTMLMediaElement>this.elementRef.nativeElement.querySelector("audio");
    this.progressBar=<HTMLElement>this.elementRef.nativeElement.querySelector("#progressBar");
    this._audio.addEventListener("loadedmetadata",function(){
      _this.getDuration();
    })
    this._audio.addEventListener("canplaythrough",function(){
      _this.canPlay();
    })
    this._audio.addEventListener("error",function(){
      _this.audioError();
    })
    this._audio.addEventListener("timeupdate",function(){
      _this.currentTimeChange();
    })
    this._audio.addEventListener("ended",function(){
      _this.end();
    })
  }
  public playAudio(): void{
    this.onPlayAudio.emit(this);
    this._audio.play();
    this.audioStatus="playing";
  }
  public pauseAudio(): void{
    this.onPauseAudio.emit(this);
    this._audio.pause();
    this.audioStatus="pause";
  }
  handleButton(): void{
    if(this._audio.paused){
        if((this._audio.preload=="none"&&this.audioStatus=="noload")||this.audioStatus=="error"){
          this._audio.load();
          this.audioStatus="loading";
        }else{//预加载或者暂停状态，直接播放
          this.playAudio();
        }
      }else{
        this.pauseAudio();
      }
  }
  canPlay(){//音频加载成功
    if(this.audioStatus=="noload"&&this.autoplay==false){//音频准备好后，若没有点击播放按钮&&未设置自动播放则不播放
      return;
    }else{
      this.playAudio();
    }
  }
  audioError(){//音频加载失败
    this.audioStatus="error";
  }
  currentTimeChange(){//监听播放时间变化
    this.currentTime=this._audio.currentTime;
    this.progross=this.currentTime*100/this.allTime;
    setTimeout(()=>{
       this.getFirstBuffRange();
    },100)
  }
  getDuration(){//获取音频总时长
     this.allTime=this._audio.duration;
  }
  end(){//监听音乐播放完毕
    this.audioStatus="pause";
    this.progross=0;
    this.onEndAudio.emit(this);
  }
  changeCurrent(event){
    if(!this._audio.paused){
      let e = event || window.event;
      let mayTime=Math.floor(this.currentTime*((e.clientX-this.progressBar.offsetLeft)*100/this.progressBar.offsetWidth)/this.progross);
      if(this._audio.buffered.end(0)>=mayTime){
        this._audio.currentTime=mayTime;
      }
    }
  }
  getFirstBuffRange(){//获取缓存区域
    this.loadrogross=this._audio.buffered.end(0)*100/this.allTime>100?100:this._audio.buffered.end(0)*100/this.allTime;
  } 
}
