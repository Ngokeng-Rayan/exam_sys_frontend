import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false]
        });
    }

    onSubmit() {
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/dashboard']);
                }
            },
            error: (error) => {
                this.error = error.message || 'Erreur de connexion. Veuillez réessayer.';
                this.loading = false;
            }
        });
    }

    get email() { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }
}
