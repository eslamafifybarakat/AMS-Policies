import { keys } from '../../../../modules/shared/TS Files/localstorage-key';
import { footerDataAr } from './../../../../ams-policy-data/footer-data';
import { patterns } from './../../../shared/TS Files/patternValidation';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { footerDataEn } from '../../.././../../app/ams-policy-data/footer-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentLanguage: any;
  data: any;

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
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);

    this.data = this.currentLanguage == 'ar' ? footerDataAr : footerDataEn;
  }
  submit(): void { }
}
