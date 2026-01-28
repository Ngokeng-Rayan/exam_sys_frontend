import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  loading = true;
  error = '';
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public userService: UserService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userId = parseInt(id, 10);
      this.loadUser();
    }
  }

  loadUser() {
    if (!this.userId) return;

    this.loading = true;
    this.userService.getUser(this.userId).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.user = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Erreur lors du chargement de l\'utilisateur';
        this.loading = false;
      }
    });
  }

  activateUser() {
    if (!this.user || !this.userId) return;
    
    if (confirm(`Voulez-vous vraiment activer l'utilisateur ${this.user.fullName} ?`)) {
      this.userService.activateUser(this.userId).subscribe({
        next: () => {
          this.loadUser();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de l\'activation');
        }
      });
    }
  }

  deactivateUser() {
    if (!this.user || !this.userId) return;
    
    if (confirm(`Voulez-vous vraiment désactiver l'utilisateur ${this.user.fullName} ?`)) {
      this.userService.deactivateUser(this.userId).subscribe({
        next: () => {
          this.loadUser();
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la désactivation');
        }
      });
    }
  }

  deleteUser() {
    if (!this.user || !this.userId) return;
    
    if (confirm(`⚠️ ATTENTION : Voulez-vous vraiment supprimer l'utilisateur ${this.user.fullName} ?\n\nCette action est irréversible.`)) {
      this.userService.deleteUser(this.userId).subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          alert(error.message || 'Erreur lors de la suppression');
        }
      });
    }
  }
}
