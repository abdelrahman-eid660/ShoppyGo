import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-user-login',
  imports: [TranslocoPipe , RouterLink , ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css',
})
export class UserLogin {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Angular Signals لإدارة حالات الواجهة
  showPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  // بناء نموذج تسجيل الدخول
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false]
  });

  // تبديل إظهار / إخفاء كلمة المرور
  togglePasswordVisibility(): void {
    this.showPassword.update(prev => !prev);
  }

  // التحقق من صحة الحقل
  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  // إرسال النموذج (Login Submit)
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password, rememberMe } = this.loginForm.value;

    console.log('Logging in with:', { email, password, rememberMe });

    // محاكاة الاتصال بـ Backend API (AuthService)
    setTimeout(() => {
      this.isLoading.set(false);

      // مثال لاختبار الخطأ (يمكن تكييفه مع استجابة السيرفر)
      // this.errorMessage.set('البريد الإلكتروني أو كلمة المرور غير صحيحة');

      // عند النجاح
      this.router.navigate(['/']);
    }, 1500);
  }

  // تسجيل الدخول بواسطة جوجل (Google OAuth)
  loginWithGoogle(): void {
    console.log('Initiating Google OAuth login flow...');
    // توجيه المستخدم إلى رابط الـ Backend الخاص بـ OAuth
    // window.location.href = 'https://api.shoppygo.com/auth/google';
  }
}
