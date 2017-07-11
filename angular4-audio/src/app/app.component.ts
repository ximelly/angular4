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
    loop:false
  },{
    src:'./assets/aaa.mp3',
    preload:"none",
    autoplay:true,
    loop:false
  },{
    src:'./assets/bbb.mp3',
    preload:"none",
    autoplay:false,
    loop:true
  }];
  public receive(object){
    console.log(object);
  }
  public audioPause(object){
    console.log(object._audio.nativeElement.currentTime);
  }
}
