import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ResultService } from '../../../core/services/result.service';
import { Result } from '../../../core/models';

@Component({
    selector: 'app-result-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './result-detail.component.html',
    styleUrls: ['./result-detail.component.scss']
})
export class ResultDetailComponent implements OnInit {
    result: Result | null = null;
    loading = true;
    error = '';
    resultId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        public resultService: ResultService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.resultId = parseInt(id, 10);
            this.loadResult();
        }
    }

    loadResult() {
        if (!this.resultId) return;

        this.loading = true;
        this.resultService.getResult(this.resultId).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.result = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors du chargement du résultat';
                this.loading = false;
            }
        });
    }

    getSubjectAveragesArray(): { code: string; average: number }[] {
        if (!this.result?.subjectAverages) return [];
        return Object.entries(this.result.subjectAverages).map(([code, average]) => ({
            code,
            average: average as number
        }));
    }
}
