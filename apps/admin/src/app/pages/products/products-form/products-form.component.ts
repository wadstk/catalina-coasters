import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute} from '@angular/router';
import { CategoriesService, Category, ProductsService, Product } from '@catalina-coasters/products';
import { ConfirmationService, MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent implements OnInit, OnDestroy {
  editmode = false;
  form!: FormGroup;
  isSubmitted = false;
  categories:Array<Category> = [];
  imageDisplay: string | ArrayBuffer;
  currentProductId!: string;
  endsub$: Subject<any> = new Subject();

  constructor(private formBuilder: FormBuilder,
              private categoriesService: CategoriesService,
              private productService: ProductsService,
              private messageService: MessageService,
              private location: Location,
              private router: ActivatedRoute,
              private confirmationService: ConfirmationService
              ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCategories();
    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
        productFormData.append(key,this.productForm[key].value);
    });
    if(this.editmode) {
      this._updateProduct(productFormData);
    }
    else {
      this._addProduct(productFormData);
    }
  }

  onCancel() { return;}


  onImageUpload(event) {
    const file = event.target.files[0];
    if(file) {
      this.form.patchValue({image: file});
      this.form.get('image').updateValueAndValidity();
          
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      }
      fileReader.readAsDataURL(file);
    }
  }

  private _initForm() {
    this.form = this.formBuilder.group({
        name: ['', Validators.required],
        brand: ['', Validators.required],
        price: ['', Validators.required],
        category: ['', Validators.required],
        countInStock: ['', Validators.required],
        description: ['', Validators.required],
        richDescription: [''],
        image: ['', Validators.required],
        isFeatured: [false]
    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().pipe(takeUntil(this.endsub$)).subscribe((categories) => {
      this.categories = categories;
    });
  }

    private _addProduct(productData: FormData) {
    this.productService.createProduct(productData).pipe(takeUntil(this.endsub$))
    .subscribe(
      (product: Product) => {
      this.messageService.add({
      severity:'success', 
      summary:'Service Message', 
      detail: `Product ${product.name} is created`
    });

      //Go back to categorires after clean post
      timer(2000).toPromise().then(() => {
        this.location.back();
      });
    }, 
    () => {
      this.messageService.add({
      severity:'error', 
      summary:'Service Message', 
      detail:'Product is NOT created'});

    });
  }

  private _updateProduct(productFormData: FormData) {
    this.productService.updateProduct(productFormData, this.currentProductId).pipe(takeUntil(this.endsub$))
    .subscribe(() => {
      this.messageService.add({
      severity:'success', 
      summary:'Service Message', 
      detail:'Product is updated'});

      //Go back to categorires after clean post
      timer(2000).toPromise().then(() => {
        this.location.back();
      });
    }, 
    () => {
      this.messageService.add({
      severity:'error', 
      summary:'Service Message', 
      detail:'Product is NOT updated'});
    });
  }
  

  private _checkEditMode() {
    this.router.params.pipe(takeUntil(this.endsub$))
    .subscribe(params => {
      if(params.id) {
        this.editmode = true;
        this.currentProductId = params.id;
        this.productService.getProduct(params.id).subscribe(product => {
          this.productForm.name.setValue(product.name);
          this.productForm.category.setValue(product.category.id);
          this.productForm.brand.setValue(product.brand);
          this.productForm.price.setValue(product.price);
          this.productForm.countInStock.setValue(product.countInStock);
          this.productForm.isFeatured.setValue(product.isFeatured);
          this.productForm.description.setValue(product.description);
          this.productForm.richDescription.setValue(product.richDescription);
          this.imageDisplay = product.image;
          this.productForm.image.setValidators([]);
          this.productForm.image.updateValueAndValidity();

        });
      }
    })
  }

  get productForm() {
    return this.form.controls;
  }

}
