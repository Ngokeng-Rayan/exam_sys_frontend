import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    registerForm: FormGroup;
    loading = false;
    error = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            matricule: ['', [Validators.required]],
            gender: ['M', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            password_confirmation: ['', [Validators.required]]
        }, { validators: this.passwordMatchValidator });
    }

    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password');
        const confirmPassword = form.get('password_confirmation');

        if (password && confirmPassword && password.value !== confirmPassword.value) {
            confirmPassword.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true };
        }
        return null;
    }

    onSubmit() {
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.register(this.registerForm.value).subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/dashboard']);
                }
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors de l\'inscription. Veuillez réessayer.';
                this.loading = false;
            }
        });
    }

    get firstName() { return this.registerForm.get('firstName'); }
    get lastName() { return this.registerForm.get('lastName'); }
    get email() { return this.registerForm.get('email'); }
    get matricule() { return this.registerForm.get('matricule'); }
    get password() { return this.registerForm.get('password'); }
    get password_confirmation() { return this.registerForm.get('password_confirmation'); }
}
