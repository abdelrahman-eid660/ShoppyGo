import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
type SettingsTab = 'general' | 'security' | 'notifications';
@Component({
  selector: 'app-profile-settings',
  imports: [TranslocoPipe , ReactiveFormsModule],
  templateUrl: './profile-settings.html',
  styleUrl: './profile-settings.css',
})
export class ProfileSettings {
  private fb = inject(FormBuilder);
  private translocoService = inject(TranslocoService);

  // Active Tab Signal
  activeTab = signal<SettingsTab>('general');

  // UI States Signals
  isSavingGeneral = signal<boolean>(false);
  isSavingSecurity = signal<boolean>(false);
  successMessage = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  // Avatar Image Preview
  avatarPreview = signal<string>('https://placehold.co/150x150/1e293b/ffffff?text=User');

  // Forms Setup
  generalForm: FormGroup = this.fb.group({
    fullName: ['عبدالرحمن عيد', [Validators.required, Validators.minLength(3)]],
    email: ['abdelrahman@example.com', [Validators.required, Validators.email]],
    phone: ['01012345678', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
    jobTitle: ['Full-stack Developer', [Validators.required]],
    bio: ['مطور برمجيات متحمس لبناء تطبيقات ويب عالية الأداء ورائعة تجربة المستخدم.']
  });

  securityForm: FormGroup = this.fb.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });

  notificationForm: FormGroup = this.fb.group({
    emailOrders: [true],
    emailPromos: [false],
    smsNotifications: [true],
    twoFactorAuth: [false]
  });

  // Tab Switcher
  setTab(tab: SettingsTab): void {
    this.activeTab.set(tab);
    this.clearAlerts();
  }

  // Handle Avatar Change
  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.avatarPreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Save General Info
  saveGeneralInfo(): void {
    if (this.generalForm.invalid) {
      this.generalForm.markAllAsTouched();
      return;
    }

    this.isSavingGeneral.set(true);
    this.clearAlerts();

    // Simulation API Call
    setTimeout(() => {
      this.isSavingGeneral.set(false);
      this.showSuccess('تم حفظ البيانات الشخصية بنجاح!');
    }, 800);
  }

  // Update Password
  updatePassword(): void {
    if (this.securityForm.invalid) {
      this.securityForm.markAllAsTouched();
      return;
    }

    const { newPassword, confirmPassword } = this.securityForm.value;
    if (newPassword !== confirmPassword) {
      this.errorMessage.set('كلمتا المرور غير متطابقتين');
      return;
    }

    this.isSavingSecurity.set(true);
    this.clearAlerts();

    setTimeout(() => {
      this.isSavingSecurity.set(false);
      this.securityForm.reset();
      this.showSuccess('تم تغيير كلمة المرور بنجاح!');
    }, 800);
  }

  // Toggle Language (AR / EN)
  switchLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }

  private showSuccess(msg: string): void {
    this.successMessage.set(msg);
    setTimeout(() => this.successMessage.set(null), 4000);
  }

  private clearAlerts(): void {
    this.successMessage.set(null);
    this.errorMessage.set(null);
  }
}
