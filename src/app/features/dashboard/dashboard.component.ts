import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StatisticsService } from '../../core/services/statistics.service';
import { AuthService } from '../../core/services/auth.service';
import { Statistics, User } from '../../core/models';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    currentUser: User | null = null;
    statistics: Statistics | null = null;
    loading = true;

    constructor(
        private statisticsService: StatisticsService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.loadStatistics();
    }

    loadStatistics() {
        this.loading = true;
        this.statisticsService.getDashboardStats().subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.statistics = response.data;
                }
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }

    getGreeting(): string {
        const hour = new Date().getHours();
        if (hour < 12) return 'Bonjour';
        if (hour < 18) return 'Bon après-midi';
        return 'Bonsoir';
    }
}
