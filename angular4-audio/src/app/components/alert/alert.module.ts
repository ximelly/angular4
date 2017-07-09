import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AlertComponent } from './alert.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ AlertComponent ],
    exports:    [ AlertComponent ],
    entryComponents: [ AlertComponent ]//此属性定义表示ng自己使用
})
export class AlertModule { }