import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from "@angular/router";
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../../../core/service/language.service';
import { ThemeService } from '../../../../core/service/theme.service';
interface UserData {
  name: string;
  email: string;
  avatar: string;
}
@Component({
  selector: 'app-user-account',
  imports: [RouterModule , RouterLinkActive , RouterLink , TranslocoPipe],
  templateUrl: './user-account.html',
  styleUrl: './user-account.css',
})
export class UserAccount {
  readonly translocoService = inject(LanguageService);
  readonly themeService = inject(ThemeService);

// حالة القائمة الجانبية للشاشات الصغيرة
  isSidebarOpen = signal<boolean>(false);

  // عدد الطلبات النشطة
  activeOrdersCount = signal<number>(2);

  // بيانات المستخدم
  userInfo = signal<UserData>({
    name: 'عبدالرحمن عيد',
    email: 'abdelrahman@example.com',
    avatar: 'assets/images/default-avatar.png'
  });

  toggleSidebar(): void {
    this.isSidebarOpen.update(state => !state);
  }

  closeSidebar(): void {
    this.isSidebarOpen.set(false);
  }

  onLogout(): void {
    console.log('Logging out...');
  }
}
