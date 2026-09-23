import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-return-policy',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './return-policy.html',
  styleUrl: './return-policy.css',
})
export class ReturnPolicy {}
