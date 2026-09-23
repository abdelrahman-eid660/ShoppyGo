import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-shipping-handling',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './shipping-handling.html',
  styleUrl: './shipping-handling.css',
})
export class ShippingHandling {}
