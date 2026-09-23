import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
interface StatItem {
  key: string;
  value: string;
  icon: string;
}
@Component({
  selector: 'app-about',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  stats = signal<StatItem[]>([
    { key: 'customers', value: '50K+', icon: 'fa-solid fa-users' },
    { key: 'products', value: '10K+', icon: 'fa-solid fa-boxes-stacked' },
    { key: 'warehouses', value: '15+', icon: 'fa-solid fa-warehouse' },
    { key: 'orders', value: '120K+', icon: 'fa-solid fa-truck-ramp-box' }
  ]);
}
