import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule, Jsonp, Response } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { ListService } from './shared/list.service';

@NgModule({
  imports: [
    BrowserModule,
    JsonpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
