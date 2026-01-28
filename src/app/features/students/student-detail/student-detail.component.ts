import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models';

@Component({
  selector: 'app-student-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {
  student: Student | null = null;
  loading = true;
  error = '';
  studentId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public studentService: StudentService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
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
          this.student = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement de l\'étudiant';
        this.loading = false;
      }
    });
  }

  deleteStudent() {
    if (!this.student || !this.studentId) return;

    if (confirm(`⚠️ ATTENTION : Voulez-vous vraiment supprimer l'étudiant ${this.student.fullName} ?\n\nCette action est irréversible.`)) {
      this.studentService.deleteStudent(this.studentId).subscribe({
        next: () => {
          this.router.navigate(['/students']);
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la suppression');
        }
      });
    }
  }
}
