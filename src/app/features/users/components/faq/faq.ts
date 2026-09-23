import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
export interface FaqItem {
  id: string;
  category: 'shipping' | 'payment' | 'returns' | 'account';
}

export interface CategoryTab {
  id: string;
  icon: string;
}
@Component({
  selector: 'app-faq',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  private translocoService = inject(TranslocoService);

  searchQuery = signal<string>('');
  selectedCategory = signal<string>('all');
  openFaqId = signal<string | null>('orders_delivery');

  categories: CategoryTab[] = [
    { id: 'all', icon: 'fa-solid fa-border-all' },
    { id: 'shipping', icon: 'fa-solid fa-truck-fast' },
    { id: 'payment', icon: 'fa-solid fa-credit-card' },
    { id: 'returns', icon: 'fa-solid fa-rotate-left' },
    { id: 'account', icon: 'fa-solid fa-user-shield' }
  ];

  allFaqs: FaqItem[] = [
    { id: 'orders_delivery', category: 'shipping' },
    { id: 'track_order', category: 'shipping' },
    { id: 'payment_methods', category: 'payment' },
    { id: 'cash_on_delivery', category: 'payment' },
    { id: 'return_policy', category: 'returns' },
    { id: 'refund_time', category: 'returns' },
    { id: 'create_account', category: 'account' },
    { id: 'reset_password', category: 'account' }
  ];

  filteredFaqs = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const cat = this.selectedCategory();

    return this.allFaqs.filter(faq => {
      const matchesCat = cat === 'all' || faq.category === cat;
      if (!query) return matchesCat;
      const questionText = this.translocoService.translate(`faq.items.${faq.id}.question`).toLowerCase();
      const answerText = this.translocoService.translate(`faq.items.${faq.id}.answer`).toLowerCase();
      const matchesQuery = questionText.includes(query) || answerText.includes(query);
      return matchesCat && matchesQuery;
    });
  });

  toggleFaq(id: string): void {
    this.openFaqId.update(current => (current === id ? null : id));
  }

  setCategory(catId: string): void {
    this.selectedCategory.set(catId);
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedCategory.set('all');
  }
}
