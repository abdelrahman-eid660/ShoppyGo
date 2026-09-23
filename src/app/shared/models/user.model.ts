export enum GenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}
export enum ProviderEnum {
  SYSTEM,
  GOOGLE,
}
export enum RoleEnum {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  SUPERVISOR = 'supervisor',
  USER = 'user',
}
export enum PermissionEnum {
  BRAND_CREATE = 'brand_create',
  BRAND_UPDATE = 'brand_update',
  BRAND_DELETE = 'brand_delete',
  BRAND_VIEW = 'brand_view',

  PRODUCT_CREATE = 'product_create',
  PRODUCT_UPDATE = 'product_update',
  PRODUCT_PUBLISH = 'product_publish',
  PRODUCT_UNPUBLISH = 'product_unpublish',
  PRODUCT_DELETE = 'product_delete',
  PRODUCT_VIEW = 'product_view',

  CATEGORY_CREATE = 'category_create',
  CATEGORY_UPDATE = 'category_update',
  CATEGORY_DELETE = 'category_delete',
  CATEGORY_VIEW = 'category_view',

  ORDER_CREATE = 'order_create',
  ORDER_UPDATE = 'order_update',
  ORDER_CHECKOUT = 'order_checkout',
  ORDER_CONFIRM = 'order_confirm',
  ORDER_CANCEL = 'order_cancel',
  ORDER_REFUND = 'order_refund',
  ORDER_REFUND_REQUEST = 'order_refund_request',
  ORDER_REJECT_REQUEST = 'order_reject_request',
  ORDER_VIEW = 'order_view',

  ACCOUNT_DELETE_SELF = 'account_delete_self',
  ACCOUNT_UPDATE_SELF = 'account_update_self',

  USER_VIEW = 'user_view',
  USER_UPDATE = 'user_update',
  USER_DELETE = 'user_delete',
  USER_BAN = 'user_ban',

  INVENTORY_VIEW = 'inventory_view',
  INVENTORY_UPDATE = 'inventory_update',
  INVENTORY_ADD = 'inventory_add',
  INVENTORY_DELETE = 'inventory_DELETE',

  INVENTORY_MOVEMENT_VIEW = 'inventory_movement_view',
  INVENTORY_MOVEMENT_DELETE = 'inventory_movement_DELETE',

  STOCK_ADJUSTMENT_VIEW = 'stock_adjustment_view',
  STOCK_ADJUSTMENT_UPDATE = 'stock_adjustment_update',
  STOCK_ADJUSTMENT_DELETE = 'stock_adjustment_delete',
  STOCK_ADJUSTMENT_CREATE = 'stock_adjustment_create',

  SUPPLIER_VIEW = 'supplier_view',
  SUPPLIER_UPDATE = 'supplier_update',
  SUPPLIER_DELETE = 'supplier_delete',
  SUPPLIER_ADD = 'supplier_add',

  PRODUCT_SUPPLIER_VIEW = 'product_supplier_view',
  PRODUCT_SUPPLIER_UPDATE = 'product_supplier_update',
  PRODUCT_SUPPLIER_DELETE = 'product_supplier_delete',
  PRODUCT_SUPPLIER_ADD = 'product_supplier_add',

  PURCHASE_PRODUCT_VIEW = 'purchase_product_view',
  PURCHASE_PRODUCT_UPDATE = 'purchase_product_update',
  PURCHASE_PRODUCT_DELETE = 'purchase_product_delete',
  PURCHASE_PRODUCT_ADD = 'purchase_product_add',

  BRAND_SUPPLIER_VIEW = 'brand_supplier_view',
  BRAND_SUPPLIER_UPDATE = 'brand_supplier_update',
  BRAND_SUPPLIER_DELETE = 'brand_supplier_delete',
  BRAND_SUPPLIER_ADD = 'brand_supplier_add',

  REVIEW_CREATE = 'review_create',
  REVIEW_UPDATE = 'review_update',
  REVIEW_DELETE = 'review_delete',
  REVIEW_VIEW = 'review_view',

  WAREHOUSE_CREATE = 'wareHouse_create',
  WAREHOUSE_UPDATE = 'wareHouse_update',
  WAREHOUSE_DELETE = 'wareHouse_delete',
  WAREHOUSE_VIEW = 'wareHouse_view',

  WAREHOUSE_TRANSFORM_CREATE = 'wareHouse_transform_create',
  WAREHOUSE_TRANSFORM_UPDATE = 'wareHouse_transform_update',
  WAREHOUSE_TRANSFORM_DELETE = 'wareHouse_transform_delete',
  WAREHOUSE_TRANSFORM_VIEW = 'wareHouse_transform_view',

  COUPON_CREATE = 'coupon_create',
  COUPON_UPDATE = 'coupon_update',
  COUPON_VIEW = 'coupon_view',

  SHIPPING_ZONE_CREATE = 'shipping_zone_create',
  SHIPPING_ZONE_UPDATE = 'shipping_zone_update',
  SHIPPING_ZONE_DELETE = 'shipping_zone_delete',
  SHIPPING_ZONE_VIEW = 'shipping_zone_view',

  CART_VIEW = 'cart_view',
  CART_ADD_ITEM = 'cart_add-item',
  CART_REMOVE_ITEM = 'cart_remove-item',
  CART_UPDATE_ITEM = 'cart_update-item',
  CART_CLEAR = 'cart_clear',

  PAYMENT_VIEW = 'payment_view', // view transaction

  AUDIT_LOG_VIEW = 'audit_log_view',
  AUDIT_LOG_REMOVE = 'audit_log_remove',

  FINANCIAL_MANAGE = 'financial_manage',

  ANALYTICES_MANAGE = 'analytices_manage',
  ANALYTICES_VIEW = 'analytices_view',

  REQUEST_REFUND = 'request_refund',
  REPORTS_VIEW = 'reports_view',

  SETTINGS_UPDATE = 'settings_update',
  SETTINGS_VIEW = 'settings_VIEW',
}
