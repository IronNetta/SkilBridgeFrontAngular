import {Component, effect, inject, ViewChild, WritableSignal} from '@angular/core';
import { UserTokenDto } from '../../features/auth/models/user-token-dto.model';
import { AuthService } from '../../features/auth/services/auth-service.service';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { Dialog } from 'primeng/dialog';
import { RegisterComponent } from '../../features/auth/component/register/register.component';
import { LoginComponent } from '../../features/auth/component/login/login.component';
import { NgIf } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import {
  LoginRegisterCardComponent
} from '../../features/auth/component/login-register-card/login-register-card.component';

@Component({
  selector: 'app-nav',
  imports: [
    Menubar,
    Dialog,
    LoginRegisterCardComponent
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  private readonly _authService: AuthService = inject(AuthService);

  @ViewChild(LoginComponent) loginComponent!: LoginComponent;
  @ViewChild(RegisterComponent) registerComponent!: RegisterComponent;

  items!: MenuItem[];
  registerVisible: boolean = false;
  loginVisible: boolean = false;
  showDialog: boolean = false;

  currentUser: WritableSignal<UserTokenDto | undefined>;


  constructor() {
    this.currentUser = this._authService.currentUser;
    effect(() => {
      this.initNav(this.currentUser());
    });
  }

  initNav(currentUser: UserTokenDto | undefined) {
    if (currentUser) {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/home',
        },
        {
          label: currentUser.user.username,
          icon: 'pi pi-user',
          routerLink: '/profile',
        },
        ...(currentUser.user.role.includes('ADMIN') ? [
          {
            label: 'Users',
            icon: 'pi pi-users',
            routerLink: '/users',
          },
        ] : []),
        ...(currentUser.user.role.includes('ADMIN') ? [
          {
            label: 'Mentors',
            icon: 'pi pi-users',
            routerLink: '/mentors',
          },
        ] : []),
        ...(currentUser.user.role.includes('ADMIN') ? [
          {
            label: 'Students',
            icon: 'pi pi-users',
            routerLink: '/students',
          },
        ] : []),
        {
          label: 'Logout',
          icon: 'pi pi-logout',
          command: () => {
            this._authService.logout();
          },
        },
      ];
    } else {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/home',
        },
        {
          label: 'Register/Login',
          icon: 'pi pi-user',
          command: () => {
            this.loginVisible = true;
          },
        },
      ];
    }
  }

  closeForm() {
    this.showDialog = false;
    this.registerVisible = false;
    this.loginVisible = false;
  }
  switchForm() {
    this.loginVisible = !this.loginVisible;
    this.registerVisible = !this.registerVisible;
  }
}
