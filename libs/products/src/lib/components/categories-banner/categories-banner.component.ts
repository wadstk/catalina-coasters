import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styles: [
  ]
})
export class CategoriesBannerComponent implements OnInit, OnDestroy {

  categories: Category[] = [];
  endsub$ : Subject<any> = new Subject();
  constructor(
    private categoriesService : CategoriesService
    ) { }

  ngOnInit(): void {
    this.categoriesService
      .getCategories()
      .pipe(takeUntil(this.endsub$))
      .subscribe((cats) => {
        this.categories = cats;
    }); 
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

}
