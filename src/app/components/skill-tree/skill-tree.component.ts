import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.scss']
})
export class SkillTreeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('mousewheel', ['$event']) scroll(event: any) {
    let wheelDelta = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
    wheelDelta === 1 ? this.MoveDown() : this.MoveUp();
  }

  onSwipe(event) {
    console.log(event);
    if(Math.abs(event.deltaY) > 40 ) {
      if (event.deltaY < 0) {
        this.MoveDown();
      } else {
        this.MoveUp();
      }
    }
  }

  MoveDown() : void {
    const foo = document.getElementById('page');
    for (let i = 0; i < foo.children.length; i++) {
      if(foo.children[i].classList.contains("focused")) {
        if(i !== foo.children.length - 1) {
          foo.children[i + 1].classList.add("focused");
          foo.children[i + 1].classList.remove("below");
          foo.children[i].classList.remove("focused");
          foo.children[i].classList.add("above");
        }
      }
    }
  }

  MoveUp() : void {
    const foo = document.getElementById('page');
    for (let i = 0; i < foo.children.length; i++) {
      if(foo.children[i].classList.contains("focused")) {
        if(i !== 0) {
          foo.children[i - 1].classList.add("focused");
          foo.children[i - 1].classList.remove("above");
          foo.children[i].classList.remove("focused");
          foo.children[i].classList.add("below");
        } else {
          break;
        }
      }
    }
  }

}
