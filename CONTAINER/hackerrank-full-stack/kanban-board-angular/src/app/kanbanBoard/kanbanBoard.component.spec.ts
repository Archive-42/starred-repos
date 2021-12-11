import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {KanbanBoard} from './kanbanBoard.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('KanbanBoard', () => {
  let component: KanbanBoard;
  let fixture: ComponentFixture<KanbanBoard>;
  let compiled;
  let appInput;
  let submitButton;

  // elements in App by data-testids
  const testIds = {
    createTaskInput: 'create-task-input',
    createTaskButton: 'create-task-button',
    moveBackButton: 'move-back-button',
    moveForwardButton: 'move-forward-button',
    deleteButton: 'delete-button',
    stages: ['stage-0', 'stage-1', 'stage-2', 'stage-3'],
  };

  const pushValue = async (value) => {
    appInput.value = value;
    appInput.dispatchEvent(new Event('change'));
    appInput.dispatchEvent(new Event('input'));
    submitButton.click();
    await fixture.whenStable();
  };

  const getByTestId = (testId: string) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [KanbanBoard],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoard);
    fixture.autoDetectChanges(true);
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
    appInput = getByTestId(testIds.createTaskInput);
    submitButton = getByTestId(testIds.createTaskButton);
    fixture.detectChanges();
  });

  it('Clicking on Create Task Button should add it to first stage and do nothing if input is empty', async() => {

    let backlogStage = getByTestId(testIds.stages[0]);
    let toDoStage = getByTestId(testIds.stages[1]);

    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);

    await pushValue(taskName);

    backlogStage = getByTestId(testIds.stages[0]);
    toDoStage = getByTestId(testIds.stages[1]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(true);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(appInput.value).toBeFalsy();

    const initialLength = backlogStage.children.length;
    await pushValue('');
    expect(backlogStage.children.length).toBe(initialLength);
  });

  it('For a task in stage 0, backward icon is disabled and forward icon is enabled', async() => {
    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskBackIconId = `${taskName.split(' ').join('-')}-back`;
    const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;
    const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;

    await pushValue(taskName);

    const backlogStage = getByTestId(testIds.stages[0]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(true);
    expect(getByTestId(taskBackIconId).disabled).toEqual(true);
    expect(getByTestId(taskForwardIconId).disabled).toBeFalsy();
  });

  it('For a task in stage 0, can be moved forward till stage 4 and check for icons are enabled/disabled correctly', async() => {
    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskBackIconId = `${taskName.split(' ').join('-')}-back`;
    const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;
    const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;

    let backlogStage = getByTestId(testIds.stages[0]);
	  let toDoStage = getByTestId(testIds.stages[1]);
	  let onGoingStage = getByTestId(testIds.stages[2]);
    let doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

    await pushValue(taskName);

    backlogStage = getByTestId(testIds.stages[0]);
	  toDoStage = getByTestId(testIds.stages[1]);
	  onGoingStage = getByTestId(testIds.stages[2]);
    doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(true);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

    getByTestId(taskForwardIconId).click();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0]);
	  toDoStage = getByTestId(testIds.stages[1]);
	  onGoingStage = getByTestId(testIds.stages[2]);
    doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(true);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

    getByTestId(taskForwardIconId).click();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0]);
	  toDoStage = getByTestId(testIds.stages[1]);
	  onGoingStage = getByTestId(testIds.stages[2]);
    doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(true);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);

    getByTestId(taskForwardIconId).click();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0]);
	  toDoStage = getByTestId(testIds.stages[1]);
	  onGoingStage = getByTestId(testIds.stages[2]);
    doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(true);

    expect(getByTestId(taskBackIconId).disabled).toBeFalsy();
    expect(getByTestId(taskForwardIconId).disabled).toEqual(true);
  });

  it('For a task in stage 4, can be moved backward till stage 0 and check for icons are enabled/disabled correctly', async() => {
    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskBackIconId = `${taskName.split(' ').join('-')}-back`;
    const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;
    const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;

    await pushValue(taskName);
    getByTestId(taskForwardIconId).click();
    getByTestId(taskForwardIconId).click();
    getByTestId(taskForwardIconId).click();

    getByTestId(taskBackIconId).click();
    await fixture.whenStable();
    let backlogStage = getByTestId(testIds.stages[0]);
	  let toDoStage = getByTestId(testIds.stages[1]);
	  let onGoingStage = getByTestId(testIds.stages[2]);
    let doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(true);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);
    expect(getByTestId(taskBackIconId).disabled).toBeFalsy();
    expect(getByTestId(taskForwardIconId).disabled).toBeFalsy();

    getByTestId(taskBackIconId).click();
    await fixture.whenStable();
    backlogStage = getByTestId(testIds.stages[0]);
	  toDoStage = getByTestId(testIds.stages[1]);
	  onGoingStage = getByTestId(testIds.stages[2]);
    doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(true);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);
    expect(getByTestId(taskBackIconId).disabled).toBeFalsy();
    expect(getByTestId(taskForwardIconId).disabled).toBeFalsy();

    getByTestId(taskBackIconId).click();
    await fixture.whenStable();
    backlogStage = getByTestId(testIds.stages[0]);
	  toDoStage = getByTestId(testIds.stages[1]);
	  onGoingStage = getByTestId(testIds.stages[2]);
    doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.contains(getByTestId(taskId))).toBe(true);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);
    expect(getByTestId(taskBackIconId).disabled).toEqual(true);
    expect(getByTestId(taskForwardIconId).disabled).toBeFalsy();
  });

  it('after many forward and back operations, tasks are in correct state', async() => {
    let backlogStage = getByTestId(testIds.stages[0]);
    let backlogInitialLength = backlogStage.children.length;
    let toDoStage = getByTestId(testIds.stages[1]);
    let todoInitialLength = toDoStage.children.length;
    let onGoingStage = getByTestId(testIds.stages[2]);
    let onGoingInitialLength = onGoingStage.children.length;
    let doneStage = getByTestId(testIds.stages[3]);
    let doneInitialLength = doneStage.children.length;
    await pushValue('task 1');
    await pushValue('task 2');
    await pushValue('task 3');
    getByTestId(`task-3-forward`).click();
    await pushValue('task 4');
    getByTestId(`task-4-forward`).click();
    await pushValue('task 5');
    getByTestId(`task-5-forward`).click();
    getByTestId(`task-5-forward`).click();
    await pushValue('task 6');
    getByTestId(`task-6-forward`).click();
    getByTestId(`task-6-forward`).click();
    await pushValue('task 7');
    getByTestId(`task-7-forward`).click();
    getByTestId(`task-7-forward`).click();
    getByTestId(`task-7-forward`).click();
    await pushValue('task 8');
    getByTestId(`task-8-forward`).click();
    getByTestId(`task-8-forward`).click();
    getByTestId(`task-8-forward`).click();
    await fixture.whenStable();

    backlogStage = getByTestId(testIds.stages[0]);
    toDoStage = getByTestId(testIds.stages[1]);
    onGoingStage = getByTestId(testIds.stages[2]);
    doneStage = getByTestId(testIds.stages[3]);

    expect(backlogStage.children.length).toBe(backlogInitialLength + 2);
    expect(backlogStage.contains(getByTestId('task-1-name'))).toBe(true);
    expect(backlogStage.contains(getByTestId('task-2-name'))).toBe(true);
    expect(getByTestId('task-1-name').innerHTML).toBe('task 1');
    expect(getByTestId('task-2-name').innerHTML).toBe('task 2');
    expect(toDoStage.children.length).toBe(todoInitialLength + 2);
    expect(toDoStage.contains(getByTestId('task-3-name'))).toBe(true);
    expect(toDoStage.contains(getByTestId('task-4-name'))).toBe(true);
    expect(getByTestId('task-3-name').innerHTML).toBe('task 3');
    expect(getByTestId('task-4-name').innerHTML).toBe('task 4');
    expect(onGoingStage.children.length).toBe(onGoingInitialLength + 2);
    expect(onGoingStage.contains(getByTestId('task-5-name'))).toBe(true);
    expect(onGoingStage.contains(getByTestId('task-6-name'))).toBe(true);
    expect(getByTestId('task-5-name').innerHTML).toBe('task 5');
    expect(getByTestId('task-6-name').innerHTML).toBe('task 6');
    expect(doneStage.children.length).toBe(doneInitialLength + 2);
    expect(doneStage.contains(getByTestId('task-7-name'))).toBe(true);
    expect(doneStage.contains(getByTestId('task-8-name'))).toBe(true);
    expect(getByTestId('task-7-name').innerHTML).toBe('task 7');
    expect(getByTestId('task-8-name').innerHTML).toBe('task 8');
  });

  it('tasks are in correct state after multiple move and deletions', async() => {
    await pushValue('task 1');
    await pushValue('task 2');
    getByTestId(`task-1-forward`).click();
    getByTestId(`task-2-forward`).click();
    getByTestId(`task-2-forward`).click();
    getByTestId(`task-1-delete`).click();
    await pushValue('task 3');

    let backlogStage = getByTestId(testIds.stages[0]);
    let onGoingStage = getByTestId(testIds.stages[2]);
    expect(backlogStage.contains(getByTestId('task-3-name'))).toBe(true);
    expect(getByTestId('task-3-name').innerHTML).toBe('task 3');
    expect(onGoingStage.contains(getByTestId('task-2-name'))).toBe(true);
    expect(getByTestId('task-2-name').innerHTML).toBe('task 2');
  });

  it('Clicking on delete should delete the task in stage 0', async() => {
    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;
    await pushValue(taskName);

    let backlogStage = getByTestId(testIds.stages[0]);
    expect(backlogStage.contains(getByTestId(taskId))).toBe(true);
    getByTestId(taskDeleteIconId).click();
    await fixture.whenStable();
    backlogStage = getByTestId(testIds.stages[0]);
    expect(backlogStage.contains(getByTestId(taskId))).toBe(false);
  });

  it('Clicking on delete should delete the task in stage 1', async() => {
    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;
    const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;
    await pushValue(taskName);
    getByTestId(taskForwardIconId).click();
    await fixture.whenStable();

    let toDoStage = getByTestId(testIds.stages[1]);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(true);

    getByTestId(taskDeleteIconId).click();
    await fixture.whenStable();
    toDoStage = getByTestId(testIds.stages[0]);
    expect(toDoStage.contains(getByTestId(taskId))).toBe(false);
  });

  it('Clicking on delete should delete the task in stage 2', async() => {
    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;
    const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;

    await pushValue(taskName);
    getByTestId(taskForwardIconId).click();
    getByTestId(taskForwardIconId).click();
    await fixture.whenStable();

    let onGoingStage = getByTestId(testIds.stages[2]);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(true);

    getByTestId(taskDeleteIconId).click();
    await fixture.whenStable();
    onGoingStage = getByTestId(testIds.stages[0]);
    expect(onGoingStage.contains(getByTestId(taskId))).toBe(false);
  });

  it('Clicking on delete should delete the task in stage 3', async() => {
    const taskName = 'task 1';
    const taskId = `${taskName.split(' ').join('-')}-name`;
    const taskDeleteIconId = `${taskName.split(' ').join('-')}-delete`;
    const taskForwardIconId = `${taskName.split(' ').join('-')}-forward`;
    await pushValue(taskName);

    getByTestId(taskForwardIconId).click();
    getByTestId(taskForwardIconId).click();
    getByTestId(taskForwardIconId).click();
    await fixture.whenStable();

    let doneStage = getByTestId(testIds.stages[3]);
    expect(doneStage.contains(getByTestId(taskId))).toBe(true);

    getByTestId(taskDeleteIconId).click();
    await fixture.whenStable();
    doneStage = getByTestId(testIds.stages[0]);
    expect(doneStage.contains(getByTestId(taskId))).toBe(false);
  });
});
