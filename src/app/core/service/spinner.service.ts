import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  busyRequest = 0;
  private readonly spinner = inject(NgxSpinnerService);
  show() {
    this.busyRequest++;
    this.spinner.show();
  }
  hide() {
    this.busyRequest--;
    if (this.busyRequest === 0) {
      setTimeout(() => {
        if (this.busyRequest === 0) {
          this.spinner.hide();
        }
      }, 500);
    }
  }
}
