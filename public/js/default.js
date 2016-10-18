// jQuery equivalent $(document).ready() ..
document.addEventListener("DOMContentLoaded", function(event) {

  document.getElementById("play-btn").addEventListener("click", getreq);

  function isArrayUnique(myArray) {
    return myArray.length === new Set(myArray).size;
  }

  Array.prototype.isAllValuesEqual = function() {
    for (var i = 1; i < this.length; i++) {
      if (this[i] !== this[0])
        return false;
    }
    return true;
  };

  function getreq() {
    var win = document.getElementById("win-text");
	var bonus = document.getElementById("bonus-text");
    var space = document.getElementById("symbol-space");
    var image = document.getElementsByClassName("symbol-img");

	// Remove all elements when play is triggered
    while (image.length > 0) {
      image[0].parentNode.removeChild(image[0]);
    }

    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (request.readyState === 4) {
        if (request.status === 200) {
			
		  console.log('Status: Ok');
		  
		  bonus.innerHTML = '';
			
		  var arr = JSON.parse(request.responseText);
		  
          for (var i of arr) {
            if (i == 1) {
              var im1 = document.createElement("img");
              im1.src = '../../img/Symbol_0.png';
              im1.className = 'symbol-img';
              space.appendChild(im1);
            }
            if (i == 2) {
              var im2 = document.createElement("img");
              im2.src = '../../img/Symbol_1.png';
              im2.className = 'symbol-img';
              space.appendChild(im2);
            }
            if (i == 3) {
              var im3 = document.createElement("img");
              im3.src = '../../img/Symbol_2.png';
              im3.className = 'symbol-img';
              space.appendChild(im3);
            }
            if (i == 4) {
              var im4 = document.createElement("img");
              im4.src = '../../img/Symbol_3.png';
              im4.className = 'symbol-img';
              space.appendChild(im4);
            }
            if (i == 5) {
              var im5 = document.createElement("img");
              im5.src = '../../img/Symbol_4.png';
              im5.className = 'symbol-img';
              space.appendChild(im5);
            }
			// Is all values unique?
            if (isArrayUnique(arr)) {
              win.innerHTML = 'No Win';
            } 
			// Is all values the same?
			else if (arr.isAllValuesEqual()) {
              win.innerHTML = '<strong style="color: #00e600">Big Win</strong>';
				// Bonus triggered
				if (i == 9) {
				bonus.innerHTML = '<strong style="color: #00e600"> ~ B O N U S ~ </strong>';
				}
            }
			// Is two values equal with one differing?
			else {
              win.innerHTML = 'Small Win';
				// Bonus triggered
				if (i == 9) {
				  bonus.innerHTML = '<strong style="color: #00e600"> ~ B O N U S ~ </strong>';
				}
            }
          }
        } else {
			console.log('Status: Error');
        }
      }
    };
    request.open("GET", window.location.href + 'play', true);
    request.send(null);
  }

});