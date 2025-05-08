import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DrivingAction } from '../models/driving-action.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DrivingActionApiService {
  private baseUrl = 'https://localhost:5001/api/drivingactions';

  constructor(private http: HttpClient) { }

  getAll(): Observable<DrivingAction[]> {
    return this.http.get<DrivingAction[]>(this.baseUrl);
  }

  findByLabel(label: string): Observable<DrivingAction> {
    return this.http.get<DrivingAction>(`${this.baseUrl}/find`, {
      params: { label }
    });
  }

  add(action: DrivingAction): Observable<DrivingAction> {
    return this.http.post<DrivingAction>(this.baseUrl, action);
  }

  update(id: number, action: DrivingAction): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, action);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
