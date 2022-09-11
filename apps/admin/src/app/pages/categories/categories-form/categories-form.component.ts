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
  imageDisplay: string | ArrayBuffer | null;

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
      image: ['', Validators.required]
    });

    this._checkEditMode();

  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }

    const categoryFormData = new FormData();
    Object.keys(this.form.controls).map((key) => {
      categoryFormData.append(key, this.form.controls[key].value);
    });


    if(this.editMode) {
        this._editCategory(categoryFormData, this.currentCategoryId);
    }else {
        this._addCategory(categoryFormData);
    }

  }

  private _addCategory(categoryFormData: FormData) {
    this.categoriesService.createCategory(categoryFormData).subscribe((category: Category) => {
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

  private _editCategory(categoryFormData: FormData, categoryId: string) {
    this.categoriesService.updateCategory(categoryFormData, categoryId).subscribe((category: Category) => {
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
          this.form.controls['image'].setValidators([]);
          this.form.controls['image'].updateValueAndValidity();
        })
      }
    })
  }

  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const f = this.form.get('image');
      this.form.patchValue({ image: file });
      if(f!=null) f.updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

}
