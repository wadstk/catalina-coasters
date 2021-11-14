import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }    from '@angular/forms';
import { ProductsSearchComponent } from './components/products-search/products-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import {ButtonModule} from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import {CheckboxModule} from 'primeng/checkbox';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import {UiModule} from '@catalina-coasters/ui';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';


const routes: Routes =[
  {
    path:'products',
    component: ProductsListComponent
  },
  {
    path:'category/:categoryid',
    component: ProductsListComponent
  },
  {
    path:'products/:productid',
    component: ProductDetailComponent
  }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), 
              ButtonModule, CheckboxModule, FormsModule, RatingModule, InputNumberModule, UiModule, ToastModule],
    declarations: [
      ProductsSearchComponent,
      CategoriesBannerComponent,
      ProductItemComponent,
      FeaturedProductsComponent,
      ProductsListComponent,
      ProductDetailComponent
    ],
    providers: [MessageService],
    exports: [ProductsSearchComponent, CategoriesBannerComponent, ProductItemComponent, FeaturedProductsComponent, ProductsListComponent, ProductDetailComponent]
})
export class ProductsModule {}
