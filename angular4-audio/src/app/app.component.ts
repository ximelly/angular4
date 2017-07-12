import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  public alertType: string = 'success';
  public audiosrc=[{
    src:"https://img.mama100.cn/mp3/site/mobile/specialist/201706/1498455622510.mp3",
    preload:"auto",
    autoplay:false,
    loop:false,
    type:1
  },{
    src:'./assets/aaa.mp3',
    preload:"none",
    autoplay:false,
    loop:false,
    type:1,
    allTime:500
  },{
    src:'./assets/bbb.mp3',
    preload:"none",
    autoplay:false,
    loop:true,
    type:2,
    message:"立即播放"
  },{
    src:'./assets/bbb.mp3',
    preload:"none",
    autoplay:false,
    loop:true,
    type:2,
    bgColor:"blue",
    message:"点击播放"
  },{
    src:'./assets/bbb.mp3',
    preload:"none",
    autoplay:false,
    loop:false,
    type:2,
    bgColor:"gray",
    message:"当前音频不可用"
  },{
    src:'./assets/bbb.mp3',
    preload:"none",
    autoplay:false,
    loop:false,
    type:3,
    allTime:200,
    scale:0.3
  },{
    src:'./assets/aaa.mp3',
    preload:"none",
    autoplay:false,
    loop:false,
    type:3,
    allTime:500,
    scale:0.3
  }];
  public receive(object){
    console.log(object);
  }
  public audioPause(object){
    console.log(object._audio.nativeElement.currentTime);
  }
}
