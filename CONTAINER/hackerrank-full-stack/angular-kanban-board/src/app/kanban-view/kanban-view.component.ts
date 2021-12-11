import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.css']
})
export class KanbanViewComponent implements OnInit {

  stages = [{
    id: 1,
    name: 'Backlog',
    cards: [],
  }, {
    id: 2,
    name: 'To Do',
    cards: [],
  }, {
    id: 3,
    name: 'Ongoing',
    cards: [],
  }, {
    id: 4,
    name: 'Done',
    cards: [],
  }];
  newCardName = '';
  task = '';
  selectedCardName = '';
  selectedStageIndex = -1;
  selectedCardId;
  constructor() { }

  ngOnInit() {
  }

  onAddCard() {
  this.stages[0].cards.push({
    name: this.task,
    id: this.stages[0].cards.length + 1
  });
  this.task = '';
  }

  onCardselect(card) {
    this.selectedStageIndex = card.stageId - 1;
    this.selectedCardId = card.cardId;
    this.stages[this.selectedStageIndex].cards.forEach(j => {
      if(j.id === card.cardId) {
        this.selectedCardName = j.name;
      }
    })
  }

  onMoveBackCard() {
    const actualIndex = this.selectedStageIndex;
    this.stages[actualIndex].cards = this.stages[actualIndex].cards.filter(i => {
      return (i.id !== this.selectedCardId)
    });
    this.stages[actualIndex - 1].cards.push({
      name:  this.selectedCardName,
      id: this.selectedCardId
    });
    this.selectedStageIndex = actualIndex - 1;
  }

  onMoveForwardCard() {
    const actualIndex = this.selectedStageIndex;
    this.stages[actualIndex].cards = this.stages[actualIndex].cards.filter(i => {
      return (i.id !== this.selectedCardId)
    });
    this.stages[actualIndex + 1].cards.push({
      name:  this.selectedCardName,
      id: this.selectedCardId
    });
    this.selectedStageIndex = actualIndex + 1;
  }

  onCardDelete() {
    this.stages[this.selectedStageIndex].cards = this.stages[this.selectedStageIndex].cards.filter(i => {
      return (i.id !== this.selectedCardId)
    });
    this.selectedCardName = '';
    this.selectedStageIndex = -1;
  }
}
