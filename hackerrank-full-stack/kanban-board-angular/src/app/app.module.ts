
import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { KanbanBoard } from './kanbanBoard/kanbanBoard.component';
//Angular Router Module
import { RouterModule, Router } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';


@NgModule({
  declarations: [
    AppComponent,
    KanbanBoard
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterTestingModule,
    RouterModule.forRoot([
      { path:'', component: KanbanBoard }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
