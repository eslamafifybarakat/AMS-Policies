import { TranslationService } from './../../services/i18n/translation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  currentLanguage: any;
  LOCALIZATION_LOCAL_STORAGE_KEY = "xsite";

  constructor(
    public tanslationService: TranslationService,
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window.localStorage.getItem(this.LOCALIZATION_LOCAL_STORAGE_KEY);
  }

}
