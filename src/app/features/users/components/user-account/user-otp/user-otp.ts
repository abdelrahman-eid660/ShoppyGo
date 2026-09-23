import { Component, computed, ElementRef, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { AuthService } from '../../../../../core/service/auth.service';

@Component({
  selector: 'app-user-otp',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './user-otp.html',
  styleUrl: './user-otp.css',
})
export class UserOtp {
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  private router = inject(Router);
  private authService = inject(AuthService);

  otpDigits = signal<string[]>(['', '', '', '', '', '']);
  timer = signal<number>(60);
  canResend = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  private intervalId: any = null;

  // Computed Signal للتتحقق من اكتمال الـ 6 أرقام
  isOtpComplete = computed(() => {
    return this.otpDigits().every(digit => digit.trim() !== '');
  });

  timerFormatted = computed(() => {
    const totalSeconds = this.timer();
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  });

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  startTimer(): void {
    this.canResend.set(false);
    this.timer.set(60);
    this.clearTimer();

    this.intervalId = setInterval(() => {
      this.timer.update(prev => {
        if (prev <= 1) {
          this.clearTimer();
          this.canResend.set(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  private clearTimer(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // التنقل التلقائي للخانة التالية
  onDigitInput(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/[^0-9]/g, '');

    const currentDigits = [...this.otpDigits()];
    currentDigits[index] = value;
    this.otpDigits.set(currentDigits);

    input.value = value;

    if (value && index < 5) {
      const nextInput = this.otpInputs.toArray()[index + 1]?.nativeElement;
      if (nextInput) nextInput.focus();
    }
  }

  // الرجوع للخانة السابقة عند الضغط على Backspace
  onKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Backspace') {
      if (!this.otpDigits()[index] && index > 0) {
        const prevInput = this.otpInputs.toArray()[index - 1]?.nativeElement;
        if (prevInput) prevInput.focus();
      }
    }
  }

  // معالجة اللصق المباشر (Paste)
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
    const clipboardData = event.clipboardData?.getData('text') || '';
    const pastedDigits = clipboardData.replace(/[^0-9]/g, '').slice(0, 6).split('');

    if (pastedDigits.length === 0) return;

    const currentDigits = ['', '', '', '', '', ''];
    pastedDigits.forEach((digit, i) => {
      currentDigits[i] = digit;
      const inputEl = this.otpInputs.toArray()[i]?.nativeElement;
      if (inputEl) inputEl.value = digit;
    });

    this.otpDigits.set(currentDigits);

    const focusIndex = Math.min(pastedDigits.length, 5);
    this.otpInputs.toArray()[focusIndex]?.nativeElement.focus();
  }

  onSubmit(): void {
    if (!this.isOtpComplete()) return;

    this.isLoading.set(true);
    const code = this.otpDigits().join('');
    console.log('Verifying OTP Code:', code);

    // محاكاة الاتصال بالـ Backend API

      this.isLoading.set(false);
      // التوجيه للرئيسية أو صفحة إعادة تعيين كلمة المرور
      this.router.navigate(['/']);
  }

  resendOtp(): void {
    if (!this.canResend()) return;

    // تفريغ الخانات والتركيز على الخانة الأولى
    this.otpDigits.set(['', '', '', '', '', '']);
    this.otpInputs.forEach(input => (input.nativeElement.value = ''));
    this.otpInputs.first?.nativeElement.focus();

    this.startTimer();
    console.log('Resending OTP...');
  }
}
