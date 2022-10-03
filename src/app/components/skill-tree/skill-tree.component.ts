import { Component, OnInit, HostListener, NgModule, ViewChild, ElementRef, ChangeDetectorRef, ChangeDetectionStrategy, AfterViewInit, QueryList } from '@angular/core';
import { SkillListModule, SkillListComponent } from './list-item/skill-list.component'

@Component({
  selector: 'app-skill-tree',
  templateUrl: './skill-tree.component.html',
  styleUrls: ['./skill-tree.component.scss']
})
export class SkillTreeComponent {
  @ViewChild('container') public container: ElementRef;
  @ViewChild(SkillListComponent) private skillList: SkillListComponent;

  private topCard;
  private bottomCard;
  eFilter = Filter;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    let width = event.target.innerWidth - 1015;

    if (width > 85) 
      return;

    if (width < 0)
      width = 0;

    let percent = width / 85;
    let suggested = document.getElementById('Suggested-Scroll');

    suggested.style.opacity = percent.toString();
  }

  public ApplyFilter(filter: any) {
    console.log(Filter[filter])
  }

  @HostListener('mousewheel', ['$event']) 
  private scroll(event: any) {
    if (document.getElementById('tree').classList.contains("focused")) {
      //timeline
    } else {
      let wheelDirection = Math.max(-1, Math.min(1, (event.deltaY || -event.detail)));
      if (wheelDirection === 1) {
        if (this.skillList.ready) {
          this.MoveDown();
        } else {
          alert("please try again now")
        }
      }
    }
  }

  public timelineScroll() {
    if (!document.getElementById('tree').classList.contains("focused")) {
      return;
    }

    this.skillList.cards.forEach((c) => {
      c.nativeElement.style.border = "none";
    });

    let first=-1; //top element position in array
    let last=-1; //bottom element position in array (should be higher)

    //optimisation - store these instead of calculating every scroll event (then only check before and after first)
    this.skillList.cards.toArray().forEach((c, i) => {
      if (!this.isPartiallyInViewport(c.nativeElement)) 
        return;
        
      if (first == undefined || first == -1)
        first = i;

      last = i;
    });

    this.HandleTop(first)

    if (this.skillList.cards.toArray().length - 1 - last < 3) {
      this.skillList.loadNewBottom();
      return;
    }
    
    if (this.skillList.cards.toArray().length - 1 - last > 3) {
      this.skillList.cullBottom();
      return;
    }
  }

  public onSwipe(event) {
    console.log(event);
    if(Math.abs(event.deltaY) > 40) {
      if (event.deltaY < 0) {
        this.MoveDown();
      }
    }
  }

  public MoveDown() : void {
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

  public MoveUp() : void {
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

  @debounce(50)
  private HandleTop(first) {
    if (first < 4) {
      const previousScroll = this.container.nativeElement.scrollTop;

      if (this.skillList.loadNewTops()) {
        const newElementsHeight = this.getRealHeight(this.skillList.cards.toArray()[0]) + this.getRealHeight(this.skillList.cards.toArray()[1]); //new element added
        this.container.nativeElement.scrollTop = previousScroll + newElementsHeight;
        return;
      }
    }

    if (first >= 7) {
      const previousScroll = this.container.nativeElement.scrollTop;
      const height = this.getRealHeight(this.skillList.cards.toArray()[0]) + this.getRealHeight(this.skillList.cards.toArray()[1]);
      if (this.skillList.cullTop()) {
        this.container.nativeElement.scrollTop = previousScroll - height;
        return;
      }
    }
  }

  private isPartiallyInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
  }

  private getRealHeight(element: any): number {
    const styles = window.getComputedStyle(element.nativeElement);
    const margin = parseFloat(styles['marginTop']) + parseFloat(styles['marginBottom']);
    return margin + element.nativeElement.offsetHeight;
  }

}

export function debounce(delay: number = 300): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const timeoutKey = Symbol();

    const original = descriptor.value;

    descriptor.value = function (...args) {
      clearTimeout(this[timeoutKey]);
      this[timeoutKey] = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}

export enum Filter {
  Professional,
  Gaming,
  Financial,
  Personal
}

