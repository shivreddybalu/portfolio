import { Component } from '@angular/core';
import { ContactComponent } from '../../components/contact/contact.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactComponent],
  template: `<div class="pt-20"><app-contact></app-contact></div>`
})
export class ContactPageComponent {}
