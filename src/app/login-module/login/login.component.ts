import { Component, OnInit } from '@angular/core';
import { JsonApiService } from './../../services/json-api.service';
import { Router } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [JsonApiService]
})

export class LoginComponent implements OnInit {
  public loginDetails:any={};
	public errorMsg ='';
	public showError : boolean = false;
	public er: any={};
	constructor(private jsonApiService: JsonApiService,private router: Router) {
	}

	ngOnInit() {

	}

  // to authenticate the user
	login(loginDetails){
		this.jsonApiService.loginUser().subscribe((res:any)=>{
			console.log("dffgdgd"   + JSON.stringify(res));
			if(res[0].emailId===loginDetails.emailId && 
				res[0].password===loginDetails.password){
        localStorage.setItem("CurrentUser", JSON.stringify({ userName: loginDetails.emailId, password: loginDetails.password})); 
			this.loginDetails={};
			this.router.navigate(['/home/movies']);
		}else{
		this.errorMsg="Invalid Credentials";	
		}
		},(error:any)=>{
			this.er=JSON.parse(error._body);
			alert(this.er.error);
			this.errorMsg = error.statusText;
			this.showError = true;
		})

	}

}
