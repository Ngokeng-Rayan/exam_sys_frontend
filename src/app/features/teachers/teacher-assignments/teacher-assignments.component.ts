import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher, TeacherAssignment } from '../../../core/models';

@Component({
  selector: 'app-teacher-assignments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-assignments.component.html',
  styleUrls: ['./teacher-assignments.component.scss']
})
export class TeacherAssignmentsComponent implements OnInit {
  teacher: Teacher | null = null;
  assignments: TeacherAssignment[] = [];
  loading = true;
  error = '';
  teacherId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.teacherId = parseInt(id, 10);
      this.loadTeacher();
      this.loadAssignments();
    }
  }

  loadTeacher() {
    if (!this.teacherId) return;

    this.teacherService.getTeacher(this.teacherId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.teacher = response.data;
        }
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement de l\'enseignant';
      }
    });
  }

  loadAssignments() {
    if (!this.teacherId) return;

    this.loading = true;
    this.teacherService.getTeacherAssignments(this.teacherId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.assignments = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement des affectations';
        this.loading = false;
      }
    });
  }

  removeAssignment(assignment: TeacherAssignment) {
    if (!this.teacherId) return;

    if (confirm(`Voulez-vous vraiment supprimer cette affectation ?`)) {
      this.teacherService.removeAssignment(this.teacherId, assignment.id).subscribe({
        next: () => {
          this.loadAssignments();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la suppression');
        }
      });
    }
  }
}
