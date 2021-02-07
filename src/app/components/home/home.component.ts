import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    /*
    let touchsurface = document.getElementById('scene');
    touchsurface.addEventListener("swap", 
      this.debounce(function(event) {
        if( event.detail.direction == 'left') {
          this.RotateLeft();
        }
        else if(event.detail.direction == 'right') {
          this.RotateRight();
        }
      }, 1, true), 
    false);
  
    var startX,
        startY,
        dist,
        threshold = 150, //required min distance traveled to be considered swipe
        allowedTime = 200, // maximum time allowed to travel that distance
        elapsedTime,
        startTime;
      
    window.addEventListener('touchstart', function(e) {
            //touchsurface.innerHTML = ''
            var touchobj = e.changedTouches[0]
            dist = 0
            startX = touchobj.pageX
            startY = touchobj.pageY
            startTime = new Date().getTime() // record time when finger first makes contact with surface
            e.preventDefault()
        
        event.target.addEventListener('touchmove', function(e){
          e.preventDefault() // prevent scrolling when inside DIV
        }, false)
      
        event.target.addEventListener('touchend', function(e){
          var touchobj = e.changedTouches[0];
          dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
          elapsedTime = new Date().getTime() - startTime // get time elapsed
          // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
          var swiperightBol = (elapsedTime <= allowedTime && Math.abs(dist) >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
          
          var dir_str = "none";
          var dir_int = 0;
          if (swiperightBol) {
            if (dist > 0) {
              dir_str = "right";
              dir_int = 1;
            } else {
              dir_str = "left";
              dir_int = 2;
            }
            var _e = new CustomEvent("swap", {
              target : event.target,
              detail: {		
                direction : dir_str,
                direction_int : dir_int
              },
              bubbles: true,
              cancelable: true
            });
            trigger(event.target,"Swap",_e);			
          }
          
          //handleswipe(swiperightBol, event.target);
          e.preventDefault()
        }, false)
    
        function trigger(elem, name, event) {
        
          elem.dispatchEvent(event);
          eval(elem.getAttribute('on' + name));
        }
        
    }, false)
    */
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
