import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminTask } from '../models/admin-task.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminTaskApiService {
  private baseUrl = 'https://localhost:5001/api/admintasks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<AdminTask[]> {
    return this.http.get<AdminTask[]>(this.baseUrl);
  }

  findByLabel(label: string): Observable<AdminTask> {
    return this.http.get<AdminTask>(`${this.baseUrl}/find`, {
      params: { label }
    });
  }

  add(task: AdminTask): Observable<AdminTask> {
    return this.http.post<AdminTask>(this.baseUrl, task);
  }

  update(id: number, task: AdminTask): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
