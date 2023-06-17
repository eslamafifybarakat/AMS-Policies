import { patterns } from './../../../shared/TS Files/patternValidation';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(
    public fb: FormBuilder
  ) { }

  form = this.fb.group({
    email: ['', [
      Validators.required,
      Validators.pattern(patterns?.email)]]
  })

  ngOnInit(): void {
    Aos?.init();
  }
  submit(): void { }
}
