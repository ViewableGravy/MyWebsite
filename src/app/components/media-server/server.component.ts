import { Component } from "@angular/core";
import { domains } from "./domains";

@Component({
  selector: 'server-home',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
  preserveWhitespaces: true
})

export class ServerHomeComponent {
  domains = domains
}
