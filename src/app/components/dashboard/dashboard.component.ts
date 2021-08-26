import { Component, OnInit } from '@angular/core';
import { BlackboxService } from '../../services/blackbox.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private blackboxService: BlackboxService) {}

  ngOnInit(): void {
  }
}
