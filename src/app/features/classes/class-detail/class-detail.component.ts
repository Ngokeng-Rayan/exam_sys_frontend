import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-class-detail',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="page-container"><h1>Détails Classe</h1></div>`
})
export class ClassDetailComponent { }
