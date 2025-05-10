import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTaskApiService } from '../../core/services/admin-task-api.service';
import { CodeTaskApiService } from '../../core/services/code-task-api.service';
import { DrivingActionApiService } from '../../core/services/driving-action-api.service';
import { DrivingStatus } from '../../core/enums/driving-status.enum';
import { ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
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
      this.updateCharts();
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

  chartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    cutout: '50%'
  };

  adminChartData = {
    labels: ['Complété', 'Restant'],
    datasets: [{ data: [0, 100], backgroundColor: ['#2563eb', '#e5e7eb'] }]
  };

  codeChartData = {
    labels: ['Complété', 'Restant'],
    datasets: [{ data: [0, 100], backgroundColor: ['#7e22ce', '#e5e7eb'] }]
  };

  drivingChartData = {
    labels: ['Complété', 'Restant'],
    datasets: [{ data: [0, 100], backgroundColor: ['#16a34a', '#e5e7eb'] }]
  };

  updateCharts(): void {
    this.adminChartData.datasets[0].data = [this.adminProgress, 100 - this.adminProgress];
    this.codeChartData.datasets[0].data = [this.codeProgress, 100 - this.codeProgress];
    this.drivingChartData.datasets[0].data = [this.drivingProgress, 100 - this.drivingProgress];
  }
}
