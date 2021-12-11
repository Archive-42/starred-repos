import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanCardComponent } from './kanban-card/kanban-card.component';
import { KanbanStageComponent } from './kanban-stage/kanban-stage.component';
import { KanbanViewComponent } from './kanban-view.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [KanbanViewComponent],
  declarations: [KanbanCardComponent, KanbanStageComponent, KanbanViewComponent]
})
export class KanbanViewModule { }
