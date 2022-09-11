import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {IProduct} from "../../models/product";
import { Location } from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-current-product-page',
  templateUrl: './current-product-page.component.html',
  styleUrls: ['./current-product-page.component.scss']
})
export class CurrentProductPageComponent implements OnInit {
  id: number
  isLoading = true
  product: IProduct
  form = new FormGroup({
    rating: new FormControl(0, Validators.required)
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    public location: Location,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('product')
    this.id = this.route.snapshot.params.id
    this.productService.getOne(this.id)
      .subscribe(product => {
        this.product = product
        this.titleService.setTitle(product.title)
        this.form.controls.rating.setValue(Math.round(product.rating.rate))
        this.isLoading = false
      })
  }
}
