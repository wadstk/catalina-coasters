import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {CategoriesService, Category} from '@catalina-coasters/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [
  ]
})
export class CategoriesListComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endsub$: Subject<any> = new Subject();

  constructor(private categoriesService: CategoriesService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router) { }

  ngOnInit(): void {
    this._getCategories();
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  deleteCategory(categoryId : string) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).pipe(takeUntil(this.endsub$))
        .subscribe(() => {
          this._getCategories();
          this.messageService.add({
            severity:'success', 
            summary:'Service Message', 
            detail:'Category is deleted'});
          }, 
          () => {
            this.messageService.add({
            severity:'error', 
            summary:'Service Message', 
            detail:'Category is NOT deleted'});
      
          });
      },
      reject: () => {return;}
    });
  }

  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`categories/form/${categoryid}`);
  }


  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsub$)).subscribe( cats => {
      this.categories = cats;
    });
  }
}
