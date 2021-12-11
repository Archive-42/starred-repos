import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { KanbanViewComponent } from './kanban-view.component';
import { KanbanStageComponent } from './kanban-stage/kanban-stage.component';
import { FormsModule } from '@angular/forms';
import { KanbanCardComponent } from './kanban-card/kanban-card.component';
import { ChangeDetectionStrategy, NgZone } from '@angular/core';

describe('KanbanViewComponent', () => {
    let component: KanbanViewComponent;
    let fixture: ComponentFixture<KanbanViewComponent>;
    let ngZone;
    let stages,
        cards,
        kanbanControls,
        selectedInput,
        cardMoveBackBtn,
        cardMoveForwardBtn,
        cardDeleteBtn,
        addCardInput,
        addCardBtn;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [KanbanViewComponent, KanbanStageComponent, KanbanCardComponent]
        })
            .compileComponents();
    }));
    beforeEach(inject([NgZone], (injectedNgZone: NgZone) => {
        ngZone = injectedNgZone;
    }));
    beforeEach(() => {
        // ngZone = injectedNgZone;
        fixture = TestBed.createComponent(KanbanViewComponent);
        component = fixture.componentInstance;
        component.stages = [{
            id: 1,
            name: 'Backlog',
            cards: [{
                name: 'Add drag and drop feature',
                id: 1
            }, {
                name: 'UI redesign',
                id: 2
            }],
        }, {
            id: 2,
            name: 'To Do',
            cards: [{
                name: 'Resolve a merge conflict',
                id: 1
            }, {
                name: 'Improve performance of sale APP',
                id: 2
            }],
        }, {
            id: 3,
            name: 'Ongoing',
            cards: [{
                name: 'Bug Fixing #20',
                id: 1
            }],
        }, {
            id: 4,
            name: 'Done',
            cards: [{
                name: 'Bug Fixing #1',
                id: 1
            }],
        }];
        fixture.detectChanges();
        stages = fixture.nativeElement.querySelectorAll('.kanban_view .kanban_stage');
        cards = fixture.nativeElement.querySelectorAll('.kanban_view .kanban_card');
        kanbanControls = fixture.nativeElement.querySelectorAll('.kanban_view .kanban_controls');
        addCardInput = kanbanControls[0].querySelectorAll('.add_card input');
        addCardBtn = kanbanControls[0].querySelectorAll('.add_card_btn');
        selectedInput = kanbanControls[0].querySelectorAll('.edit_card .selected_card_input'),
            cardMoveBackBtn = kanbanControls[0].querySelectorAll('.edit_card .card_move_back_btn'),
            cardMoveForwardBtn = kanbanControls[0].querySelectorAll('.edit_card .card_forward_back_btn'),
            cardDeleteBtn = kanbanControls[0].querySelectorAll('.edit_card .card_delete_back_btn');

    });

    it('Kanban view should rendered with correct stages and cards', () => {
        expect(stages.length).toEqual(4, 'Four stages should be render.');
        // Get all stage names
        const all_stage_names = [];
        stages.forEach((stage) => {
            all_stage_names.push(stage.querySelector('.kanban_header').innerText);
        });

        expect(all_stage_names).toEqual(['Backlog', 'To Do', 'Ongoing', 'Done'], 'Four stage Names should come as expexted.');
        expect(cards.length).toEqual(6, 'Five card should be render.');
    });

    it('Kanban view should rendered with all controls', () => {
        spyOn(component, 'onAddCard');

        // Add card controls
        expect(kanbanControls[0].querySelectorAll('.add_card_input').length).toEqual(
            1,
            'Add card input should be rendered'
        );
        expect(addCardBtn.length).toEqual(
            1,
            'Add card button should be rendered'
        );
        addCardBtn[0].click();

        // Edit card controls
        expect(selectedInput.length).toEqual(
            1,
            'Selected card input should be rendered'
        );

        expect(cardMoveBackBtn.length).toEqual(
            1,
            'Card Move Back button should be rendered'
        );


        expect(cardMoveForwardBtn.length).toEqual(
            1,
            'Card Move Forwward button should be rendered'
        );

        expect(cardDeleteBtn.length).toEqual(
            1,
            'Card Delete button should be rendered'
        );
    });

    it('On click of card in first stage that card should be selected. With appropriate UI changes', () => {
        ngZone.run(() => {
            let firstCard = stages[0].querySelectorAll('.kanban_card');
            firstCard[0].click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(cardMoveBackBtn[0].hasAttribute('disabled')).toBeTruthy('Move back button should be disabled as it is first stage');
                expect(cardMoveForwardBtn[0].hasAttribute('disabled'))
                    .toBeFalsy('Move forward button should be enabled as it is first stage');
                expect(cardDeleteBtn[0].hasAttribute('disabled')).toBeFalsy('Delete button should be enabled');
                expect(selectedInput[0].value).toBe(firstCard[0].innerText, 'Selected card content should come in input');
                // select first card of second stage
                firstCard = stages[1].querySelectorAll('.kanban_card');
                firstCard[0].click();
                fixture.detectChanges();
                fixture.whenStable().then(() => {
                    expect(cardMoveBackBtn[0].hasAttribute('disabled'))
                        .toBeFalsy('Move back button should be enabled as it is second stage');
                    expect(cardMoveForwardBtn[0].hasAttribute('disabled'))
                        .toBeFalsy('Move forward button should be enabled as it is second stage');
                    expect(cardDeleteBtn[0].hasAttribute('disabled')).toBeFalsy('Delete button should be enabled');
                    console.log(firstCard[0].innerText);
                    expect(selectedInput[0].value).toBe(firstCard[0].innerText, 'Selected card content should come in input');
                });
            });
        });
    });

    it('On click of card in last stage that card should be selected. With appropriate UI changes', () => {
        ngZone.run(() => {
            const card = stages[stages.length - 1].querySelectorAll('.kanban_card');
            card[0].click();
            fixture.detectChanges();
            fixture.whenStable().then(() => {
                expect(cardMoveForwardBtn[0].hasAttribute('disabled'))
                    .toBeTruthy('Move forward button should be disabled as it is last stage');
                expect(cardMoveBackBtn[0].hasAttribute('disabled'))
                    .toBeFalsy('Move back button should be enabled as it is last stage');
                expect(cardDeleteBtn[0].hasAttribute('disabled'))
                    .toBeFalsy('Delete button should be enabled');
                    console.log(selectedInput[0].value);
                expect(selectedInput[0].value).toBe(card[0].innerText, 'Selected card content should come in input');
            });
        });
    });

    it('Task Move forward.', () => {
        // Select first card of third stage
        const currentStage = stages[2];
        const nextStage = stages[3];
        const card = {
            currentStage: currentStage.querySelectorAll('.kanban_card'),
        }
        const oldCardLength = {
            nextStage: nextStage.querySelectorAll('.kanban_card').length,
            currentStage: currentStage.querySelectorAll('.kanban_card').length
        }
        card.currentStage[0].click();
        fixture.detectChanges();
        cardMoveForwardBtn[0].click();
        fixture.detectChanges();
        expect(cardMoveForwardBtn[0].hasAttribute('disabled'))
            .toBeTruthy('Move forward button should be disabled as selected card is in last stage now');
        expect(nextStage.querySelectorAll('.kanban_card').length)
            .toBe(oldCardLength.nextStage + 1, 'After move in 4th stage there should be 1 card present.');
        expect(currentStage.querySelectorAll('.kanban_card').length)
            .toBe(oldCardLength.currentStage - 1, 'After move in 3rd stage 1 card should be removed.');
    });

    it('Task Move Backward.', () => {
        // Select first card of second stage
        const currentStage = stages[1];
        const preStage = stages[0];
        const card = {
            currentStage: currentStage.querySelectorAll('.kanban_card'),
        }
        const oldCardLength = {
            preStage: preStage.querySelectorAll('.kanban_card').length,
            currentStage: currentStage.querySelectorAll('.kanban_card').length
        }
        card.currentStage[0].click();
        fixture.detectChanges();
        cardMoveBackBtn[0].click();
        fixture.detectChanges();
        expect(cardMoveBackBtn[0].hasAttribute('disabled'))
            .toBeTruthy('Move Back button should be disabled as selected card is in last stage now');
        expect(preStage.querySelectorAll('.kanban_card').length)
            .toBe(oldCardLength.preStage + 1, 'After move in 4th stage there should be 1 card present.');
        expect(currentStage.querySelectorAll('.kanban_card').length)
            .toBe(oldCardLength.currentStage - 1, 'After move in 3rd stage 1 card should be removed.');
    });

});
