import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeacherService } from '../../../core/services/teacher.service';
import { Teacher } from '../../../core/models';

@Component({
    selector: 'app-teachers-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Gestion des Enseignants</h1>
        <button class="btn btn-primary" routerLink="/teachers/create">
          + Ajouter un enseignant
        </button>
      </div>

      <div class="card">
        <div *ngIf="loading" class="loading-container">
          <div class="loading-spinner"></div>
        </div>

        <table class="table" *ngIf="!loading">
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Nom complet</th>
              <th>Email</th>
              <th>Spécialité</th>
              <th>Département</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let teacher of teachers">
              <td>{{ teacher.matricule }}</td>
              <td>{{ teacher.firstName }} {{ teacher.lastName }}</td>
              <td>{{ teacher.email }}</td>
              <td>{{ teacher.specialty || 'N/A' }}</td>
              <td>{{ teacher.departmentName || 'N/A' }}</td>
              <td>
                <button class="btn btn-sm btn-outline" [routerLink]="['/teachers', teacher.id]">
                  Voir
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
    styles: [`
    .page-container { max-width: 1400px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xl); }
    .loading-container { padding: var(--spacing-2xl); text-align: center; }
  `]
})
export class TeachersListComponent implements OnInit {
    teachers: Teacher[] = [];
    loading = true;

    constructor(private teacherService: TeacherService) { }

    ngOnInit() {
        this.loadTeachers();
    }

    loadTeachers() {
        this.teacherService.getTeachers().subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.teachers = response.data.data;
                }
                this.loading = false;
            },
            error: () => {
                this.loading = false;
            }
        });
    }
}
