import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {
  portfolio: any = {};
  constructor(private data: DataService) {}
  ngOnInit() { this.data.getPortfolio().subscribe(p => this.portfolio = p); }
}
