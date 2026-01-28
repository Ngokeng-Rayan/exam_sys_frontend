import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-results-list',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="page-container"><h1>Résultats</h1><div class="card"><p>Liste des résultats</p></div></div>`
})
export class ResultsListComponent { }
