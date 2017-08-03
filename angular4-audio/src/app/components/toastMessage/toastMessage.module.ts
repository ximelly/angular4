import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ToastMessageComponent } from './toastMessage.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ ToastMessageComponent ],
    exports:    [ ToastMessageComponent ],
    entryComponents: [ ToastMessageComponent ]//此属性定义表示ng自己使用
})
export class ToastMessageModule { }