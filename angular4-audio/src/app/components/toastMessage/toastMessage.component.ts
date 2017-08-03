import { Component,OnChanges,ElementRef,AfterViewInit,EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'toastMessage',
  template: `<div class="toastMessage" id="toastMessage" [style.visibility]="show?'visible':'hidden'" [style.left]="leftPx" [style.opacity]="opacity/100" [style.top]="topPx">{{message}}</div>`,
  styles:[`
      .toastMessage{width:200px;height:auto;padding:15px;font-size:12px;line-height:20px;box-sizing:border-box;background:#000;border-radius:7px;opacity:0;text-align:center;color:#fff;position:fixed;z-index:300;}
      
      `]
})
export class ToastMessageComponent implements AfterViewInit{
  @Input() message: string = '';//显示信息
  @Input() time: number =100;
  @Input() show:boolean=false;
  @Output() hideToast: EventEmitter<ToastMessageComponent> = new EventEmitter<ToastMessageComponent>();
  private leftPx:string;
  private topPx:string;
  private opacity:number=0;
  constructor(private elementRef: ElementRef) { }
  ngAfterViewInit(){
    this.initPosition();
  }
  toast(){
    if(!this.show){
      this.show=true;
      this.fadeIn();
    }
  }
  fadeIn(){
      setTimeout(() => {
        if(this.opacity<100){
          this.opacity+=5;
          this.fadeIn();
        }else{
          this.fadeOut();
        }
      },this.time);
  }

  fadeOut(){
      setTimeout(() => {
        if(this.opacity>=5){
          this.opacity=this.opacity-5;
          this.fadeOut();
        }else{
          this.show=false;
          this.hideToast.emit(this);
        }
      },this.time);
  }
  initPosition(){
      let toast=<HTMLElement>this.elementRef.nativeElement.querySelector("#toastMessage");
      this.leftPx= (document.documentElement.clientWidth/2-toast.offsetWidth/2)+"px";
      this.topPx= (document.documentElement.clientHeight/2-toast.offsetHeight/2)+"px";
  }
}
