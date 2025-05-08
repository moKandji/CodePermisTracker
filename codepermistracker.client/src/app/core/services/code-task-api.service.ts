import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CodeTask } from '../models/code-task.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CodeTaskApiService {
  private baseUrl = 'https://localhost:5001/api/codetasks';

  constructor(private http: HttpClient) { }

  getAll(): Observable<CodeTask[]> {
    return this.http.get<CodeTask[]>(this.baseUrl);
  }

  findByLabel(label: string): Observable<CodeTask> {
    return this.http.get<CodeTask>(`${this.baseUrl}/find`, {
      params: { label }
    });
  }

  add(task: CodeTask): Observable<CodeTask> {
    return this.http.post<CodeTask>(this.baseUrl, task);
  }

  update(id: number, task: CodeTask): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
