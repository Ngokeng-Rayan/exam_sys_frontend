import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Notification, ApiResponse } from '../models';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private apiUrl = `${environment.apiUrl}/notifications`;
    private unreadCountSubject = new BehaviorSubject<number>(0);
    public unreadCount$ = this.unreadCountSubject.asObservable();

    constructor(private http: HttpClient) { }

    getNotifications(): Observable<ApiResponse<Notification[]>> {
        return this.http.get<ApiResponse<Notification[]>>(this.apiUrl);
    }

    getUnreadCount(): Observable<ApiResponse<{ count: number }>> {
        return this.http.get<ApiResponse<{ count: number }>>(`${this.apiUrl}/unread-count`)
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this.unreadCountSubject.next(response.data.count);
                    }
                })
            );
    }

    markAsRead(id: number): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/${id}/read`, {})
            .pipe(
                tap(() => {
                    const currentCount = this.unreadCountSubject.value;
                    this.unreadCountSubject.next(Math.max(0, currentCount - 1));
                })
            );
    }

    markAllAsRead(): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.apiUrl}/read-all`, {})
            .pipe(
                tap(() => {
                    this.unreadCountSubject.next(0);
                })
            );
    }

    deleteNotification(id: number): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/${id}`);
    }

    deleteAllRead(): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.apiUrl}/read/all`);
    }
}
