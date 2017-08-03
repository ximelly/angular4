import { Component,EventEmitter,AfterViewInit,ElementRef,Input,Output} from '@angular/core';

@Component({
  selector: 'audioSimple',
  template: `<div class="audioThree">
              <audio [src]="audiosrc" controls [preload]="preload" [loop]='loop' [autoplay]="autoplay"></audio>
              <div (click)="handleButton()">
                  <div class="voiceArrow"></div>
                  <div class="voiceMain">
                      <span class="message" *ngIf='isLoading'>加载中...</span>
                      <span class="message" *ngIf='loadFailed'>加载失败...</span>
                      <span class="voice" [class.speak]="voiceOn"></span>
                      <div class="voiceOn" *ngIf='firstLload'></div>
                  </div>
              </div>
          </div>`,
  styles:[`
    audio{display:none;}
    .audioThree{position:relative;padding-right:15px;box-sizing: border-box;}
    .audioThree .voiceMain{
        margin-left:7px;
        max-width:100%;
        min-width:20%;
        height:34px;
        border-radius: 5px;
        color:#fff;
        line-height:34px;
        padding-left:25px;
        background:#79c03a;
        position:relative;
        box-sizing: border-box;    
    }
    .audioThree .voice {
        position:absolute;
        left:10px;
        top:0;
        margin-right: 10px;
        width: 8px;
        height: 34px;
        background-size: 100% auto;
        background-position:center center;
        background-repeat: no-repeat;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAASCAYAAABrXO8xAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjcyMjhDNTg1QjA3NzExRTZCQ0E5Q0Q5QjY0MDI5QjY0IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjcyMjhDNTg2QjA3NzExRTZCQ0E5Q0Q5QjY0MDI5QjY0Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NzIyOEM1ODNCMDc3MTFFNkJDQTlDRDlCNjQwMjlCNjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NzIyOEM1ODRCMDc3MTFFNkJDQTlDRDlCNjQwMjlCNjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6s9UC7AAABy0lEQVR42mST30rUURDHzzn9jE1pNTHQG5XtQghBCQnFm3qF3qCX8H18DG+FEhGjIiK88B/hXrRLhe2qhTt+Zs6f/a0dmDPfMzNnZs7MHP9s6bmLy9suAjIocG/ntBrQFqJt+Flw95aPt2rnAm+gX9BLPYShx2xhglY2qC1V7LKvwR+GGMGXq5G8pvVGRCallivriNMVohekKuOQcn2VuQV9I5keLlbg9ff3YSfQskrfQq+jUswIgwHgPbQhyZUmFoK9uY3FBDCcctyMkVWBkRnId/YmaVeSqp2og3xcUzxA3kQ2E9PxpuVtl4C/0LTPDiP9wFYjumvElyincvFSgf7Abinek9jPTIGW+EaF8gHGj6B+aYYVRBpaNCL3R1ultu6fXlyMgtAxbvWx648BY/CuK2UzB09BPXX9CvDFucHvXL0UdxoagPr18QBxUXoVNjtI2yXLkqpOjnxWR9aoMgiiEW90cr4Cfg4vmNkc1WuR2r6X7FLl1skFwHmaGHHDATCrWQIcgi6k1Nks59UpcK8azd/l0fpEJh/TJyufgGasIz9G2g33xz99pYErP1FyNCosq0jf6burkb/3X+yaO6Hf3n/QIVeXdwIMACTtu87KUH9pAAAAAElFTkSuQmCC");
    }
    .audioThree .voice.speak {
        animation: voiceOn 2s infinite;
    }
    .audioThree .voiceArrow {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 7px;
        height: 34px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAALCAYAAABCm8wlAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyM2I2MWI3NC05ZGQ3LTRiOGYtODI2My03MmZjZjRiMWY5YjkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUQ2MzA1MTdCMUVDMTFFNkI5NDRCMUQzNDcyNkQ0NTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUQ2MzA1MTZCMUVDMTFFNkI5NDRCMUQzNDcyNkQ0NTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTFhMzg1ODktMzhjMC00MDkyLWIxODQtM2VkOWU1OTcwZTcwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIzYjYxYjc0LTlkZDctNGI4Zi04MjYzLTcyZmNmNGIxZjliOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PhDgrWYAAABuSURBVHjaYiw/pMuAB1gz4ZGUAeJ1THgk9wKxGDYFDkB8EojVQBwWqCA/EFsAcTIQhwAxI0w1SEEmEPcDMTs2u0BW5OKShCkA6f6PT8FsIA4G4ke4FIDAeiDWAOJ0ID6DrIARR0iqALEHCAMEGAA5iw6W3576MwAAAABJRU5ErkJggg==") no-repeat right 10px;
        background-size: 100% auto;
    }
    .audioThree .voiceOn{
        position: absolute;
        opacity: .7;
        right:-10px;
        top: 0;
        width: 4px;
        height: 4px;
        border-radius: 2px;
        background: red;
    }
    @keyframes voiceOn {
        0% {
            -webkit-transform:scale(0.7);
        }
        50% {
            -webkit-transform:scale(1.1);
        }
        100%{
          -webkit-transform:scale(0.7);
        }
    }
    @-webkit-keyframes voiceOn {
        0% {
            -webkit-transform:scale(0.7);
        }
        50% {
            -webkit-transform:scale(1.1);
        }
        100%{
          -webkit-transform:scale(0.7);
        }
    }
  `]
})
export class AudioSimpleComponent implements AfterViewInit{
    @Input() audiosrc: string;//音频资源地址
    @Input() autoplay:boolean=false;//是否自动播放
    @Input() preload:string="none";//是否预加载
    @Input() loop:boolean=false;//是否循环播放
    //@Input() message:string='立即播放';//音频上的文字信息
    @Input() bgColor:string="#79c03a";//音频背景色
    private _audio:HTMLMediaElement;//_audio元素
    public audioStatus:string="noload";//音频播放状态,初始为未加载
    private voiceOn:boolean=false;//音频是否正在播放
    //private saveMessage:string;//保存音频初始化文案
    private firstLload:boolean=true;//音频未播放状态
    private isLoading:boolean=false;//是否正在加载中
    private loadFailed:boolean=false;//是否正在加载中
    //对外开放的事件
    @Output() public onPlayAudio: EventEmitter<AudioSimpleComponent> = new EventEmitter<AudioSimpleComponent>();
    @Output() public onPauseAudio: EventEmitter<AudioSimpleComponent> = new EventEmitter<AudioSimpleComponent>();
    @Output() public onEndAudio: EventEmitter<AudioSimpleComponent> = new EventEmitter<AudioSimpleComponent>();
    constructor(private elementRef: ElementRef) { }
    ngAfterViewInit() {
    let _this=this;
    this._audio=<HTMLMediaElement>this.elementRef.nativeElement.querySelector("audio");
    //this.saveMessage=this.message;
    this._audio.addEventListener("canplaythrough",function(){
      _this.canPlay();
    })
    this._audio.addEventListener("error",function(){
      _this.audioError();
    })
    this._audio.addEventListener("ended",function(){
      _this.end();
    })
    }

    public playAudio(): void{
      this.onPlayAudio.emit(this);
      this._audio.play();
      this.voiceOn=true;
    }
    public pauseAudio(): void{
      this.onPauseAudio.emit(this);
      this._audio.pause();
      this.voiceOn=false;
    }
    handleButton(): void{
      if(this._audio.paused){
        if(this._audio.preload=="none"&&this.audioStatus=="noload"){
            this._audio.load();
            this.isLoading=true;
            this.loadFailed=false;
        }else{
            this.playAudio();
        }
      }else{
        this.pauseAudio();
      }
    }
    canPlay(){//音频加载成功
        this.audioStatus="loaded";
        if(this.isLoading){
            this.isLoading=false;
            this.playAudio();
        }
    }
    audioError(){//音频加载失败
        this.isLoading=false;
        this.loadFailed=true;
    }
    
    end(){//监听音乐播放完毕
        this.voiceOn=false;
        this.onEndAudio.emit(this);
    }
}
