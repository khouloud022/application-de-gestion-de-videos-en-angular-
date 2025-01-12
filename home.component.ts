import { Component,OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit  {
    home=[];
    constructor() {}
    ngOnInit():void{
          this.gethome();
    }
    gethome(){
        axios.get(" https://api.expert-sante.continuousnet.com/api/login")
        .then(res => {
            console.log(res)
        })
        .catch(err=>
            console.log(err)
        )
        }
}


