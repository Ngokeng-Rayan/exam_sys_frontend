import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const authService = inject(AuthService);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                authService.logout().subscribe();
                router.navigate(['/auth/login']);
            }

            let errorMessage = 'Une erreur est survenue';

            if (error.error?.message) {
                errorMessage = error.error.message;
            } else if (error.message) {
                errorMessage = error.message;
            }

            console.error('HTTP Error:', errorMessage, error);

            return throwError(() => ({
                message: errorMessage,
                status: error.status,
                errors: error.error?.errors
            }));
        })
    );
};
