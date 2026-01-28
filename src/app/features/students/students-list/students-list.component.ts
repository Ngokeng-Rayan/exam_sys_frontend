import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { StudentService } from '../../../core/services/student.service';
import { Student } from '../../../core/models';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.scss']
})
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  loading = false;
  error = '';

  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalStudents = 0;
  perPage = 20;

  // Filters
  searchTerm = '';
  selectedProgram = '';
  selectedLevel = '';
  selectedPromotion = '';
  selectedStatus = '';
  selectedRegime = '';

  statuses: string[] = [];
  regimes: string[] = [];

  constructor(public studentService: StudentService) { }

  ngOnInit() {
    this.statuses = this.studentService.getStatuses();
    this.regimes = this.studentService.getRegimes();
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.error = '';

    const params: any = {
      page: this.currentPage,
      per_page: this.perPage
    };

    if (this.searchTerm) params.search = this.searchTerm;
    if (this.selectedProgram) params.programId = this.selectedProgram;
    if (this.selectedLevel) params.levelCode = this.selectedLevel;
    if (this.selectedPromotion) params.promotion = this.selectedPromotion;

    this.studentService.getStudents(params).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.students = response.data.data;
          this.currentPage = response.data.meta.current_page;
          this.totalPages = response.data.meta.last_page;
          this.totalStudents = response.data.meta.total;
          this.perPage = response.data.meta.per_page;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement des étudiants';
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadStudents();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadStudents();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedProgram = '';
    this.selectedLevel = '';
    this.selectedPromotion = '';
    this.selectedStatus = '';
    this.selectedRegime = '';
    this.currentPage = 1;
    this.loadStudents();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadStudents();
    }
  }

  deleteStudent(student: Student) {
    if (confirm(`⚠️ ATTENTION : Voulez-vous vraiment supprimer l'étudiant ${student.fullName} ?

Cette action est irréversible.`)) {
      this.studentService.deleteStudent(student.id).subscribe({
        next: () => {
          this.loadStudents();
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
