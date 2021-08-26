import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router,) { }

  ngOnInit(): void {
  }

  inicio() {
    console.log('Inicio');
    console.log(this.router.url);

    if(this.router.url === '/dashboard') {
      window.location.reload();
    }
  }

}
