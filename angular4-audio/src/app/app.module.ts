import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from "./components/alert/alert.module";
import { AppComponent } from './app.component';
import { AudioComponent } from './components/audio/audio.component';

@NgModule({
  declarations: [
    AppComponent,
    AudioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
