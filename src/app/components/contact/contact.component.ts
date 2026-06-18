import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DataService } from '../../services/data.service';
import { RevealDirective } from '../../directives/reveal.directive';

const FORMSPREE_URL = 'https://formspree.io/f/xykaqway';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RevealDirective],
  templateUrl: './contact.component.html',
})
export class ContactComponent implements OnInit {
  portfolio: any = {};
  form = { name: '', email: '', subject: '', message: '' };
  status: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  sentEmail = '';

  constructor(private data: DataService, private http: HttpClient) {}

  ngOnInit() {
    this.data.getPortfolio().subscribe((p) => (this.portfolio = p));
  }

  onSubmit() {
    this.status = 'sending';
    this.sentEmail = this.form.email;
    this.http.post(FORMSPREE_URL, this.form).subscribe({
      next: () => {
        this.status = 'success';
        this.form = { name: '', email: '', subject: '', message: '' };
        setTimeout(() => (this.status = 'idle'), 5000);
      },
      error: () => {
        this.status = 'error';
        setTimeout(() => (this.status = 'idle'), 5000);
      },
    });
  }
}
