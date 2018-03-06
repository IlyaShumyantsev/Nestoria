import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule, Jsonp, Response } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ResultComponent } from './result/result.component';
import { FavesComponent } from './faves/faves.component';
import { DetailsComponent } from './details/details.component';
import { ListService } from './shared/list.service';

const appRoutes: Routes = [
  { path: 'faves', component: FavesComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '', component: SearchComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    JsonpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCJ5t0y5LTCTbDMnFNuUNZlX-5SeTZBTL4',
      libraries: ["places"],
      language: "en"
    })
  ],
  declarations: [
    AppComponent,
    SearchComponent,
    ResultComponent,
    FavesComponent,
    DetailsComponent
  ],
  providers: [
    ListService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
