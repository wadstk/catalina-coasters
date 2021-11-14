import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesListComponent } from './pages/categories/categories-list/categories-list.component';
import { ProductsListComponent } from './pages/products/products-list/products-list.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpClientModule} from '@angular/common/http';
import { CategoriesService} from '@catalina-coasters/products';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import {InputTextModule} from 'primeng/inputtext'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmationService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ColorPickerModule} from 'primeng/colorpicker';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputSwitchModule} from 'primeng/inputswitch';
import {DropdownModule} from 'primeng/dropdown';
import {EditorModule} from 'primeng/editor';
import {PaginatorModule} from 'primeng/paginator';
import { UserListComponent } from './pages/users/user-list/user-list.component';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { TagModule } from 'primeng/tag';
import {InputMaskModule} from 'primeng/inputmask';
import { OrdersListComponent } from './pages/orders/orders-list/orders-list.component';
import { OrdersDetailComponent } from './pages/orders/orders-detail/orders-detail.component';
import {FieldsetModule} from 'primeng/fieldset';
import {JwtInterceptor, UsersModule } from '@catalina-coasters/users';
import {AppRoutingModule} from './app-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import {NgxStripeModule} from 'ngx-stripe';


const UX_MODULE = [
    CardModule, 
    ToolbarModule,
    ButtonModule,
    TableModule,
    HttpClientModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ConfirmDialogModule,
    ColorPickerModule,
    InputNumberModule,
    InputTextareaModule,
    InputSwitchModule,
    DropdownModule,
    EditorModule,
    PaginatorModule,
    TagModule,
    InputMaskModule,
    FieldsetModule
]




@NgModule({
    declarations: [AppComponent, DashboardComponent, ShellComponent, SidebarComponent, CategoriesListComponent, CategoriesFormComponent, ProductsListComponent, ProductsFormComponent, UserListComponent, UserFormComponent, OrdersListComponent, OrdersDetailComponent],
    imports: [BrowserModule,
              BrowserAnimationsModule, 
              UsersModule,
              AppRoutingModule,
              StoreModule.forRoot({}),
              EffectsModule.forRoot([]),
              NgxStripeModule.forRoot('pk_test_51JulQCG6LpRfkO9S32CxcSHwDhiyXFaZ44oqQtXxi4Ad39bJRwL7JXHjjlZ0PZ04JyCZgMMDvwr20cX41D50CC1b008DyEQfQv'),       
              ...UX_MODULE
    ],
    providers: [CategoriesService, MessageService, ConfirmationService,
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
