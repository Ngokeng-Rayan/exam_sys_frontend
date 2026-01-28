import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-grade-form',
    standalone: true,
    imports: [CommonModule],
    template: `<div class="page-container"><h1>Saisie de Note</h1></div>`
})
export class GradeFormComponent { }
