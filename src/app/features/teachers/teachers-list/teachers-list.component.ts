import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/models';

@Component({
  selector: 'app-teachers-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './teachers-list.component.html',
  styleUrls: ['./teachers-list.component.scss']
})
export class TeachersListComponent implements OnInit {
  teachers: Teacher[] = [];
  loading = false;
  error = '';

  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalTeachers = 0;
  perPage = 20;

  // Filters
  searchTerm = '';
  selectedGrade = '';
  selectedType = '';
  selectedDepartment = '';

  grades: string[] = [];
  teacherTypes: string[] = [];

  constructor(public teacherService: TeacherService) { }

  ngOnInit() {
    this.grades = this.teacherService.getGrades();
    this.teacherTypes = this.teacherService.getTeacherTypes();
    this.loadTeachers();
  }

  loadTeachers() {
    this.loading = true;
    this.error = '';

    const params: any = {
      page: this.currentPage,
      per_page: this.perPage
    };

    if (this.searchTerm) params.search = this.searchTerm;
    if (this.selectedGrade) params.grade = this.selectedGrade;
    if (this.selectedDepartment) params.departmentId = this.selectedDepartment;

    this.teacherService.getTeachers(params).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.teachers = response.data.data;
          this.currentPage = response.data.meta.current_page;
          this.totalPages = response.data.meta.last_page;
          this.totalTeachers = response.data.meta.total;
          this.perPage = response.data.meta.per_page;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement des enseignants';
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadTeachers();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadTeachers();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedGrade = '';
    this.selectedType = '';
    this.selectedDepartment = '';
    this.currentPage = 1;
    this.loadTeachers();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTeachers();
    }
  }

  deleteTeacher(teacher: Teacher) {
    if (confirm(`⚠️ ATTENTION : Voulez-vous vraiment supprimer l'enseignant ${teacher.fullName} ?

Cette action est irréversible.`)) {
      this.teacherService.deleteTeacher(teacher.id).subscribe({
        next: () => {
          this.loadTeachers();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la suppression');
        }
      });
    }
  }

  get paginationPages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
