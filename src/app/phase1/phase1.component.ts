import { Component, OnInit } from '@angular/core';
import { Token } from '../token';
import { AppService } from '../app.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-phase1',
  templateUrl: './phase1.component.html',
  styleUrls: ['./phase1.component.css']
})
export class Phase1Component implements OnInit {
  token:Token
  file: File = null;
  id:String;
  constructor(public appService: AppService,public router:Router) { }
  
  ngOnInit(): void {
   
    this.appService.getAll().subscribe((data: Token)=>{
      console.log(data);
      this.token = data;
    });

  }
  onChange(event) {
    this.file = event.target.files[0];
    
}
onUpload() {
    this.appService.upload(this.file,this.token.token).subscribe(
      (response) => {
          if(response.filename){
            
           this.id=response.filename;
            this.router.navigate(['/interphase2'],{queryParams: {id: this.id}});
            return;
          }
      }
  );
}

}
