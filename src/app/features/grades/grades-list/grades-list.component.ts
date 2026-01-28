import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GradeService } from '../../../core/services/grade.service';
import { Grade } from '../../../core/models';

@Component({
  selector: 'app-grades-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './grades-list.component.html',
  styleUrls: ['./grades-list.component.scss']
})
export class GradesListComponent implements OnInit {
  grades: Grade[] = [];
  loading = false;
  error = '';

  currentPage = 1;
  totalPages = 1;
  totalGrades = 0;
  perPage = 20;

  searchTerm = '';
  selectedStatus = '';
  selectedStudentId = '';
  selectedEcueId = '';
  selectedSemesterId = '';

  statuses: string[] = [];

  constructor(public gradeService: GradeService) { }

  ngOnInit() {
    this.statuses = this.gradeService.getStatuses();
    this.loadGrades();
  }

  loadGrades() {
    this.loading = true;
    this.error = '';

    const params: any = {
      page: this.currentPage,
      perPage: this.perPage
    };

    if (this.selectedStatus) params.status = this.selectedStatus;
    if (this.selectedStudentId) params.studentId = this.selectedStudentId;
    if (this.selectedEcueId) params.ecueId = this.selectedEcueId;
    if (this.selectedSemesterId) params.semesterId = this.selectedSemesterId;

    this.gradeService.getGrades(params).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.grades = response.data.data;
          this.currentPage = response.data.meta.current_page;
          this.totalPages = response.data.meta.last_page;
          this.totalGrades = response.data.meta.total;
          this.perPage = response.data.meta.per_page;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement des notes';
        this.loading = false;
      }
    });
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadGrades();
  }

  clearFilters() {
    this.selectedStatus = '';
    this.selectedStudentId = '';
    this.selectedEcueId = '';
    this.selectedSemesterId = '';
    this.currentPage = 1;
    this.loadGrades();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadGrades();
    }
  }

  submitGrade(grade: Grade) {
    if (confirm(`Soumettre cette note pour validation ?`)) {
      this.gradeService.submitGrade(grade.id).subscribe({
        next: () => {
          this.loadGrades();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la soumission');
        }
      });
    }
  }

  deleteGrade(grade: Grade) {
    if (confirm(`⚠️ ATTENTION : Voulez-vous vraiment supprimer cette note ?

Cette action est irréversible.`)) {
      this.gradeService.deleteGrade(grade.id).subscribe({
        next: () => {
          this.loadGrades();
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
