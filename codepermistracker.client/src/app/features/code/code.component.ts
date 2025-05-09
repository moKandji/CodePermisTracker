import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeTaskApiService } from '../../core/services/code-task-api.service';
import { DrivingStatus } from '../../core/enums/driving-status.enum';
import { FormsModule } from '@angular/forms';
import { CodeTask } from '../../core/models/code-task.model';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.css']
})
export class CodeComponent implements OnInit {
  tasks: CodeTask[] = [];
  readonly statuses = Object.values(DrivingStatus);
  readonly DrivingStatus = DrivingStatus; // Exposer l'enum

  newTask: Omit<CodeTask, 'id'> = {
    label: '',
    notes: '',
    status: DrivingStatus.NonCommence
  };

  constructor(private codeApi: CodeTaskApiService) { }

  ngOnInit(): void {
    this.codeApi.getAll().subscribe(data => {
      this.tasks = data;

      if (this.tasks.length === 0) {
        const defaultTasks = [
          'Lecture du livret',
          'Premiers QCM',
          'Simulation chronométrée',
          'Révision erreurs fréquentes'
        ].map(label => ({
          id: 0,
          label,
          notes: '',
          status: DrivingStatus.NonCommence
        }));

        defaultTasks.forEach(task =>
          this.codeApi.add(task).subscribe(added => this.tasks.push(added))
        );
      }
    });
  }

  addTask(): void {
    const trimmed = this.newTask.label.trim();
    if (!trimmed) return;

    const taskToAdd: CodeTask = {
      id: 0,
      label: trimmed,
      notes: this.newTask.notes ?? '',
      status: this.newTask.status ?? DrivingStatus.NonCommence
    };

    this.codeApi.add(taskToAdd).subscribe(added => {
      this.tasks.push(added);
      this.newTask = { label: '', notes: '', status: DrivingStatus.NonCommence };
    });
  }

  save(task: CodeTask): void {
    if (task.id > 0) {
      this.codeApi.update(task.id, task).subscribe();
    }
  }

  editTask(task: CodeTask): void {
    const newLabel = prompt('Modifier le libellé de la tâche :', task.label);
    if (newLabel !== null && newLabel.trim() !== '') {
      task.label = newLabel.trim();
      this.save(task);
    }
  }

  delete(task: CodeTask): void {
    if (task.id > 0) {
      this.codeApi.delete(task.id).subscribe(() => {
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      });
    }
  }
}
