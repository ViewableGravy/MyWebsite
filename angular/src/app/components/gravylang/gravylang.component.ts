import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gravylang',
  templateUrl: './gravylang.component.html',
  styleUrls: ['./gravylang.component.scss'],
})
export class GravylangComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  editorOptions = {theme: 'vs-dark', language: 'javascript'};
  code: string= 'function x() {\nconsole.log("Hello world!");\n}';

}
