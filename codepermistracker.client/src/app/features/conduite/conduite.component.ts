import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrivingActionApiService } from '../../core/services/driving-action-api.service';
import { DrivingStatus } from '../../core/enums/driving-status.enum';
import { FormsModule } from '@angular/forms';
import { DrivingAction } from '../../core/models/driving-action.model';

@Component({
  selector: 'app-conduite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conduite.component.html',
  styleUrls: ['./conduite.component.css']
})
export class ConduiteComponent implements OnInit {
  sessions: DrivingAction[] = [];
  readonly expectedSessionCount = 17;
  readonly statuses = Object.values(DrivingStatus);
  readonly DrivingStatus = DrivingStatus;

  newSession: Omit<DrivingAction, 'id'> = {
    label: '',
    date: '',
    notes: '',
    status: DrivingStatus.NonCommence
  };

  constructor(private drivingApi: DrivingActionApiService) { }

  ngOnInit(): void {
    this.drivingApi.getAll().subscribe(data => {
      this.sessions = data;

      const existingLabels = data.map(s => s.label);
      const toAdd: DrivingAction[] = [];

      for (let i = 1; i <= this.expectedSessionCount; i++) {
        const label = `Heure ${i}`;
        if (!existingLabels.includes(label)) {
          toAdd.push({
            id: 0,
            label,
            date: '',
            notes: '',
            status: DrivingStatus.NonCommence
          });
        }
      }

      toAdd.forEach(s =>
        this.drivingApi.add(s).subscribe(added => this.sessions.push(added))
      );
    });
  }

  addSession(): void {
    const trimmed = this.newSession.label.trim();
    if (!trimmed) return;

    const sessionToAdd: DrivingAction = {
      id: 0,
      label: trimmed,
      date: this.newSession.date ?? '',
      notes: this.newSession.notes ?? '',
      status: this.newSession.status ?? DrivingStatus.NonCommence
    };

    this.drivingApi.add(sessionToAdd).subscribe(added => {
      this.sessions.push(added);
      this.newSession = { label: '', date: '', notes: '', status: DrivingStatus.NonCommence };
    });
  }

  save(session: DrivingAction): void {
    if (session.id > 0) {
      this.drivingApi.update(session.id, session).subscribe();
    }
  }

  editSession(session: DrivingAction): void {
    const newLabel = prompt('Modifier le libellé de la session :', session.label);
    if (newLabel !== null && newLabel.trim() !== '') {
      session.label = newLabel.trim();
      this.save(session);
    }
  }

  delete(session: DrivingAction): void {
    if (session.id > 0) {
      this.drivingApi.delete(session.id).subscribe(() => {
        this.sessions = this.sessions.filter(s => s.id !== session.id);
      });
    }
  }
}
