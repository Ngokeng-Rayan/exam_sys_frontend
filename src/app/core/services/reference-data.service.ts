import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { AcademicService } from './academic.service';
import { Department, Program, Level, AcademicYear, Semester, UE, ECUE, ClassRoom } from '../models';

/**
 * Service centralisé pour gérer les données de référence
 * Évite de demander des IDs manuellement dans les formulaires
 */
@Injectable({
    providedIn: 'root'
})
export class ReferenceDataService {
    private departmentsSubject = new BehaviorSubject<Department[]>([]);
    private programsSubject = new BehaviorSubject<Program[]>([]);
    private levelsSubject = new BehaviorSubject<Level[]>([]);
    private academicYearsSubject = new BehaviorSubject<AcademicYear[]>([]);
    private semestersSubject = new BehaviorSubject<Semester[]>([]);
    private uesSubject = new BehaviorSubject<UE[]>([]);
    private ecuesSubject = new BehaviorSubject<ECUE[]>([]);
    private classesSubject = new BehaviorSubject<ClassRoom[]>([]);

    departments$ = this.departmentsSubject.asObservable();
    programs$ = this.programsSubject.asObservable();
    levels$ = this.levelsSubject.asObservable();
    academicYears$ = this.academicYearsSubject.asObservable();
    semesters$ = this.semestersSubject.asObservable();
    ues$ = this.uesSubject.asObservable();
    ecues$ = this.ecuesSubject.asObservable();
    classes$ = this.classesSubject.asObservable();

    constructor(private academicService: AcademicService) { }

    /**
     * Charger toutes les données de référence au démarrage
     */
    loadAllReferenceData(): void {
        this.loadDepartments();
        this.loadPrograms();
        this.loadLevels();
        this.loadAcademicYears();
        this.loadSemesters();
        this.loadUEs();
        this.loadECUEs();
        this.loadClasses();
    }

    loadDepartments(): void {
        this.academicService.getDepartments({ per_page: 100 }).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.departmentsSubject.next(response.data.data);
                }
            }
        });
    }

    loadPrograms(departmentId?: number): void {
        const params: any = { per_page: 100 };
        if (departmentId) params.departmentId = departmentId;

        this.academicService.getPrograms(params).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.programsSubject.next(response.data.data);
                }
            }
        });
    }

    loadLevels(): void {
        this.academicService.getLevels({ per_page: 100 }).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.levelsSubject.next(response.data.data);
                }
            }
        });
    }

    loadAcademicYears(): void {
        this.academicService.getAcademicYears({ per_page: 100 }).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.academicYearsSubject.next(response.data.data);
                }
            }
        });
    }

    loadSemesters(academicYearId?: number): void {
        const params: any = { per_page: 100 };
        if (academicYearId) params.academicYearId = academicYearId;

        this.academicService.getSemesters(params).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.semestersSubject.next(response.data.data);
                }
            }
        });
    }

    loadUEs(programId?: number): void {
        const params: any = { per_page: 100 };
        if (programId) params.programId = programId;

        this.academicService.getUEs(params).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.uesSubject.next(response.data.data);
                }
            }
        });
    }

    loadECUEs(ueId?: number): void {
        const params: any = { per_page: 100 };
        if (ueId) params.ueId = ueId;

        this.academicService.getECUEs(params).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.ecuesSubject.next(response.data.data);
                }
            }
        });
    }

    loadClasses(levelId?: number, programId?: number): void {
        const params: any = { per_page: 100 };
        if (levelId) params.levelId = levelId;
        if (programId) params.programId = programId;

        this.academicService.getClasses(params).subscribe({
            next: (response) => {
                if (response.success && response.data) {
                    this.classesSubject.next(response.data.data);
                }
            }
        });
    }

    /**
     * Obtenir les valeurs actuelles
     */
    getDepartments(): Department[] {
        return this.departmentsSubject.value;
    }

    getPrograms(): Program[] {
        return this.programsSubject.value;
    }

    getLevels(): Level[] {
        return this.levelsSubject.value;
    }

    getAcademicYears(): AcademicYear[] {
        return this.academicYearsSubject.value;
    }

    getSemesters(): Semester[] {
        return this.semestersSubject.value;
    }

    getUEs(): UE[] {
        return this.uesSubject.value;
    }

    getECUEs(): ECUE[] {
        return this.ecuesSubject.value;
    }

    getClasses(): ClassRoom[] {
        return this.classesSubject.value;
    }
}
