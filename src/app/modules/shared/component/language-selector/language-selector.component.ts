import { TranslationService } from './../../services/i18n/translation.service';
import { PublicService } from './../../../../services/public.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { keys } from './../../TS Files/localstorage-key';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  currentLanguage: any;
  typeModule: any;

  constructor(
    public translationService: TranslationService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.currentLanguage = window?.localStorage?.getItem(keys?.language);
    this.publicService.pushUrlData.subscribe((res: any) => {
      this.typeModule = res?.type;
      this.cdr.detectChanges();
    });
  }

}
