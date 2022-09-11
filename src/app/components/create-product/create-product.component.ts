import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/product.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(4)
    ])
  })
  isLoading: boolean = false

  get title() {
    return this.form.controls.title as FormControl
  }

  constructor(
    private productService: ProductService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {

  }

  submit() {
    this.isLoading = true
    this.productService.create({
      title: this.form.value.title as string,
      price: 13.5,
      description: this.form.value.title as string,
      image: 'https://i.pravatar.cc',
      category: 'electronic',
      rating: {
        rate: 42,
        count: 1,
      }
    }).subscribe(() => {
      this.isLoading = false
      this.modalService.close()
    })
  }
}
