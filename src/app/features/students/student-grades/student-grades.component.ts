import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models';

@Component({
  selector: 'app-student-grades',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-grades.component.html',
  styleUrls: ['./student-grades.component.scss']
})
export class StudentGradesComponent implements OnInit {
  student: Student | null = null;
  grades: any[] = [];
  loading = true;
  error = '';
  studentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentId = parseInt(id, 10);
      this.loadStudent();
      this.loadGrades();
    }
  }

  loadStudent() {
    if (!this.studentId) return;

    this.studentService.getStudent(this.studentId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.student = response.data;
        }
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement de l\'étudiant';
      }
    });
  }

  loadGrades() {
    if (!this.studentId) return;

    this.loading = true;
    this.studentService.getStudentGrades(this.studentId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.grades = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement des notes';
        this.loading = false;
      }
    });
  }
}
