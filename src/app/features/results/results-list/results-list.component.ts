import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ResultService } from '../../../core/services/result.service';
import { Result } from '../../../core/models';

@Component({
    selector: 'app-results-list',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './results-list.component.html',
    styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {
    results: Result[] = [];
    loading = false;
    error = '';

    currentPage = 1;
    totalPages = 1;
    totalResults = 0;
    perPage = 20;

    selectedStatus = '';
    selectedStudentId = '';
    selectedSemesterId = '';

    statuses: string[] = [];

    constructor(public resultService: ResultService) { }

    ngOnInit() {
        this.statuses = this.resultService.getStatuses();
        this.loadResults();
    }

    loadResults() {
        this.loading = true;
        this.error = '';

        const params: any = {
            page: this.currentPage,
            per_page: this.perPage
        };

        if (this.selectedStatus) params.status = this.selectedStatus;
        if (this.selectedStudentId) params.studentId = this.selectedStudentId;
        if (this.selectedSemesterId) params.semesterId = this.selectedSemesterId;

        this.resultService.getResults(params).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.results = response.data.data;
                    this.currentPage = response.data.meta.current_page;
                    this.totalPages = response.data.meta.last_page;
                    this.totalResults = response.data.meta.total;
                    this.perPage = response.data.meta.per_page;
                }
                this.loading = false;
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors du chargement des résultats';
                this.loading = false;
            }
        });
    }

    onFilterChange() {
        this.currentPage = 1;
        this.loadResults();
    }

    clearFilters() {
        this.selectedStatus = '';
        this.selectedStudentId = '';
        this.selectedSemesterId = '';
        this.currentPage = 1;
        this.loadResults();
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadResults();
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
