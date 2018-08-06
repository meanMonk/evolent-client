import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const APP_ROUTES : Routes = [
    {
        path : 'create',
        component : ContactComponent
    },
    {
      path : 'list',
      component : ContactListComponent
    },
    {
      path : '**',
      redirectTo : 'list'
    }
]

@NgModule({
    imports: [
      CommonModule,
      RouterModule.forRoot(APP_ROUTES)
    ],
    exports : [
      RouterModule
    ],
    declarations: []
  })
  export class AppRoutingModule { }
  