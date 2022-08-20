/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@ecommerce-brands/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';
import { Location } from '@angular/common';

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

  constructor(private location: Location,private messageService: MessageService ,private formBuilder: FormBuilder, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      icon: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if(this.form.invalid) {
      return;
    }

    const category : Category = {
      name: this.form.controls['name'].value,
      icon: this.form.controls['icon'].value

    }

    this.categoriesService.createCategory(category).subscribe(response => {
      this.messageService.add({severity:'success', summary:'Success', detail:'Category added successfully'});
      timer(1500).toPromise().then( done => {
        this.location.back()
      });
    },
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category is not added'});
    });

    console.log(this.form.controls['name'].value);
    console.log(this.form.controls['icon'].value);
  }

}
