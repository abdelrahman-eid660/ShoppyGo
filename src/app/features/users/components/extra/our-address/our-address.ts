import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
interface Branch {
  id: number;
  city: 'cairo' | 'giza' | 'alex';
  cityName: string;
  nameKey: string;
  addressKey: string;
  hoursKey: string;
  phone: string;
  mapsUrl: string;
  isMain?: boolean;
}
@Component({
  selector: 'app-our-address',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './our-address.html',
  styleUrl: './our-address.css',
})
export class OurAddress {
selectedCity = signal<string>('all');

  // قائمة الفروع في القاهرة والجيزة والإسكندرية
  branches = signal<Branch[]>([
    {
      id: 1,
      city: 'cairo',
      cityName: 'branches.city_cairo',
      nameKey: 'branches.b1_name',
      addressKey: 'branches.b1_address',
      hoursKey: 'branches.hours_standard',
      phone: '+20 2 2790 1234',
      mapsUrl: 'https://maps.google.com',
      isMain: true
    },
    {
      id: 2,
      city: 'cairo',
      cityName: 'branches.city_cairo',
      nameKey: 'branches.b2_name',
      addressKey: 'branches.b2_address',
      hoursKey: 'branches.hours_standard',
      phone: '+20 2 2415 5678',
      mapsUrl: 'https://maps.google.com'
    },
    {
      id: 3,
      city: 'giza',
      cityName: 'branches.city_giza',
      nameKey: 'branches.b3_name',
      addressKey: 'branches.b3_address',
      hoursKey: 'branches.hours_standard',
      phone: '+20 2 3748 9012',
      mapsUrl: 'https://maps.google.com'
    },
    {
      id: 4,
      city: 'giza',
      cityName: 'branches.city_giza',
      nameKey: 'branches.b4_name',
      addressKey: 'branches.b4_address',
      hoursKey: 'branches.hours_standard',
      phone: '+20 2 3835 4321',
      mapsUrl: 'https://maps.google.com'
    },
    {
      id: 5,
      city: 'alex',
      cityName: 'branches.city_alex',
      nameKey: 'branches.b5_name',
      addressKey: 'branches.b5_address',
      hoursKey: 'branches.hours_standard',
      phone: '+20 3 4876 543',
      mapsUrl: 'https://maps.google.com'
    },
    {
      id: 6,
      city: 'alex',
      cityName: 'branches.city_alex',
      nameKey: 'branches.b6_name',
      addressKey: 'branches.b6_address',
      hoursKey: 'branches.hours_standard',
      phone: '+20 3 5432 109',
      mapsUrl: 'https://maps.google.com'
    }
  ]);

  // Computed Signal لتصفية الفروع تلقائياً
  filteredBranches = computed(() => {
    const city = this.selectedCity();
    if (city === 'all') {
      return this.branches();
    }
    return this.branches().filter(b => b.city === city);
  });

  filterByCity(city: string): void {
    this.selectedCity.set(city);
  }
}
