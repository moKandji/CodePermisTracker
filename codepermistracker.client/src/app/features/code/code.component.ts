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

  constructor(private codeApi: CodeTaskApiService) { }

  ngOnInit(): void {
    this.codeApi.getAll().subscribe(data => {
      this.tasks = data;

      // Tu peux ajouter ici une initialisation automatique de tâches si vide
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

  save(task: CodeTask): void {
    if (task.id > 0) {
      this.codeApi.update(task.id, task).subscribe();
    }
  }
}
