import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, Validators } from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup} from '@angular/forms';
import { HomePage } from '../home/home';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { Config } from '../../components/config/config';
import {Locale} from '../../components/locale/locale';
import {LocaleChooser} from '../../components/locale/locale-chooser';



@Component({
  templateUrl: 'build/pages/login/login.html',
  directives: [LocaleChooser],
  animations: [
 
    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),
 
    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
        animate('1000ms ease-in-out')
      ])
    ]),
 
    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),
 
    //For login button
    trigger('fadeIn', [
        state('in', style({
            opacity: 1
        })),
        transition('void => *', [
            style({opacity: 0}),
            animate('1000ms 2000ms ease-in')
        ])
    ])
  ]
})
export class LoginPage {
  loading;
  hasPasswordError:boolean;
  hasUsernameError:boolean;
  isProcessing:boolean;
  locales:Locale[];
  locale:Locale;
  password:string;
  passwordErrorKey:string;
  username:string;
  usernameErrorKey:string;
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, fb : FormBuilder) {
    this.loading = loadingCtrl.create({
            content: 'Loading',
        });
    this.http = http;
    this.hasPasswordError = false;
    this.hasUsernameError = false;
    this.isProcessing = false;
    this.locales = Config.LOCALES;
    this.password = '';
    this.passwordErrorKey = null;
    this.username = '';
    this.usernameErrorKey = null;

    for (let locale of this.locales) {

      if (locale.code == 'fr') {

        this.locale = locale;
        this.locale.selected = true;

        break;
      }
    }
  }

  /**
   * Handle the locale change event.
   *
   * @param event {Object} Object containing the details of the event that triggered the locale change
   */
  localeChangeHandler(event:any) {

    // this._translate.use(event.code);

    // for (let locale of this.locales) {

    //   if (locale.code != event.code) {
    //     locale.selected = false;
    //   }
    //   else {

    //     locale.selected = true;
    //     this.locale = locale;
    //   }
    // }
  }

  /**
   * Login the user using the provided username and password pair.
   */
  loginUser() {

    let passwordErrorCode:number = this.isValidPassword(this.password);
    let usernameErrorCode:number = this.isValidUsername(this.username);

    this.hasPasswordError = false;
    this.hasUsernameError = false;
    this.isProcessing = true;
    this.passwordErrorKey = null;
    this.usernameErrorKey = null;

    if (passwordErrorCode === 0 && usernameErrorCode === 0) {

      // var authorizeObservable = this._uacService.authorize(this.username, this.password);

      // authorizeObservable.subscribe(

      //   data => {

      //     if (data.statut === 1) {
      //       this.invalidLogin();
      //     }
      //     else {
      //       set('USER_ID', this.username);
      //       set('USER_LOCALE', this.locale.code);
      //       set('USER_TOKEN', data.id_token);

      //       try {
      //         this._pushNotificationService.init();
      //       }
      //       catch(e) {
      //         this._loggingService.sendLogTechnique('WARN', 'Error ' + JSON.stringify(e) +
      //             ' occurred with Push notification registration for user ' + this.username, new Date().getTime(),
      //             '/login');
      //       }

      //       this.navController.push(FeedsPage);
      //     }
      //   },
      //   (error) => {
      //     this.invalidLogin();
      //     console.log(error);
      //   }
      // );
    }
    else {

      if (passwordErrorCode > 0) {

        this.hasPasswordError = true;

        switch(passwordErrorCode) {

          case 1:
            this.passwordErrorKey = 'LoginPage.errors.password.required';
            break;

          default:
            this.passwordErrorKey = null;
        }
      }

      if (usernameErrorCode > 0) {

        this.hasUsernameError = true;

        switch(usernameErrorCode) {

          case 1:
            this.usernameErrorKey = 'LoginPage.errors.username.required';
            break;

          case 2:
            this.usernameErrorKey = 'LoginPage.errors.username.invalid';
            break;

          default:
            this.usernameErrorKey = null;
        }
      }

      this.isProcessing = false;
    }
  }

  /**
   * Invalid user login.
   */
  private invalidLogin():void {
    this.isProcessing = false;
    this.hasPasswordError = true;
    this.passwordErrorKey = 'LoginPage.errors.password.invalid';
  }

  /**
   * Validate the password provided by the user.
   *
   * @param password {string} Password of the user
   * @return {number} Password validation code
   */
  private isValidPassword(password:string):number {

    if (password.trim().length == 0) {
      return 1;
    }

    return 0;
  }

  /**
   * Validate the username provided by the user.
   *
   * @param username {string} Username of the user
   * @return {number} Username validation code
   */
  private isValidUsername(username:string):number {

    if (username.trim().length === 0) {
      return 1;
    }

    if (!/^\w+((\.)(?=\w+)\w+)+$/.test(username)) {
      return 2;
    }

    return 0;
  }

}