import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-kanban-stage',
  templateUrl: './kanban-stage.component.html',
  styleUrls: ['./kanban-stage.component.css']
})
export class KanbanStageComponent implements OnInit {

  @Input() stage: any;
  @Output() onCardselect: EventEmitter<Object> = new EventEmitter<Object>();

  constructor() {}

  ngOnInit() {
  }
  onCardSelected(data) {
    this.onCardselect.emit({
      cardId: data.cardId,
      stageId: this.stage.id
    });
  }

}
