import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/models';

@Component({
    selector: 'app-teacher-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './teacher-detail.component.html',
    styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {
    teacher: Teacher | null = null;
    loading = true;
    error = '';
    teacherId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        public teacherService: TeacherService
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.teacherId = parseInt(id, 10);
            this.loadTeacher();
        }
    }

    loadTeacher() {
        if (!this.teacherId) return;

        this.loading = true;
        this.teacherService.getTeacher(this.teacherId).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.teacher = response.data;
                }
                this.loading = false;
            },
            error: (error) => {
                this.error = error.message || 'Erreur lors du chargement de l\'enseignant';
                this.loading = false;
            }
        });
    }

    deleteTeacher() {
        if (!this.teacher || !this.teacherId) return;

        if (confirm(`⚠️ ATTENTION : Voulez-vous vraiment supprimer l'enseignant ${this.teacher.fullName} ?

Cette action est irréversible.`)) {
            this.teacherService.deleteTeacher(this.teacherId).subscribe({
                next: () => {
                    this.router.navigate(['/teachers']);
                },
                error: (error) => {
                    alert(error.message || 'Erreur lors de la suppression');
                }
            });
        }
    }
}
