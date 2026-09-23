import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
export interface NotificationItem {
  id: string;
  type: 'order' | 'promo' | 'system' | 'alert';
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
  actionUrl?: string;
}
@Component({
  selector: 'app-user-notifications',
  imports: [RouterLink , TranslocoPipe],
  templateUrl: './user-notifications.html',
  styleUrl: './user-notifications.css',
})
export class UserNotifications {
  // الفلتر المختار حالياً
  selectedFilter = signal<'all' | 'unread' | 'order' | 'system'>('all');

  // قائمة الإشعارات
  notifications = signal<NotificationItem[]>([
    {
      id: '1',
      type: 'order',
      title: 'profile.notifications.items.order_shipped_title',
      message: 'profile.notifications.items.order_shipped_msg',
      createdAt: 'منذ 10 دقائق',
      isRead: false,
      actionUrl: '/user/user-account/my-orders'
    },
    {
      id: '2',
      type: 'promo',
      title: 'profile.notifications.items.promo_title',
      message: 'profile.notifications.items.promo_content',
      createdAt: 'منذ ساعتين',
      isRead: false
    },
    {
      id: '3',
      type: 'system',
      title: 'profile.notifications.items.security_title',
      message: 'profile.notifications.items.security_msg',
      createdAt: 'أمس',
      isRead: true
    }
  ]);

  // عدد الإشعارات غير المقروءة (محتسب تلقائياً)
  unreadCount = computed(() => {
    return this.notifications().filter(item => !item.isRead).length;
  });

  // الإشعارات المفلترة حسب الفلتر المختار
  filteredNotifications = computed(() => {
    const filter = this.selectedFilter();
    const list = this.notifications();

    if (filter === 'unread') return list.filter(item => !item.isRead);
    if (filter === 'order') return list.filter(item => item.type === 'order');
    if (filter === 'system') return list.filter(item => item.type === 'system' || item.type === 'alert');
    return list;
  });

  setFilter(filter: 'all' | 'unread' | 'order' | 'system'): void {
    this.selectedFilter.set(filter);
  }

  markAsRead(id: string): void {
    this.notifications.update(list =>
      list.map(item => (item.id === id ? { ...item, isRead: true } : item))
    );
  }

  markAllAsRead(): void {
    this.notifications.update(list =>
      list.map(item => ({ ...item, isRead: true }))
    );
  }

  deleteNotification(id: string): void {
    this.notifications.update(list => list.filter(item => item.id !== id));
  }

  clearAll(): void {
    this.notifications.set([]);
  }
}
