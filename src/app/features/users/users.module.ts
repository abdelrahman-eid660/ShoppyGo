import { RouterModule, Routes } from "@angular/router";
import { UserLayout } from "./layout/user-layout/user-layout";
import { Home } from "./components/home/home";
import { Store } from "./components/store/store";
import { Brands } from "./components/brands/brands";
import { Categories } from "./components/categories/categories";
import { Contact } from "./components/contact/contact";
import { Cart } from "./components/cart/cart";
import { Wishlist } from "./components/wishlist/wishlist";
import { UserAccount } from "./components/user-account/user-account";
import { General } from "./components/user-account/profile/general/general";
import { MyOrders } from "./components/user-account/profile/my-orders/my-orders";
import { ProfileSettings } from "./components/user-account/profile/profile-settings/profile-settings";
import { UserNotifications } from "./components/user-account/profile/user-notifications/user-notifications";
import { NgModule } from "@angular/core";
import { UserError } from "./shared/user-error/user-error";
import { UserSignup } from "./components/user-account/user-signup/user-signup";
import { UserLogin } from "./components/user-account/user-login/user-login";
import { UserOtp } from "./components/user-account/user-otp/user-otp";
import { About } from "./components/about/about";
import { Faq } from "./components/faq/faq";
import { ShippingHandling } from "./components/extra/shipping-handling/shipping-handling";
import { ReturnRequest } from "./components/user-account/return-request/return-request";
import { TermsOfUse } from "./components/extra/terms-of-use/terms-of-use";
import { HelpCenter } from "./components/extra/help-center/help-center";
import { ReturnPolicy } from "./components/extra/return-policy/return-policy";
import { PrivacyPolicy } from "./components/extra/privacy-policy/privacy-policy";
import { TermsConditions } from "./components/extra/terms-conditions/terms-conditions";
import { OurAddress } from "./components/extra/our-address/our-address";
import { ForgetPassword } from "./components/user-account/forget-password/forget-password";

const routes : Routes = [
  {
    path : '' , component : UserLayout , children : [
      {path : 'home' , component : Home , title : 'الصفحة الرئيسية'},
      {path : 'store' , component : Store , title : 'المتجر'},
      {path : 'categories' , component : Categories , title : 'الأقسام'},
      {path : 'brands' , component : Brands , title : 'البرندات'},
      {path : 'about' , component : About , title : 'من نحن'},
      {path : 'contact' , component : Contact , title : 'التواصل'},
      {path : 'faq' , component : Faq , title : 'الأسئلة الشائعة'},
      {path : 'wishlist' , component : Wishlist , title : 'المفضلة'},
      {path : 'cart' , component : Cart , title : 'العربة'},
      {path : 'auth/signup' , component : UserSignup , title : 'انشاء حساب'},
      {path : 'auth/login' , component : UserLogin ,title : 'تسجيل دخول'},
      {path : 'auth/confirm-otp' , component : UserOtp ,title : 'تاكيد رمز التحقق'},
      {path : 'auth/forget-password' , component : ForgetPassword , title : 'نسيت كلمة المرور'},
      {path : 'Shipping-handling' , component : ShippingHandling ,title : 'الشحن و التسليم'},
      {path : 'help-center' , component : HelpCenter ,title : 'مركز المساعدة'},
      {path : 'terms-of-use' , component : TermsOfUse ,title : 'شروط الاستخدام'},
      {path : 'return-policy' , component : ReturnPolicy ,title : 'سياسة الاسترجاع'},
      {path : 'privacy-policy' , component : PrivacyPolicy ,title : 'سياسة الخصوصية'},
      {path : 'terms-conditions' , component : TermsConditions ,title : 'البنود و الظروف'},
      {path : 'our-address' , component : OurAddress ,title : 'عناويننا'},
      {path : '' , redirectTo : 'home' , pathMatch : 'full' , title : ' '},
    ]
  },
  {
    path : 'user-account' , component : UserAccount , title : 'حسابي' , children : [
      {path : '' , redirectTo : 'general' , pathMatch : 'full' , title : 'عام'},
      {path : 'general' , component : General , title : 'عام'},
      {path : 'my-orders' , component : MyOrders , title : 'اورداراتي'},
      {path : 'return-request' , component : ReturnRequest , title : 'طلب إسترجاع'},
      {path : 'profile-settings' , component : ProfileSettings , title : 'الأعدادت'},
      {path : 'user-notifications' , component : UserNotifications , title : 'اشعاراتي'},
    ]
  },
  {
    path : '**' , component : UserError , title : 'خطاء'
  }

]
@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class UserModule{}
