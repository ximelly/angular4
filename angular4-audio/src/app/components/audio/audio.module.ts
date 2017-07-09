import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AudioComponent } from './audio.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ AudioComponent ],
    exports:    [ AudioComponent ],
    entryComponents: [ AudioComponent ]//此属性定义表示ng自己使用
})
export class AlertModule { }