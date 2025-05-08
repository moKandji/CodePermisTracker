import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminTask } from '../../core/models/admin-task.model';
import { AdminTaskApiService } from '../../core/services/admin-task-api.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  tasks: AdminTask[] = [];

  // Modèle utilisé par le formulaire
  newTask: Omit<AdminTask, 'id'> = {
    label: '',
    notes: '',
    completed: false
  };

  constructor(private adminApi: AdminTaskApiService) { }

  ngOnInit(): void {
    this.adminApi.getAll().subscribe(data => {
      this.tasks = data;

      // Initialisation automatique si aucune tâche
      if (this.tasks.length === 0) {
        const defaults = [
          'Inscription ANTS',
          'Photo d’identité',
          'Justificatif de domicile',
          'Paiement de l’examen',
          'Certificat médical'
        ];

        defaults.forEach(label => {
          const t = { label, notes: '', completed: false };
          this.adminApi.add({ id: 0, ...t }).subscribe(added => this.tasks.push(added));
        });
      }
    });
  }

  save(task: AdminTask): void {
    if (task.id > 0) {
      this.adminApi.update(task.id, task).subscribe();
    }
  }

  addTask(): void {
    const trimmed = this.newTask.label.trim();
    if (!trimmed) return;

    const taskToAdd: AdminTask = {
      id: 0, // on force 0 pour que l'API gère l'identité
      label: trimmed,
      notes: this.newTask.notes ?? '',
      completed: this.newTask.completed ?? false
    };

    this.adminApi.add(taskToAdd).subscribe(added => {
      this.tasks.push(added);
      this.newTask = { label: '', notes: '', completed: false };
    });
  }

  delete(task: AdminTask): void {
    this.adminApi.delete(task.id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
    });
  }
}
