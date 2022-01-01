import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, HostListener, NgModule, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, QueryList } from '@angular/core';
import { SkillListModule, SkillListComponent } from './list-item/skill-list.component'

@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.scss']
})
export class SkillTreeComponent implements AfterViewInit {
  @ViewChild('container') public container: ElementRef;
  @ViewChild(SkillListComponent) private skillList: SkillListComponent;

  private topCard;
  private bottomCard;

  constructor() { 
  }

  ngOnInit(): void {
    this.scrollBottom();
  }

  ngAfterViewInit(): void {
    this.scrollBottom();
  }

  @HostListener('mousewheel', ['$event']) 
  scroll(event: any) {
    if (document.getElementById('tree').classList.contains("focused")) {
      //timeline
    } else {
      let wheelDirection = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
      if (wheelDirection === 1) {
        this.MoveDown();
      }
    }
  }

  timelineScroll(event) {
    if (!document.getElementById('tree').classList.contains("focused")) {
      return;
    }

    this.skillList.cards.forEach((c) => {
      c.nativeElement.style.border = "none";
    });

    

    let cards = this.skillList.cards.toArray();
    let first=-1; //top element position in array
    let last=-1; //bottom element position in array (should be higher)

    //optimisation - store these instead of calculating every scroll event (then only check before and after first)
    cards.forEach((c, i) => {
      if (!this.isPartiallyInViewport(c.nativeElement)) 
        return;
        
      if (first == undefined || first == -1)
        first = i;

      last = i;
    });

    cards[first].nativeElement.style.border = "2px solid green";
    cards[last].nativeElement.style.border = "2px solid blue";

    if (first <= 2) {
      //if there is 3 elements rendered on the page above it, then we are going to add more
      const previousScroll = this.container.nativeElement.scrollTop;
      let height = this.getRealHeight(this.skillList.cards.toArray()[0]) + this.getRealHeight(this.skillList.cards.toArray()[1]);
        console.log(height);
      if (this.skillList.loadNewTops()) {
        //problem is that skillList hasn't updated yet and hence wrong numnbers - force recheck (changedetector or update array instead)
        height = this.getRealHeight(this.skillList.cards.toArray()[0]) + this.getRealHeight(this.skillList.cards.toArray()[1]);
        console.log(height)
        this.container.nativeElement.scrollTop = previousScroll + height;
        console.log(`height: ${height} \nprev: ${previousScroll}\ncur:${this.container.nativeElement.scrollTop}`);
        console.log("add")
        return;
      }
    }

    if (first >= 5) {
      const previousScroll = this.container.nativeElement.scrollTop;
      let height = this.getRealHeight(this.skillList.cards.toArray()[0]) + this.getRealHeight(this.skillList.cards.toArray()[1]);
      if (this.skillList.cullTop()) {
        this.container.nativeElement.scrollTop = previousScroll - height;
        return;
      }
    }

    if (cards.length - 1 - last < 3) {
      this.skillList.loadNewBottom(); //easy since it doesn't affect height
      return;
    }

    if (cards.length - 1 - last > 3) {
      this.skillList.cullBottom(); //easy since it doesn't affect height
      return;
    }
  }

  onSwipe(event) {
    console.log(event);
    if(Math.abs(event.deltaY) > 40 ) {
      if (event.deltaY < 0) {
        this.MoveDown();
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

  isPartiallyInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
  }

  scrollBottom(): void {
    try {
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    } catch (err) {}  
  }

  getRealHeight(element: any): number {
    const styles = window.getComputedStyle(element.nativeElement);
    const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
    return margin + element.nativeElement.offsetHeight;
  }

}
