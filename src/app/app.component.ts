import { Component } from '@angular/core';
import toastr from 'toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'evolent-client';
  constructor(){
      toastr.options = {
        "closeButton": true,
      }
  }


}
