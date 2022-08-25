/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@ecommerce-brands/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export class CategoriesFormComponent implements OnInit {

  form: FormGroup;
  isSubmitted: boolean = false;
  editMode: boolean = false;
  currentCategoryId: string = '';

  constructor(
        private location: Location,
        private messageService: MessageService ,
        private formBuilder: FormBuilder,
        private categoriesService: CategoriesService,
        private route: ActivatedRoute
        ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required],
      color: ['#fff']
    });

    this._checkEditMode();

  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }

    const category : Category = {
      id: this.currentCategoryId,
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value,
      color: this.form.controls['color'].value
    }

    if(this.editMode) {
        this._editCategory(category);
    }else {
        this._addCategory(category);
    }


    console.log(this.form.controls['name'].value);
    console.log(this.form.controls['icon'].value);
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).subscribe((category: Category) => {
      this.messageService.add({
              severity:'success',
              summary:'Success', 
              detail:`Category ${category.name} added successfully`
            });

      timer(1500).toPromise().then( done => {
        this.location.back()
      });
    },
    (error) => {
      this.messageService.add({
              severity:'error', 
              summary:'Error', 
              detail:`Category is not added`
            });
    });
  }

  private _editCategory(category: Category) {
    this.categoriesService.updateCategory(category).subscribe((category: Category) => {
      this.messageService.add({
              severity:'success', 
              summary:'Success', 
              detail:`Category ${category.name} updated successfully`
            });

      timer(1500).toPromise().then( done => {
        this.location.back()
      });
    },
    (error) => {
      this.messageService.add({
              severity:'error', 
              summary:'Error', 
              detail:`Category is not updated`
            });
    });
  }


  private _checkEditMode() {
    this.route.params.subscribe(params => {
      if(params['id']) {
        this.editMode = true;
        this.currentCategoryId = params['id'];
        this.categoriesService.getCategory(params['id']).subscribe(category => {
          this.form.controls['name'].setValue(category.name);
          this.form.controls['icon'].setValue(category.icon);
          this.form.controls['color'].setValue(category.color);
        })
      }
    })
  }

}
