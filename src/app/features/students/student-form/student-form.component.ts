import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';
import { StudentCreateRequest } from '../../../core/models';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {
  studentForm: FormGroup;
  loading = false;
  error = '';
  isEditMode = false;
  studentId: number | null = null;

  statuses: string[] = [];
  regimes: string[] = [];

  constructor(
    private fb: FormBuilder,
    public studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.studentForm = this.fb.group({
      matricule: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['M', [Validators.required]],
      dateOfBirth: [''],
      phone: [''],
      address: [''],
      studentStatus: ['REGULAR', [Validators.required]],
      regime: ['FULL_TIME', [Validators.required]],
      programId: [''],
      programName: [''],
      levelCode: [''],
      levelId: [''],
      promotion: ['']
    });
  }

  ngOnInit() {
    this.statuses = this.studentService.getStatuses();
    this.regimes = this.studentService.getRegimes();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.studentId = parseInt(id, 10);
      this.loadStudent();
    }
  }

  loadStudent() {
    if (!this.studentId) return;

    this.loading = true;
    this.studentService.getStudent(this.studentId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          const student = response.data;
          this.studentForm.patchValue({
            matricule: student.matricule,
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            gender: student.gender,
            dateOfBirth: student.dateOfBirth,
            phone: student.phone,
            address: student.address,
            studentStatus: student.studentStatus,
            regime: student.regime,
            programId: student.programId,
            programName: student.programName,
            levelCode: student.levelCode,
            levelId: student.levelId,
            promotion: student.promotion
          });
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement de l\'étudiant';
        this.loading = false;
      }
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) {
      Object.keys(this.studentForm.controls).forEach(key => {
        this.studentForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.isEditMode && this.studentId) {
      this.updateStudent();
    } else {
      this.createStudent();
    }
  }

  createStudent() {
    const data: StudentCreateRequest = this.studentForm.value;

    this.studentService.createStudent(data).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/students']);
        }
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors de la création de l\'étudiant';
        this.loading = false;
      }
    });
  }

  updateStudent() {
    if (!this.studentId) return;

    const data: Partial<StudentCreateRequest> = this.studentForm.value;

    this.studentService.updateStudent(this.studentId, data).subscribe({
      next: (response) => {
        if (response.success) {
          this.router.navigate(['/students', this.studentId]);
        }
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors de la modification de l\'étudiant';
        this.loading = false;
      }
    });
  }

  get matricule() { return this.studentForm.get('matricule'); }
  get email() { return this.studentForm.get('email'); }
  get firstName() { return this.studentForm.get('firstName'); }
  get lastName() { return this.studentForm.get('lastName'); }
  get gender() { return this.studentForm.get('gender'); }
  get studentStatus() { return this.studentForm.get('studentStatus'); }
  get regime() { return this.studentForm.get('regime'); }
}
