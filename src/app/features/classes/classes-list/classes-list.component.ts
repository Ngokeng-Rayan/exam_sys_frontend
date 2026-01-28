import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-classes-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
    <div class="page-container">
      <div class="page-header">
        <h1>Gestion des Classes</h1>
        <button class="btn btn-primary" routerLink="/classes/create">+ Créer une classe</button>
      </div>
      <div class="card"><p>Liste des classes</p></div>
    </div>
  `,
    styles: [`.page-container { max-width: 1400px; margin: 0 auto; }
    .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-xl); }`]
})
export class ClassesListComponent { }
