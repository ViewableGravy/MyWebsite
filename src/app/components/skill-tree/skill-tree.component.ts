import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, HostListener, NgModule, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { SkillListModule } from './list-item/skill-list.component'

@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.scss']
})
export class SkillTreeComponent implements AfterViewInit {

  translation = 0;

  @ViewChild('container') public container: ElementRef;

  constructor() { 
  }

  ngOnInit(): void {
    this.scrollBottom();
  }

  ngAfterViewInit(): void {
    this.scrollBottom();
  }

  scrollBottom(): void {
    try {
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    } catch (err) {}  
  }

  @HostListener('mousewheel', ['$event']) scroll(event: any) {
    if (document.getElementById('tree').classList.contains("focused")) {
      //this.translation += event.deltaY / 3;
      //document.getElementById("timeline").style.transform = `translateY(${this.translation}px)`
    } else {
      let wheelDirection = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
      
      //wheelDelta === 1 ? this.MoveDown() : this.MoveUp();
      if (wheelDirection === 1) {
        this.MoveDown();
      }
    }
  }

  updateScroll(){
    var element = document.getElementById("timeline");
    element.scrollTop = -element.scrollHeight;
  }

  onSwipe(event) {
    console.log(event);
    if(Math.abs(event.deltaY) > 40 ) {
      if (event.deltaY < 0) {
        this.MoveDown();
      } else {
        //this.MoveUp();
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
