import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phase2',
  templateUrl: './phase2.component.html',
  styleUrls: ['./phase2.component.css']
})
export class Phase2Component implements OnInit {
  n:String;
  constructor(private activatedroute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedroute.queryParams.subscribe(data => {
      console.log(data);
      this.n=data.id;
    })
  }

}
