import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanStageComponent } from './kanban-stage.component';
import { Component } from '@angular/core';
import { KanbanCardComponent } from '../kanban-card/kanban-card.component';
import { FormsModule } from '@angular/forms';

describe('KanbanStageComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let stages: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KanbanStageComponent, KanbanCardComponent, TestHostComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        stages = fixture.nativeElement.querySelectorAll('.kanban_stage');
    });

    it('should render stages correct name and cards', () => {
        expect(stages.length).toBe(2);
        expect(stages[0].querySelector('.kanban_header').innerText).toBe('Backlog');
        let cards = stages[1].querySelectorAll('.kanban_card');
        expect(cards.length).toBe(2);
        expect(cards[0].innerText).toBe('John Doe');        
    });
    it('On click of card, onCardselect method should call with correct params', () => {
        spyOn(component, 'onCardselect');
        stages[1].querySelector('.kanban_card').click();
        expect(component.onCardselect).toHaveBeenCalledWith({
            cardId: 1,
            stageId: 2,
        });
    });
    @Component({
        selector: 'host-component',
        template: `
            <app-kanban-stage *ngFor="let stage of stages" [stage]='stage' (onCardselect)='onCardselect($event)'></app-kanban-stage>
        `
    })
    class TestHostComponent {
        stages = [{
            id: 1,
            name: 'Backlog',
            cards: [{
                id: 1,
                name: 'foo'
            }],
        }, {
            id: 2,
            name: 'Development',
            cards: [{
                id: 1,
                name: 'John Doe'
            }, {
                id: 2,
                name: 'john wick'
            }],
        }];
        constructor() { }
        onCardselect(params) { }
    }
});
