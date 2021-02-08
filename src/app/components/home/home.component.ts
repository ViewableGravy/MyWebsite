import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  onSwipe(event) {
    if(Math.abs(event.deltaX) > 40 ) {
      if (event.deltaX < 0) {
        this.RotateLeft();
      } else {
        this.RotateRight();
      }
    }
  }

  IsNotNullOrUndefined(element) : boolean {
    return typeof(element) != 'undefined' && element != null;
  }
  
  RotateRight() : void {
    let topLeft = document.getElementsByClassName("top-left")[0];
    if(this.IsNotNullOrUndefined(topLeft)) {
      
      let initialTopRight = document.getElementsByClassName("top-right")[0];
      if(this.IsNotNullOrUndefined(initialTopRight)) {
        initialTopRight.classList.remove('top-right');
      }
    
      let initialMiddle = document.getElementsByClassName('middle')[0];
      initialMiddle.classList.add('right');
      initialMiddle.classList.add('top-right');
      initialMiddle.classList.remove('middle');

      topLeft.classList.add("middle");
      topLeft.classList.remove("left");
      topLeft.classList.remove("top-left");

      let nextTop = document.getElementsByClassName("left");
      if(this.IsNotNullOrUndefined(nextTop[0])) {
        nextTop[0].classList.add("top-left");
      }

      //update bullets
      let bullets = document.getElementsByClassName("bullet");
      for(let i = 0; i < bullets.length; i++) {
        if(bullets[i].classList.contains("highlighted")) {
          bullets[i - 1].classList.add("highlighted");
          bullets[i].classList.remove("highlighted");
          break;
        }
      }
      
    } else {
      console.log("Cannot rotate further right");
      return;
    }
  }
  
  RotateLeft() : void {
    let topRight = document.getElementsByClassName("top-right")[0];
    if(this.IsNotNullOrUndefined(topRight)) {
      let initialTopLeft = document.getElementsByClassName("top-left")[0];
      if(this.IsNotNullOrUndefined(initialTopLeft)) {
        initialTopLeft.classList.remove('top-left');
      }
    
      let initialMiddle = document.getElementsByClassName("middle")[0];
      initialMiddle.classList.add('left');
      initialMiddle.classList.add('top-left');
      initialMiddle.classList.remove('middle');

      topRight.classList.add("middle");
      topRight.classList.remove("right");
      topRight.classList.remove("top-right");

      let nextTop = document.getElementsByClassName("right");
      if(this.IsNotNullOrUndefined(nextTop[0])) {
        nextTop[0].classList.add("top-right");
      }

      //update bullets
      let bullets = document.getElementsByClassName("bullet");
      for(let i = 0; i < bullets.length; i++) {
        if(bullets[i].classList.contains("highlighted")) {
          bullets[i + 1].classList.add("highlighted");
          bullets[i].classList.remove("highlighted");
          break;
        }
      }

    } else {
      console.log("Cannot rotate further left");
      return;
    }
  }
  
  debounce(func, wait, immediate) : any {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };
}
