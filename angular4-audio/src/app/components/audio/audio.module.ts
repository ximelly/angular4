import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AudioMessageComponent } from './audioMessage.component';
import { AudioControlComponent } from './audioControl.component';
import { AudioSimpleComponent } from './audioSimple.component';
@NgModule({
    imports: [ CommonModule ],
    declarations: [AudioSimpleComponent,AudioMessageComponent,AudioControlComponent ],
    exports:    [ AudioSimpleComponent,AudioMessageComponent,AudioControlComponent ],
    entryComponents: [ AudioSimpleComponent,AudioMessageComponent,AudioControlComponent ]//此属性定义表示ng自己使用
})
export class AudioModule { }