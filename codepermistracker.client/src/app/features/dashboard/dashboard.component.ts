import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTaskApiService } from '../../core/services/admin-task-api.service';
import { CodeTaskApiService } from '../../core/services/code-task-api.service';
import { DrivingActionApiService } from '../../core/services/driving-action-api.service';
import { DrivingStatus } from '../../core/enums/driving-status.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  adminProgress = 0;
  codeProgress = 0;
  drivingProgress = 0;

  constructor(
    private adminService: AdminTaskApiService,
    private codeService: CodeTaskApiService,
    private drivingService: DrivingActionApiService
  ) { }

  ngOnInit(): void {
    this.loadProgress();
  }

  loadProgress(): void {
    this.adminService.getAll().subscribe(tasks => {
      const total = tasks.length;
      const done = tasks.filter(t => t.completed).length;
      this.adminProgress = total ? Math.round((done / total) * 100) : 0;
    });

    this.codeService.getAll().subscribe(tasks => {
      const total = tasks.length;
      const done = tasks.filter(t => t.status === DrivingStatus.Complete).length;
      this.codeProgress = total ? Math.round((done / total) * 100) : 0;
    });

    this.drivingService.getAll().subscribe(actions => {
      const total = actions.length;
      const done = actions.filter(a => a.status === DrivingStatus.Complete).length;
      this.drivingProgress = total ? Math.round((done / total) * 100) : 0;
    });
  }
}
