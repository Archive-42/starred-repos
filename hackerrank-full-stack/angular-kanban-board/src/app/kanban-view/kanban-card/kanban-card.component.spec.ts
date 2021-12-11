import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanCardComponent } from './kanban-card.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('KanbanCardComponent', () => {
    let component: TestHostComponent;
    let fixture: ComponentFixture<TestHostComponent>;
    let cards: any;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [KanbanCardComponent, TestHostComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestHostComponent);
        cards = fixture.nativeElement.querySelectorAll('.kanban_card');
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Cards should rendered correctly', () => {
        expect(cards.length).toBe(2);
    });
    it('On click of card, onCardSelected method should call with correct params', () => {
        spyOn(component, 'onCardSelected');
        cards[0].click();
        expect(component.onCardSelected).toHaveBeenCalledWith({
            cardId: 1,
        });
    });
    @Component({
        selector: 'host-component',
        template: `<app-kanban-card [card]="{id: 1, name: 'foo'}" (onCardSelected)='onCardSelected($event)'></app-kanban-card>
        <app-kanban-card [card]="{id: 2, name: 'john doe'}" (onCardSelected)='onCardSelected($event)'></app-kanban-card>`
    })
    class TestHostComponent {
        constructor() {}
        onCardSelected(params) {}
    }
});
