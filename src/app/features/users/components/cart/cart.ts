import { CurrencyPipe, NgIf } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
export interface CartItem {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
  stockQuantity: number;
  selectedVariant?: string;
}
@Component({
  selector: 'app-cart',
  imports: [TranslocoPipe ,RouterLink , CurrencyPipe , NgIf],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  readonly FREE_SHIPPING_THRESHOLD = 2000;
  readonly DEFAULT_SHIPPING_COST = 80;
  readonly TAX_RATE = 0.14; // 14% ضريبة القيمة المضافة

  // عناصر السلة مقادة بـ Signal
  cartItems = signal<CartItem[]>([
    {
      id: 'prod-101',
      title: 'سماعات لاسلكية عازلة للضوضاء High-Fi',
      category: 'إلكترونيات',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
      price: 1850,
      quantity: 1,
      stockQuantity: 5,
      selectedVariant: 'أسود مطفي'
    },
    {
      id: 'prod-102',
      title: 'ساعة ذكية مقاومة للماء رياضة وأنشطة',
      category: 'إكسسوارات',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
      price: 1200,
      quantity: 2,
      stockQuantity: 10,
      selectedVariant: 'حزام سيليكون رمادي'
    }
  ]);

  // أكواد الخصم والكوبونات
  couponCode = signal<string>('');
  appliedCouponCode = signal<string>('');
  discountRate = signal<number>(0); // نسبة الخصم (0.1 = 10%)

  // الحسابات التلقائية باستخدام Computed Signals
  totalItemsCount = computed(() =>
    this.cartItems().reduce((acc, item) => acc + item.quantity, 0)
  );

  subtotal = computed(() =>
    this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0)
  );

  discountAmount = computed(() =>
    this.subtotal() * this.discountRate()
  );

  remainingForFreeShipping = computed(() => {
    const remaining = this.FREE_SHIPPING_THRESHOLD - this.subtotal();
    return remaining > 0 ? remaining : 0;
  });

  freeShippingProgress = computed(() => {
    const progress = (this.subtotal() / this.FREE_SHIPPING_THRESHOLD) * 100;
    return Math.min(progress, 100);
  });

  shippingCost = computed(() =>
    this.subtotal() >= this.FREE_SHIPPING_THRESHOLD ? 0 : this.DEFAULT_SHIPPING_COST
  );

  estimatedTax = computed(() =>
    (this.subtotal() - this.discountAmount()) * this.TAX_RATE
  );

  grandTotal = computed(() =>
    (this.subtotal() - this.discountAmount()) + this.shippingCost() + this.estimatedTax()
  );

  isCouponApplied = computed(() => !!this.appliedCouponCode());

  // تعديل الكمية
  updateQuantity(itemId: string, change: number): void {
    this.cartItems.update(items =>
      items.map(item => {
        if (item.id === itemId) {
          const newQty = item.quantity + change;
          if (newQty >= 1 && newQty <= item.stockQuantity) {
            return { ...item, quantity: newQty };
          }
        }
        return item;
      })
    );
  }

  // حذف عنصر
  removeItem(itemId: string): void {
    this.cartItems.update(items => items.filter(item => item.id !== itemId));
  }

  // تفريغ السلة
  clearCart(): void {
    this.cartItems.set([]);
  }

  // إدخال الكوبون
  onCouponInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.couponCode.set(input.value);
  }

  // تطبيق الكوبون
  applyCoupon(): void {
    const code = this.couponCode().trim().toUpperCase();
    if (code === 'SHOPPY10') {
      this.discountRate.set(0.10); // خصم 10%
      this.appliedCouponCode.set(code);
    } else if (code === 'EXPERT20') {
      this.discountRate.set(0.20); // خصم 20%
      this.appliedCouponCode.set(code);
    } else {
      alert('كوبون غير صالحة! جرب SHOPPY10');
    }
  }

  // إزالة الكوبون
  removeCoupon(): void {
    this.couponCode.set('');
    this.appliedCouponCode.set('');
    this.discountRate.set(0);
  }

  // الانتقال لصفحة الدفع
  proceedToCheckout(): void {
    console.log('Proceeding to checkout with total:', this.grandTotal());
    // Navigate to /checkout
  }
}
