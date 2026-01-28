import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService, UserFilters } from '../../../core/services/user.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error = '';
  
  // Pagination
  currentPage = 1;
  totalPages = 1;
  totalUsers = 0;
  perPage = 20;
  
  // Filters
  searchTerm = '';
  selectedRole = '';
  selectedStatus = '';
  
  roles: string[] = [];
  statuses: string[] = [];

  constructor(public userService: UserService) {}

  ngOnInit() {
    this.roles = this.userService.getRoles();
    this.statuses = this.userService.getStatuses();
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = '';

    const filters: UserFilters = {
      page: this.currentPage,
      per_page: this.perPage
    };

    if (this.searchTerm) filters.search = this.searchTerm;
    if (this.selectedRole) filters.role = this.selectedRole;
    if (this.selectedStatus) filters.status = this.selectedStatus;

    this.userService.getUsers(filters).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.users = response.data.data;
          this.currentPage = response.data.meta.current_page;
          this.totalPages = response.data.meta.last_page;
          this.totalUsers = response.data.meta.total;
          this.perPage = response.data.meta.per_page;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement des utilisateurs';
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadUsers();
  }

  onFilterChange() {
    this.currentPage = 1;
    this.loadUsers();
  }

  clearFilters() {
    this.searchTerm = '';
    this.selectedRole = '';
    this.selectedStatus = '';
    this.currentPage = 1;
    this.loadUsers();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers();
    }
  }

  activateUser(user: User) {
    if (confirm(`Voulez-vous vraiment activer l'utilisateur ${user.fullName} ?`)) {
      this.userService.activateUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de l\'activation');
        }
      });
    }
  }

  deactivateUser(user: User) {
    if (confirm(`Voulez-vous vraiment désactiver l'utilisateur ${user.fullName} ?`)) {
      this.userService.deactivateUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la désactivation');
        }
      });
    }
  }

  deleteUser(user: User) {
    if (confirm(`⚠️ ATTENTION : Voulez-vous vraiment supprimer l'utilisateur ${user.fullName} ?\n\nCette action est irréversible.`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la suppression');
        }
      });
    }
  }

  get paginationPages(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(this.totalPages, start + maxVisible - 1);
    
    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }
}
