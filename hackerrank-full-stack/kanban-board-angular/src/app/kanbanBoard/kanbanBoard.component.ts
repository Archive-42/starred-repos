import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'kanban-board',
  templateUrl: './kanbanBoard.component.html',
  styleUrls: ['./kanbanBoard.component.scss']
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  public newTask: string;
  public taskLength: number;
  stagesTasks: any[]; //Only used for rendering purpose

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: '0', stage: 0 },
      { name: '1', stage: 0 },
    ];
    this.stagesNames = ['Backlog', 'To Do', 'Ongoing', 'Done'];
    this.configureTasksForRendering();
  }
  createTask(){
    if(!this.newTask){
      return ;
    }
    this.tasks.push({
      name: this.newTask, stage: 0
    });
    this.newTask = '';
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
    this.taskLength = this.tasks.length;
  }
  forwardMove(task){
    this.tasks = this.tasks.map(i => {
      if(i.name === task.name){
        i.stage = i.stage + 1;
      }
      return i;
    });
    this.configureTasksForRendering();

  }
  backMove(task){
    this.tasks = this.tasks.map(i => {
      if(i.name === task.name){
        i.stage = i.stage - 1;
      }
      return i;
    });
    this.configureTasksForRendering();

  }
  delete(task){
    this.tasks = this.tasks.filter(i => {
      if(i.name !== task.name){
        return i
      }
    });
    this.configureTasksForRendering();
  }

  generateTestId = (name) => {
    return name.split(' ').join('-');
  }
}

interface Task {
  name: string;
  stage: number;
}
