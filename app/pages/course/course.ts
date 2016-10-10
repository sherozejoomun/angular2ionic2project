import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {CourseService} from './course.service';
import { Http } from '@angular/http';


@Component({
    templateUrl: 'build/pages/course/course.html',
    providers: [CourseService]
})
export class CoursePage {
    coursesname;
    coursesimage;
    coursesarr;
    loading;
    constructor(public navCtrl: NavController, public alertCtrl: AlertController, courseService: CourseService, public http: Http, public http1: Http, private loadingCtrl: LoadingController) {
        this.coursesname = courseService.getCoursesname();
        this.coursesimage = courseService.getCoursesimage();
        // this.loading = loadingCtrl.create({
        //     content: 'Loading',
        // });
        //this.loading.present();
        // this.http = http;
        // this.http1.get("http://www.mocky.io/v2/57c553cc11000074028cf650")
        //     .subscribe(data => {
        //         this.coursesarr = data.json();
        //     }, error => {
        //         console.log(JSON.stringify(error.json()));
        //     },
        //     () => {
        //         this.loading.dismiss();
        //     })


    }

    //makeGetRequest function using a JSON Web service, containing fname,lname, street and phone

    makeGetRequest() {
        this.http.get("http://www.mocky.io/v2/57c53f1b11000010018cf616")
            .subscribe(data => {
                let obj = data.json();
                let out = "";
                out = obj.fname + " " + obj.lname + "<br>" +
                    obj.street + "<br>" +
                    obj.phone;

                let alert = this.alertCtrl.create({
                    title: "Information",
                    subTitle: out,
                    buttons: ["close"]
                });
                alert.present(alert);
            }, error => {
                console.log(JSON.stringify(error.json()));
            });
    }

    showAlert() {
        let alert = this.alertCtrl.create({
            title: 'Alert!',
            subTitle: 'This is a list of Courses!',
            buttons: ['OK']
        });
        alert.present();
    }

    removeItem() { //dummy remove function to delete item from list
        let prompt = this.alertCtrl.create({
            title: 'Confirm!',
            subTitle: 'Are you sure?',
            buttons: [
                {
                    text: 'Yes',
                    handler: data => {

                        console.log('Delete Confirmed');
                    }
                },
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Delete Cancel');
                    }
                }
            ]
        });
        prompt.present();
    }

    opendetails(){
        console.log("Course Details");
    }

    goHome() {
        this.navCtrl.pop(); //pop all pages and go to home page
    }

}