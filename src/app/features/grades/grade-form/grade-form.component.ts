import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { GradeService } from '../../../core/services/grade.service';
import { ReferenceDataService } from '../../../core/services/reference-data.service';
import { StudentService } from '../../../core/services/student.service';
import { Student, AcademicYear, Semester, ECUE } from '../../../core/models';

@Component({
    selector: 'app-grade-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './grade-form.component.html',
    styleUrls: ['./grade-form.component.scss']
})
export class GradeFormComponent implements OnInit {
    gradeForm: FormGroup;
    loading = false;
    error = '';
    isEditMode = false;
    gradeId: number | null = null;

    // Listes pour les dropdowns
    students: Student[] = [];
    academicYears: AcademicYear[] = [];
    semesters: Semester[] = [];
    ecues: ECUE[] = [];

    loadingStudents = false;
    loadingData = false;

    constructor(
        private fb: FormBuilder,
        private gradeService: GradeService,
        private studentService: StudentService,
        public refDataService: ReferenceDataService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.gradeForm = this.fb.group({
            studentId: ['', [Validators.required]],
            ecueId: ['', [Validators.required]],
            semesterId: ['', [Validators.required]],
            academicYearId: ['', [Validators.required]],
            gradeCC1: [null, [Validators.min(0), Validators.max(20)]],
            gradeCC2: [null, [Validators.min(0), Validators.max(20)]],
            gradeExam: [null, [Validators.min(0), Validators.max(20)]],
            isAbsentCC1: [false],
            isAbsentCC2: [false],
            absenceJustifiedCC1: [false],
            absenceJustifiedCC2: [false],
            teacherComment: ['']
        });
    }

    ngOnInit() {
        // Charger les données de référence
        this.loadReferenceData();
        this.loadStudents();

        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isEditMode = true;
            this.gradeId = parseInt(id, 10);
            this.loadGrade();
        }
    }

    loadReferenceData() {
        this.loadingData = true;

        // Charger les années académiques
        this.refDataService.loadAcademicYears();
        this.refDataService.academicYears$.subscribe(years => {
            this.academicYears = years;
        });

        // Charger les semestres
        this.refDataService.loadSemesters();
        this.refDataService.semesters$.subscribe(semesters => {
            this.semesters = semesters;
        });

        // Charger les ECUEs
        this.refDataService.loadECUEs();
        this.refDataService.ecues$.subscribe(ecues => {
            this.ecues = ecues;
            this.loadingData = false;
        });
    }

    loadStudents() {
        this.loadingStudents = true;
        this.studentService.getStudents({ per_page: 500 }).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.students = response.data.data;
                }
                this.loadingStudents = false;
            },
            error: () => {
                this.loadingStudents = false;
            }
        });
    }

    onAcademicYearChange(yearId: number) {
        // Recharger les semestres pour l'année sélectionnée
        this.refDataService.loadSemesters(yearId);
    }

    loadGrade() {
        if (!this.gradeId) return;

        this.loading = true;
        this.gradeService.getGrade(this.gradeId).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    const grade = response.data;
                    this.gradeForm.patchValue({
                        studentId: grade.studentId,
                        ecueId: grade.ecueId,
                        semesterId: grade.semesterId,
                        academicYearId: grade.academicYearId,
                        gradeCC1: grade.gradeCC1,
                        gradeCC2: grade.gradeCC2,
                        gradeExam: grade.gradeExam,
                        isAbsentCC1: grade.isAbsentCC1,
                        isAbsentCC2: grade.isAbsentCC2,
                        absenceJustifiedCC1: grade.absenceJustifiedCC1,
                        absenceJustifiedCC2: grade.absenceJustifiedCC2,
                        teacherComment: grade.teacherComment
                    });
                }
                this.loading = false;
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors du chargement de la note';
                this.loading = false;
            }
        });
    }

    onSubmit() {
        if (this.gradeForm.invalid) {
            Object.keys(this.gradeForm.controls).forEach(key => {
                this.gradeForm.get(key)?.markAsTouched();
            });
            return;
        }

        this.loading = true;
        this.error = '';

        if (this.isEditMode && this.gradeId) {
            this.updateGrade();
        } else {
            this.createGrade();
        }
    }

    createGrade() {
        const data = this.gradeForm.value;

        this.gradeService.createGrade(data).subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/grades']);
                }
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors de la création de la note';
                this.loading = false;
            }
        });
    }

    updateGrade() {
        if (!this.gradeId) return;

        const data = this.gradeForm.value;

        this.gradeService.updateGrade(this.gradeId, data).subscribe({
            next: (response) => {
                if (response.success) {
                    this.router.navigate(['/grades', this.gradeId]);
                }
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors de la modification de la note';
                this.loading = false;
            }
        });
    }
}
