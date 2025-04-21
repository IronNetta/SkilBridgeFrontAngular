import { Component, computed, effect, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../../auth/services/auth-service.service';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { ProfilEditComponent } from '../../component/profil-edit/profil-edit.component';

@Component({
  selector: 'app-profil',
  imports: [CommonModule, ButtonModule, CardModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
  providers: [DialogService]
})
export class ProfilComponent {
  private readonly auth = inject(AuthService);
  private readonly userService = inject(UserService);
  private readonly dialog = inject(DialogService);

  profile = this.userService.profile;

  constructor() {
    effect(() => {
      const email = this.auth.currentUser()?.user.email;
      if (email) this.userService.loadProfile(email);
    });
  }

  openEdit() {
    this.dialog.open(ProfilEditComponent, {
      header: 'Modifier le profil',
      width: '30rem',
      dismissableMask: true,
    });
  }
}