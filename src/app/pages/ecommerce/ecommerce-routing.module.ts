import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EcommerceComponent } from './ecommerce.component';
import { ProductsComponent } from './products/products.component';
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersDetailComponent } from './orders-detail/orders-detail.component';
import { CustomersComponent } from './customers/customers.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
    { path: '', component: EcommerceComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'products-detail', component: ProductsDetailComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'orders-detail', component: OrdersDetailComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EcommerceRoutingModule { }