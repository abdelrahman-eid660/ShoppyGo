import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
interface NotificationItem {
  id: string;
  message: string;
  time: string;
  type: 'order' | 'promo' | 'system';
  icon: string;
  isRead: boolean;
}

interface RecentOrder {
  id: string;
  orderNumber: string;
  date: string;
  total: number;
  statusText: string;
  statusClass: string;
}
@Component({
  selector: 'app-general',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './general.html',
  styleUrl: './general.css',
})
export class General {
  userName = signal<string>('عبدالرحمن');

  // الإحصائيات السريعة
  stats = signal({
    totalOrders: 12,
    pendingOrders: 2,
    Return_requests: 0,
  });

  // أحدث 5 إشعارات فقط للنافذة الجانبية
  recentNotifications = signal<NotificationItem[]>([
    {
      id: '1',
      message: 'تم شحن طلبك رقم #SHP-8921 بنجاح وهو في الطريق إليك.',
      time: 'منذ 15 دقيقة',
      type: 'order',
      icon: 'fa-solid fa-truck-ramp-box',
      isRead: false
    },
    {
      id: '2',
      message: 'حصلت على خصم 20% لفترة محدودة على المنتجات الإلكترونية.',
      time: 'منذ ساعتين',
      type: 'promo',
      icon: 'fa-solid fa-tags',
      isRead: false
    },
    {
      id: '3',
      message: 'تم تأكيد طلبك رقم #SHP-8921 وجاري تجهيزه.',
      time: 'منذ يوم واحد',
      type: 'order',
      icon: 'fa-solid fa-circle-check',
      isRead: true
    },
    {
      id: '4',
      message: 'تم إضافة 100 نقطة ولاء إلى حسابك بناءً على تقييمك للأجهزة.',
      time: 'منذ يومين',
      type: 'system',
      icon: 'fa-solid fa-award',
      isRead: true
    },
    {
      id: '5',
      message: 'تم تسجيل دخول جديد إلى حسابك من متصفح جديد.',
      time: 'منذ 3 أيام',
      type: 'system',
      icon: 'fa-solid fa-shield-halved',
      isRead: true
    }
  ]);

  // حساب عدد الإشعارات غير المقروءة
  unreadNotificationsCount = signal<number>(
    this.recentNotifications().filter(n => !n.isRead).length
  );

  // ملخص أحدث الطلبات
  recentOrders = signal<RecentOrder[]>([
    {
      id: '101',
      orderNumber: 'SHP-8921',
      date: '12 سبتمبر 2026',
      total: 1250,
      statusText: 'قيد الشحن',
      statusClass: 'processing'
    },
    {
      id: '102',
      orderNumber: 'SHP-7740',
      date: '28 أغسطس 2026',
      total: 3400,
      statusText: 'تم التسليم',
      statusClass: 'delivered'
    }
  ]);
}
