$(document).ready(function () {
  //initialize constant values for loader
  const loaderImg = '<img src="img/loading_spinner.gif" height="100" width="100" alt="loader"/><h5>Please wait a moment...</h5>';
  const loaderBody = document.getElementById('loader');
  const documentBody = document.querySelector('body');

  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    email = $('input[type="text"]').val().toLowerCase();

    var x, y;
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
    } else {
      x = false;
    }

    if (x === true) {
      loaderBody.innerHTML = loaderImg;
      documentBody.classList.add("loading");
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
      const proxyurl = "";
      const url =
        'https://ltvdataapi.devltv.co/api/v1/records?email=' + email; //new updated API value
      fetch(proxyurl + url)
        .then((response) => response.text())
        .then(function (contents) {
          localStorage.setItem("userObject", contents);
          window.location.href = "result.html";
          loaderBody.innerHTML = '';
          documentBody.classList.remove("loading");
        })
        .catch((e) => console.log(e));
    } else if (x !== true) {
      document.querySelector('input[type="text"]').parentNode.classList.add("error");
    }
  });

  $('input[type="text"]').keypress(function (event) {
    email = $('input[type="text"]').val().toLowerCase();
    regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email.match(regEx)) {
      x = true;
      document.querySelector('input[type="text"]').parentNode.classList.remove("error");
    } else {
      x = false;
    }
    keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
      /**
       * Makes a request to ltv API to search an specific email address.
       * If there's a response, it gets stored in the local storage and redirects to results page
       */
      event.preventDefault();
      localStorage.clear(); //Clears storage for next request

      var x, y;


      if (x === true) {
        loaderBody.innerHTML = loaderImg;
        documentBody.classList.add("loading");
        const proxyurl = "";
        const url =
          'https://ltvdataapi.devltv.co/api/v1/records?email=' + email; //new updated API value
        fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
            loaderBody.innerHTML = '';
            documentBody.classList.remove("loading");
          })
          .catch((e) => console.log(e));
      } else if (x !== true) {
        document.querySelector('input[type="text"]').parentNode.classList.add("error");
      }
    }
  });

});
