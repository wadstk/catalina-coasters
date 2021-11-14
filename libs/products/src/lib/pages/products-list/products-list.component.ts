import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category, Product, ProductsService } from '@catalina-coasters/products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [
  ]
})
export class ProductsListComponent implements OnInit {


  products: Product[] = [];
  categories: Category[] = [];
  isCategoryPage!: boolean;
  constructor(private productService: ProductsService,
              private catService: CategoriesService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      params.categoryid ? this._getProducts([params.categoryid]) : this._getProducts();
      params.categoryid ? (this.isCategoryPage = true) : (this.isCategoryPage = false);

    });

    this._getCategories();
  }

  private _getProducts(categoriesFilter?: string[]) {
    this.productService.getProducts(categoriesFilter).subscribe((resProducts) => {
      this.products = resProducts;

    });
  }

  private _getCategories() {
    this.catService.getCategories().subscribe((resCategories) => {
      this.categories= resCategories;

    });
  }

  categoryFilter() {
    const selectedCategories = this.categories
          .filter(category => category.checked)
          .map(category => category.id);
    
    
    this._getProducts(selectedCategories);
    
    
  }

}
