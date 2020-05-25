import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private afsAuth: AngularFireAuth) { }
  public app_name:string='STREAM PELIS';
  public isLogged:boolean=false;
  public isAdmin: any = null;
  public userUid: string = null;
  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser(){ //Funcion creada para identificar al usuario
    this.authService.isAuth().subscribe(auth => {
      if (auth) {
        console.log('user logged');
        this.isLogged = true;
        this.userUid=auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole=>{
          this.isAdmin=Object.assign({},userRole.roles).hasOwnProperty('admin');
        });
      } else {
        console.log('NOT user logged');
        this.isLogged = false;
      }
    });
  }
  

  onLogout(){
    this.afsAuth.signOut();
  }

}
