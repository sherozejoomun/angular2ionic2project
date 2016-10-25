import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {Locale} from './locale';

/**
 * LocalePopover class defines the popover that is displayed in the Flash Info details page.
 *
 * @author: bishan.kumar.madhoo <bishan.kumar.madhoo@accenture.com>
 * @version: 1.0.0
 * @since: 1.0.0
 */
@Component({
  template: `
    <ion-list class="locale-popover-list">
      <ion-item *ngFor="let locale of locales" [class.hide]="locale.selected" (click)="changeLocale(locale)" tappable>{{locale.label}}</ion-item>
    </ion-list>`
})
export class LocalePopover {

  locales:Locale[];

  /**
   * LocalePopover constructor.
   *
   * @param _navParams {NavParams} Parameters passed on to the popover class
   */
  constructor(private _navParams:NavParams, private _viewCtrl:ViewController) {
  }

  /**
   * Change the language in which item details are being displayed.
   *
   * @param locale {Locale} Locale instance for language in which item details have to be displayed
   */
  changeLocale(locale:Locale):void {
    this._viewCtrl.dismiss({code: locale.code});
  }

  /**
   * Initialize the popover class.
   */
  ngOnInit() {
    if (this._navParams.data.locales) {
      this.locales = this._navParams.data.locales;
    }
  }
}
