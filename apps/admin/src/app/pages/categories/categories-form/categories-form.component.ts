import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@catalina-coasters/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  isSubmitted = false;
  editmode = false;
  currentCategoryId!: string;
  endsub$: Subject<any> = new Subject();

  constructor(private messageService: MessageService,
              private formBuilder: FormBuilder, 
              private categoriesService: CategoriesService,
              private location: Location,
              private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();
  }

  ngOnDestroy() {
    this.endsub$.next();
    this.endsub$.complete();
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }
    const category: Category = {
      id: this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value
    }

    if(this.editmode) {
      this._updateCategory(category);

    }
    else {
      this._addCategory(category);
    }
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).pipe(takeUntil(this.endsub$))
    .subscribe(
      (category: Category) => {
      this.messageService.add({
      severity:'success', 
      summary:'Service Message', 
      detail: `Category ${category.name} is created`
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
      detail:'Category is NOT created'});

    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).pipe(takeUntil(this.endsub$))
    .subscribe(() => {
      this.messageService.add({
      severity:'success', 
      summary:'Service Message', 
      detail:'Category is updated'});

      //Go back to categorires after clean post
      timer(2000).toPromise().then(() => {
        this.location.back();
      });
    }, 
    () => {
      this.messageService.add({
      severity:'error', 
      summary:'Service Message', 
      detail:'Category is NOT updated'});

    });
  }

  private _checkEditMode() {
    this.router.params.pipe(takeUntil(this.endsub$))
    .subscribe(params => {
      if(params.id) {
        this.editmode = true;
        this.currentCategoryId = params.id;
        this.categoriesService.getCategory(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        });
      }
    })
  }

  get categoryForm() {
    return this.form.controls;
  }

}
