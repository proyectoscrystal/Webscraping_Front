import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlackboxService } from 'src/app/services/blackbox.service';
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public auth: AuthService, private router: Router, private blackboxService: BlackboxService) { }

  ngOnInit(): void {
  }

  inicio() {
    console.log('Inicio');
    console.log(this.router.url);

    if(this.router.url === '/dashboard') {
      window.location.reload();
    }
  }

  getScraping() {
    this.blackboxService.getScraping().subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
