import { Component, OnInit, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LocalStorageKey } from '../../../enums';
@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  languages: any[] | undefined;
  // readonly translate = inject(TranslateService);

  selectedLanguage: any | undefined;

  constructor(public translate: TranslateService) {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.addLangs(['vi', 'en', 'kr']);
    translate.use(localStorage.getItem(LocalStorageKey.LANGUAGE) || 'vi');
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang ? browserLang : 'en');
  }
  
  ngOnInit() {
    this.languages = [
        { name: 'Tiếng Việt', code: 'vi', flag: 'vietnam.jpg'},
        { name: 'English', code: 'en', flag: 'us.jpg' },
        { name: '한국인', code: 'kr', flag: 'korean.jpg' },
    ];

    this.selectedLanguage = this.languages.find(x => {
      return x.code === (localStorage.getItem('locale') || 'vi');
    });
  }
  
  onChangeLanguage($event: any) {
    if(!$event) {
      return;
    };
    localStorage.setItem('locale', $event.value.code);
    this.translate.use($event.value.code);
  }
}
