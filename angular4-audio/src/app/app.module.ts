import { UploadImgComponent } from './components/uploadImg/uploadImg.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastMessageModule } from "./components/toastMessage/toastMessage.module";
import { AudioModule } from './components/audio/audio.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ToastMessageModule,
    AudioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
