import { Component, computed, inject, signal } from '@angular/core';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
// Types / Interfaces
export interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'placed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'card' | 'cod' | 'vodafone_cash';
  subtotal: number;
  shippingFee: number;
  discount?: number;
  totalAmount: number;
  itemsCount: number;
  shippingAddress?: {
    fullName: string;
    street: string;
    city: string;
    phone: string;
  };
  items?: OrderItem[];
}
@Component({
  selector: 'app-my-orders',
  imports: [TranslocoPipe],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.css',
})
export class MyOrders {
private translocoService = inject(TranslocoService);

  // States using Signals
  activeFilter = signal<'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled'>('all');
  isLoadingList = signal<boolean>(false);
  isLoadingDetails = signal<boolean>(false);

  // Modal & Selection State
  isModalOpen = signal<boolean>(false);
  selectedOrder = signal<Order | null>(null);

  // Mock List Data
  orders = signal<Order[]>([
    {
      id: 'ord-101',
      orderNumber: 'ORD-98234',
      date: '15 سبتمبر 2026',
      status: 'shipped',
      paymentMethod: 'card',
      subtotal: 1400,
      shippingFee: 50,
      discount: 0,
      totalAmount: 1450,
      itemsCount: 2,
      shippingAddress: {
        fullName: 'عبدالرحمن عيد',
        street: 'شارع التحرير، الدقي',
        city: 'القاهرة',
        phone: '01012345678'
      },
      items: [
        {
          id: 'p1',
          name: 'حذاء رياضي Running Pro',
          image: 'https://placehold.co/100x100',
          price: 900,
          quantity: 1,
          variant: 'مقاس: 42 | أسود'
        },
        {
          id: 'p2',
          name: 'حقيبة ظهر رياضية',
          image: 'https://placehold.co/100x100',
          price: 500,
          quantity: 1,
          variant: 'رمادي'
        }
      ]
    },
    {
      id: 'ord-102',
      orderNumber: 'ORD-98200',
      date: '10 سبتمبر 2026',
      status: 'delivered',
      paymentMethod: 'cod',
      subtotal: 750,
      shippingFee: 40,
      totalAmount: 790,
      itemsCount: 1,
      shippingAddress: {
        fullName: 'عبدالرحمن عيد',
        street: 'شارع النصر، مدينة نصر',
        city: 'القاهرة',
        phone: '01012345678'
      },
      items: [
        {
          id: 'p3',
          name: 'سماعة لاسلكية Bluetooth',
          image: 'https://placehold.co/100x100',
          price: 750,
          quantity: 1
        }
      ]
    }
  ]);

  // Filtered Orders List
  filteredOrders = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.orders();
    return this.orders().filter(o => o.status === filter);
  });

  // Change Filter Tab
  setFilter(filter: 'all' | 'processing' | 'shipped' | 'delivered' | 'cancelled'): void {
    this.activeFilter.set(filter);
  }

  // Fetch single order details & open Modal (1 API Request)
  fetchAndOpenDetails(orderId: string): void {
    this.isLoadingDetails.set(true);

    // محاكاة طلب الـ API لجلب تفاصيل الطلب بالكامل
    setTimeout(() => {
      const order = this.orders().find(o => o.id === orderId);
      if (order) {
        this.selectedOrder.set(order);
        this.isModalOpen.set(true);
      }
      this.isLoadingDetails.set(false);
    }, 300);
  }

  closeModal(): void {
    this.isModalOpen.set(false);
    this.selectedOrder.set(null);
  }

  // Order Stepper Status Checker
  isStepCompleted(step: 'placed' | 'processing' | 'shipped' | 'delivered'): boolean {
    const orderSteps = ['placed', 'processing', 'shipped', 'delivered'];
    const currentStatus = this.selectedOrder()?.status || 'placed';
    if (currentStatus === 'cancelled') return false;

    const currentIndex = orderSteps.indexOf(currentStatus);
    const targetIndex = orderSteps.indexOf(step);
    return targetIndex <= currentIndex;
  }

  // Cancel Order API Handler
  cancelOrder(orderId: string): void {
    if (confirm('هل أنت تأكد من إلغاء هذا الطلب؟')) {
      this.orders.update(list => list.map(item =>
        item.id === orderId ? { ...item, status: 'cancelled' } : item
      ));
      this.closeModal();
    }
  }

  downloadInvoice(orderNumber?: string): void {
    console.log('Downloading invoice for order:', orderNumber);
  }
}
