import {LoadingController} from 'ionic-angular';

export class LoadingIndicator { 
    public loading;
    constructor( public loadingCtrl: LoadingController){
        this.loading = loadingCtrl.create({
            content: 'Loading..',
        });
    }

    standby(){
        this.loading.present();
    }

    ready(){
        this.loading.dismiss();
    }
}