import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AcademicService } from '../../../core/services/academic.service';
import { AcademicYear } from '../../../core/models';

@Component({
  selector: 'app-academic-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './academic-management.component.html',
  styleUrls: ['./academic-management.component.scss']
})
export class AcademicManagementComponent implements OnInit {
  currentAcademicYear: AcademicYear | null = null;
  loading = false;

  managementSections = [
    {
      title: 'Années Académiques',
      description: 'Gérer les années académiques et définir l\'année courante',
      icon: '📅',
      route: '/academic/years',
      color: 'primary'
    },
    {
      title: 'Semestres',
      description: 'Gérer les semestres et définir le semestre courant',
      icon: '📚',
      route: '/academic/semesters',
      color: 'info'
    },
    {
      title: 'Départements',
      description: 'Gérer les départements de l\'institution',
      icon: '🏢',
      route: '/academic/departments',
      color: 'success'
    },
    {
      title: 'Programmes',
      description: 'Gérer les programmes d\'enseignement',
      icon: '🎓',
      route: '/academic/programs',
      color: 'warning'
    },
    {
      title: 'Niveaux',
      description: 'Gérer les niveaux d\'études (L1, L2, L3, etc.)',
      icon: '📈',
      route: '/academic/levels',
      color: 'secondary'
    },
    {
      title: 'Classes',
      description: 'Gérer les classes et affectations d\'étudiants',
      icon: '📝',
      route: '/classes',
      color: 'info'
    },
    {
      title: 'Unités d\'Enseignement (UE)',
      description: 'Gérer les unités d\'enseignement',
      icon: '📖',
      route: '/academic/ues',
      color: 'primary'
    },
    {
      title: 'ECUE',
      description: 'Gérer les éléments constitutifs des UE',
      icon: '📗',
      route: '/academic/ecues',
      color: 'success'
    }
  ];

  constructor(private academicService: AcademicService) { }

  ngOnInit() {
    this.loadCurrentAcademicYear();
  }

  loadCurrentAcademicYear() {
    this.loading = true;
    this.academicService.getCurrentAcademicYear().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.currentAcademicYear = response.data;
        }
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
