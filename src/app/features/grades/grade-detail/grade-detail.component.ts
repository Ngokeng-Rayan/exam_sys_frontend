import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { GradeService } from '../../../core/services/grade.service';
import { Grade } from '../../../core/models';

@Component({
    selector: 'app-grade-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './grade-detail.component.html',
    styleUrls: ['./grade-detail.component.scss']
})
export class GradeDetailComponent implements OnInit {
    grade: Grade | null = null;
    loading = true;
    error = '';
    gradeId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public gradeService: GradeService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.gradeId = parseInt(id, 10);
            this.loadGrade();
        }
    }

    loadGrade() {
        if (!this.gradeId) return;

        this.loading = true;
        this.gradeService.getGrade(this.gradeId).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.grade = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors du chargement de la note';
                this.loading = false;
            }
        });
    }

    submitGrade() {
        if (!this.grade || !this.gradeId) return;

        if (confirm('Soumettre cette note pour validation ?')) {
            this.gradeService.submitGrade(this.gradeId).subscribe({
                next: () => {
                    this.loadGrade();
                },
                error: (error) => {
                    alert(error.message || 'Erreur lors de la soumission');
                }
            });
        }
    }

    deleteGrade() {
        if (!this.grade || !this.gradeId) return;

        if (confirm(`⚠️ ATTENTION : Voulez-vous vraiment supprimer cette note ?

Cette action est irréversible.`)) {
            this.gradeService.deleteGrade(this.gradeId).subscribe({
                next: () => {
                    this.router.navigate(['/grades']);
                },
                error: (error) => {
                    alert(error.message || 'Erreur lors de la suppression');
                }
            });
        }
    }
}
