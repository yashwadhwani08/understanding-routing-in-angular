import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );

    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,

      // this makes navigation like redirect, so on back button click the user won't be able to come to the page they are coming from, especially useful after form submission
    });
  }
}
