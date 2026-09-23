import { CurrencyPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
export interface WishlistItem {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
}
@Component({
  selector: 'app-wishlist',
  imports: [TranslocoPipe , RouterLink , CurrencyPipe],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist {
  wishlistItems = signal<WishlistItem[]>([
    {
      id: 'prod-101',
      title: 'سماعات لاسلكية عازلة للضوضاء High-Fi',
      category: 'إلكترونيات',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop',
      price: 1850,
      originalPrice: 2300,
      discountPercent: 20,
      rating: 4.8,
      reviewsCount: 142,
      inStock: true
    },
    {
      id: 'prod-102',
      title: 'ساعة ذكية مقاومة للملاء رياضة وأنشطة',
      category: 'إكسسوارات',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop',
      price: 1200,
      rating: 4.5,
      reviewsCount: 89,
      inStock: true
    },
    {
      id: 'prod-103',
      title: 'حقيبة ظهر جلدية مخصصة للاب توب والعمل',
      category: 'موضة وأزياء',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop',
      price: 950,
      originalPrice: 1100,
      discountPercent: 14,
      rating: 4.6,
      reviewsCount: 54,
      inStock: false
    }
  ]);

  // حذف منتج معين من المفضلة
  removeItem(itemId: string): void {
    this.wishlistItems.update(items => items.filter(item => item.id !== itemId));
  }

  // تفريغ قائمة المفضلة بالكامل
  clearAll(): void {
    this.wishlistItems.set([]);
  }

  // إضافة منتج واحد إلى السلة
  addToCart(item: WishlistItem): void {
    if (!item.inStock) return;
    console.log('Adding product to cart:', item);
    // يمكن استدعاء CartService هنا وإظهار توست (Toast alert)
  }

  // إضافة كافة المنتجات المتاحة إلى السلة
  addAllToCart(): void {
    const availableItems = this.wishlistItems().filter(item => item.inStock);
    console.log('Adding all available items to cart:', availableItems);
    // استدعاء CartService لإضافة المنتجات دفعة واحدة
  }
}
