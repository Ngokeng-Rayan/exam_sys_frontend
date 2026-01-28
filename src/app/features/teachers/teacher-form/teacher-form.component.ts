import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';

@Component({
    selector: 'app-teacher-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './teacher-form.component.html',
    styleUrls: ['./teacher-form.component.scss']
})
export class TeacherFormComponent implements OnInit {
    teacherForm: FormGroup;
    loading = false;
    error = '';
    isEditMode = false;
    teacherId: number | null = null;

    grades: string[] = [];
    teacherTypes: string[] = [];

    constructor(
        private fb: FormBuilder,
        public teacherService: TeacherService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.teacherForm = this.fb.group({
            matricule: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            firstName: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            gender: ['M', [Validators.required]],
            dateOfBirth: [''],
            phone: [''],
            address: [''],
            grade: ['LECTURER', [Validators.required]],
            specialty: [''],
            teacherType: ['FULL_TIME', [Validators.required]],
            departmentId: [''],
            departmentName: ['']
        });
    }

    ngOnInit() {
        this.grades = this.teacherService.getGrades();
        this.teacherTypes = this.teacherService.getTeacherTypes();

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.teacherId = parseInt(id, 10);
            this.loadTeacher();
        }
    }

    loadTeacher() {
        if (!this.teacherId) return;

        this.loading = true;
        this.teacherService.getTeacher(this.teacherId).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    const teacher = response.data;
                    this.teacherForm.patchValue({
                        matricule: teacher.matricule,
                        email: teacher.email,
                        firstName: teacher.firstName,
                        lastName: teacher.lastName,
                        gender: teacher.gender,
                        dateOfBirth: teacher.dateOfBirth,
                        phone: teacher.phone,
                        address: teacher.address,
                        grade: teacher.grade,
                        specialty: teacher.specialty,
                        teacherType: teacher.teacherType,
                        departmentId: teacher.departmentId,
                        departmentName: teacher.departmentName
                    });
                }
                this.loading = false;
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors du chargement de l\'enseignant';
                this.loading = false;
            }
        });
    }

    onSubmit() {
        if (this.teacherForm.invalid) {
            Object.keys(this.teacherForm.controls).forEach(key => {
                this.teacherForm.get(key)?.markAsTouched();
            });
            return;
        }

        this.loading = true;
        this.error = '';

        if (this.isEditMode && this.teacherId) {
            this.updateTeacher();
        } else {
            this.createTeacher();
        }
    }

    createTeacher() {
        const data = this.teacherForm.value;

        this.teacherService.createTeacher(data).subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/teachers']);
                }
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors de la création de l\'enseignant';
                this.loading = false;
            }
        });
    }

    updateTeacher() {
        if (!this.teacherId) return;

        const data = this.teacherForm.value;

        this.teacherService.updateTeacher(this.teacherId, data).subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/teachers', this.teacherId]);
                }
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors de la modification de l\'enseignant';
                this.loading = false;
            }
        });
    }

    get matricule() { return this.teacherForm.get('matricule'); }
    get email() { return this.teacherForm.get('email'); }
    get firstName() { return this.teacherForm.get('firstName'); }
    get lastName() { return this.teacherForm.get('lastName'); }
    get gender() { return this.teacherForm.get('gender'); }
    get grade() { return this.teacherForm.get('grade'); }
    get teacherType() { return this.teacherForm.get('teacherType'); }
}
