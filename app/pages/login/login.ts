import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { FormBuilder, Validators } from '@angular/common';
import {REACTIVE_FORM_DIRECTIVES, FormControl, FormGroup} from '@angular/forms';
import { HomePage } from '../home/home';
import {trigger, state, style, transition, animate, keyframes } from '@angular/core';



@Component({
  templateUrl: 'build/pages/login/login.html',
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
  loginform;
  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  formData = new FormGroup({
    user : new FormControl(),
    pass : new FormControl()
  });
  constructor(public navCtrl: NavController,public alertCtrl: AlertController, public http: Http, public loadingCtrl: LoadingController, fb : FormBuilder) {
    this.loading = loadingCtrl.create({
            content: 'Loading',
        });
    this.http = http;
    this.loginform = fb.group({
      user:["",Validators.required],
      pass: ["",Validators.required]
    });

  }


  login(formData) {
    this.loading.present();
    console.log("User: ",formData.user);
    console.log("Password: ",formData.pass);
    this.http.get("http://www.mocky.io/v2/57c66a38110000d6168cf7c4")
      .subscribe(data => {
        console.log(data);
        let obj = data.json();
        let username = obj.username;
        let pass = obj.pass;

        if(formData.user == username && formData.pass == pass)
        {
          console.log("Login Successful");
          this.loading.dismiss();
          this.navCtrl.push(HomePage);
        }
        else{
          console.log("Verify Credentials");
          this.loading.dismiss();
          alert("Bad Credentials!");
        }

      }, error => {
        console.log(JSON.stringify(error.json()));
      });

     

    //  if(formData.user == 'sheroze.joomun' && formData.pass == '1234')
    //  {
    //    console.log("Login Successful");
    //    this.loading.dismiss();
    //    this.navCtrl.push(HomePage);
    //  }
    //  else
    //  {
    //    console.log("Verify Credentials");
    //    this.loading.dismiss();
    //    alert("Bad Credentials!");
    //  }
     
  }

}