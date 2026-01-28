import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UserService, CreateUserRequest, UpdateUserRequest } from '../../../core/services/user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  userId: number | null = null;
  
  roles: string[] = [];
  statuses: string[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      matricule: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      role: ['TEACHER', [Validators.required]],
      status: ['ACTIVE', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.roles = this.userService.getRoles();
    this.statuses = this.userService.getStatuses();
    
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = parseInt(id, 10);
      this.loadUser();
      
      // En mode édition, le mot de passe n'est pas obligatoire
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('confirmPassword')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.userForm.get('confirmPassword')?.updateValueAndValidity();
    }
  }

  loadUser() {
    if (!this.userId) return;
    
    this.loading = true;
    this.userService.getUser(this.userId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const user = response.data;
          this.userForm.patchValue({
            matricule: user.matricule,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            role: user.role,
            status: user.status
          });
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement de l\'utilisateur';
        this.loading = false;
      }
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value && confirmPassword.value) {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      }
    }
    return null;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.isEditMode && this.userId) {
      this.updateUser();
    } else {
      this.createUser();
    }
  }

  createUser() {
    const formValue = this.userForm.value;
    const data: CreateUserRequest = {
      matricule: formValue.matricule,
      email: formValue.email,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      password: formValue.password,
      gender: formValue.gender,
      role: formValue.role,
      status: formValue.status
    };

    this.userService.createUser(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/users']);
        }
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors de la création de l\'utilisateur';
        this.loading = false;
      }
    });
  }

  updateUser() {
    if (!this.userId) return;
    
    const formValue = this.userForm.value;
    const data: UpdateUserRequest = {
      matricule: formValue.matricule,
      email: formValue.email,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      gender: formValue.gender,
      role: formValue.role,
      status: formValue.status
    };

    // Ajouter le mot de passe seulement s'il a été rempli
    if (formValue.password) {
      data.password = formValue.password;
    }

    this.userService.updateUser(this.userId, data).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/users', this.userId]);
        }
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors de la modification de l\'utilisateur';
        this.loading = false;
      }
    });
  }

  get matricule() { return this.userForm.get('matricule'); }
  get email() { return this.userForm.get('email'); }
  get firstName() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get password() { return this.userForm.get('password'); }
  get confirmPassword() { return this.userForm.get('confirmPassword'); }
  get gender() { return this.userForm.get('gender'); }
  get role() { return this.userForm.get('role'); }
  get status() { return this.userForm.get('status'); }
}
