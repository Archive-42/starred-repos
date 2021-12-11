import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { KanbanViewModule } from './kanban-view/kanban-view.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    KanbanViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
