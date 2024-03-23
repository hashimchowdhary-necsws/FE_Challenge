$(document).ready(function () {
  //initialize constant values for loader
  const loaderImg = '<img src="img/loading_spinner.gif" height="100" width="100" alt="loader"/><h5>Please wait a moment...</h5>';
  const loaderBody = document.getElementById('loader');
  const documentBody = document.querySelector('body');
  //initialize constant values for inputs
  const emailField = document.querySelector('input[type="text"][name="email"]');
  const phoneField = document.querySelector('input[type="text"][name="phone"]');

  $("#btn-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    email = $('input[type="text"][name="email"]').val().toLowerCase();

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
      emailField.parentNode.classList.remove("error");
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

  $('input[type="text"]').keyup(function (event) {
    //email input value and reqularExpression
    email = $('input[type="text"][name="email"]').val().toLowerCase();
    regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    //phone input value and reqularExpression
    phone_number = $('input[type="text"][name="phone"]').val();
    regExPhone = /^\d{10}$/;

    if (email.match(regExEmail) || phone_number.match(regExPhone)) {
      x = true;
      this.parentNode.classList.remove("error");
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

        //if email is valid
        if (email.match(regExEmail)) {
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
        }
        
        //if phone mumber is valid
        if (phone_number.match(regExPhone)) {
          const url =
          'https://ltvdataapi.devltv.co/api/v1/records?phone=' + phone_number; //new updated API value
          fetch(proxyurl + url)
          .then((response) => response.text())
          .then(function (contents) {
            localStorage.setItem("userObject", contents);
            window.location.href = "result.html";
            loaderBody.innerHTML = '';
            documentBody.classList.remove("loading");
          })
          .catch((e) => console.log(e));
        }

      } else if (x !== true) {
        this.parentNode.classList.add("error");
      }
    }
  });

  /**
   * button search validation for phone number.
  */
  $("#btn-phone-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //Clears storage for next request
    phone_number = $('input[type="text"][name="phone"]').val();

    var x, y;

    regEx = /^\d{10}$/;
    if (phone_number.match(regEx)) {
      x = true;
    } else {
      x = false;
    }

    if (x === true) {
      loaderBody.innerHTML = loaderImg;
      documentBody.classList.add("loading");
      phoneField.parentNode.classList.remove("error");
      const proxyurl = "";
        const url =
        'https://ltvdataapi.devltv.co/api/v1/records?phone=' + phone_number; //new updated API value
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
      phoneField.parentNode.classList.add("error");
    }
  });

  /**
   * Tab button for Email search and Phone search.
  */
  $(".btn-filter-search").on("click", function (e) {
    $(".btn-filter-search").removeClass('active'); //remove class active
    $(this).addClass('active'); //add class active on current
    $('input[type="text"]').val(''); //clear input values

    //get the attribute value of button to compare its related to email or phone
    var attrClass = $(this).attr('data-value'); 

    if (attrClass == 'email-search') {
      $(".email-search").removeClass('display-none');
      $(".phone-search").addClass('display-none');
    } else {
      $(".email-search").addClass('display-none');
      $(".phone-search").removeClass('display-none');
    }
  });

});
