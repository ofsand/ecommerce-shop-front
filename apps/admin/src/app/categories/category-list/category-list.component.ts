import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {

categories = [
  {
    id: 1,
    name: 'cat 1',
    icon: 'icon 1'
  },
  {
    id: 2,
    name: 'cat 2',
    icon: 'icon 2'
  }
]

  constructor() { }

  ngOnInit(): void {
  }

}
