import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'alert',
  template: `<ng-template [ngIf]="!isClosed">
                  <div [class]="'alert alert-' + type">
                    <ng-template [ngIf]="dismissible">
                      <span class="close" (click)="close()">X</span>
                    </ng-template>
                    <ng-content></ng-content>
                  </div>
                </ng-template>`
})
export class AlertComponent implements OnInit {
  @Input() public type: string = '';
  @Input() public dismissible: boolean = false;
  @Input() public dismissOnTimeout: number | string;

  //对外开放的事件
  @Output() public onClosed: EventEmitter<AlertComponent> = new EventEmitter<AlertComponent>();
  public isClosed: boolean = false;
  constructor() { }

  ngOnInit() {
    if(this.dismissOnTimeout){
      setTimeout(() => this.close(),parseInt(this.dismissOnTimeout as string,10));
    }
  }

  public close(): void{
    if(this.isClosed){
      return;
    }
    this.onClosed.emit(this);
    this.isClosed = true;
  }

}
