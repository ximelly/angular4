import { Component,QueryList,ViewChildren,ViewChild,ElementRef } from '@angular/core';
import { AudioControlComponent } from './components/audio/audioControl.component';
import { ToastMessageComponent } from './components/toastMessage/toastMessage.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChildren(AudioControlComponent) private audioControls:QueryList<AudioControlComponent>;
  @ViewChild(ToastMessageComponent) private toasta:ToastMessageComponent;
  
  //初始化默认选中左tab 
  private tabTypeNum: string;
  private payseAllAudio(){
    this.haha();
    this.audioControls.forEach(audio=>{if(audio.audioStatus=="playing"){audio.pauseAudio();}})
  }
  haha(){
    this.toasta.message="xxx";
    this.toasta.toast();
  }
}
