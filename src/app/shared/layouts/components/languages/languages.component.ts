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
  selectedLanguage: any | undefined;

  constructor(public translate: TranslateService) {
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(localStorage.getItem(LocalStorageKey.LANGUAGE) || 'vi');
  }
  
  ngOnInit() {
    this.languages = [
        { name: 'Tiếng Việt', code: 'vi', flag: 'vietnam.jpg'},
        { name: 'English', code: 'en', flag: 'us.jpg' },
        { name: '한국인', code: 'kr', flag: 'korean.jpg' },
    ];

    this.selectedLanguage = this.languages.find(x => {
      return x.code === (localStorage.getItem(LocalStorageKey.LANGUAGE) || 'vi');
    });
  }
  
  onChangeLanguage($event: any) {
    if(!$event) {
      return;
    };
    localStorage.setItem(LocalStorageKey.LANGUAGE, $event.value.code);
    this.translate.use($event.value.code);
  }
}
