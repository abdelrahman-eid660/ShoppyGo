import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-forget-password',
  imports: [TranslocoPipe , RouterLink , ReactiveFormsModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPassword {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Angular Signals لإدارة حالات الصفحة
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  isSubmittedSuccess = signal<boolean>(false);

  // نموذج إدخال البريد الإلكتروني
  forgetPasswordForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgetPasswordForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.forgetPasswordForm.invalid) {
      this.forgetPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.isSubmittedSuccess.set(false);

    const { email } = this.forgetPasswordForm.value;
    console.log('Requesting password reset for:', email);

    // محاكاة الاتصال بالـ Backend API
    setTimeout(() => {
      this.isLoading.set(false);
      this.isSubmittedSuccess.set(true);

      // التوجيه لصفحة الـ OTP بعد ثانيتين لنقل المستخدم للخطوة التالية
      setTimeout(() => {
        this.router.navigate(['/auth/confirm-otp'], { queryParams: { email } });
      }, 2000);
    }, 1500);
  }
}
