import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-return-request',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './return-request.html',
  styleUrl: './return-request.css',
})
export class ReturnRequest {}
