import {Component, EventEmitter, Input, Output} from '@angular/core';
import {LocalStorage, Storage} from 'ionic-angular';

/**
 * LocaleChooser defines the language selector component which allows the user to choose the locale of the Flash Info
 * application.
 *
 * @author: bishan.kumar.madhoo <bishan.kumar.madhoo@accenture.com>
 * @version: 1.0.0
 * @since: 1.0.0
 */
@Component({
  selector: 'locale-chooser',
  template: `
    <div class="locale" [class.selected]="selected">
      <input (click)="selectLocale(code)" type="button" class="locale-button" value="{{label}}"/>
    </div>
  `
})
export class LocaleChooser {

  @Input() code:string;
  @Input() label:string;
  @Input() selected:boolean;

  @Output() localeChange = new EventEmitter();

  /**
   * Set the current locale of the application.
   *
   * @param code {string} Locale code of the application
   */
  selectLocale(code:string) {

    if (!this.selected) {
      this.selected = true;
      this.localeChange.emit({code: this.code});

      // this.saveUserLocale(code).then((data) => {

      //   this.selected = true;
      //   this.localeChange.emit({code: this.code});
      // });
    }
  }

  /**
   * Save the user selected locale to the local storage of the application.
   *
   * @param code {string} User selected locale code
   * @returns {Promise} Instance of promise obtained when saving to local storage
   */
  private saveUserLocale(code:string):Promise<any> {

    let storage:Storage = new Storage(LocalStorage);

    return storage.set('USER_LOCALE', code);
  }
}
