import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  userId = input.required<string>();
  private tasksService = inject(TasksService);
  // userTasks: Task[] = [];

  userTasks = computed(() => {
    console.log('userId - ', this.userId());
    console.log('ALL tasks - ', this.tasksService.allTasks());
    return this.tasksService
      .allTasks()
      .filter((task) => task.userId === this.userId());
  });
}
