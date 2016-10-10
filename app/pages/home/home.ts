import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CoursePage} from '../course/course'; //import page to push on top of home page
import {LoginPage} from '../login/login';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) { //navCtrl is the navigator that will allow push and pop on the app
  }

  goToCourse(){
    this.navCtrl.push(CoursePage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }

}
