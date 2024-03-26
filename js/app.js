jQuery(function ($) {
  //initialize constant values for loader
  const loaderImg = '<img src="img/loading_spinner.gif" height="100" width="100" alt="loader"/><h5>Please wait a moment...</h5>';
  const loaderBody = document.getElementById('loader');
  const documentBody = document.querySelector('body');
  //initialize constant values for inputs
  const emailField = document.querySelector('input[type="text"][name="email"]');
  const phoneField = document.querySelector('input[type="text"][name="phone"]');
  //regular expression for email and phone
  const regExEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regExPhone = /^\d{10}$/;

  function fetchData(searchType, searchValue){ 
    loaderBody.innerHTML = loaderImg;
    documentBody.classList.add('loading');
    const searchInput = searchType == 'email' ? emailField : phoneField;
    searchInput.parentNode.classList.remove('error');
    /**
       * makes a request to ltv API to search an specific email address and phone number.
       * if there's a response, it gets stored in the local storage and redirects to results page
    */
    const url =
      `https://ltvdataapi.devltv.co/api/v1/records?${searchType}=${searchValue}`;
    fetch(url)
      .then((response) => response.text())
      .then(function (contents) {
        localStorage.setItem("userObject", contents);
        window.location.href = "result.html";
        loaderBody.innerHTML = '';
        documentBody.classList.remove('loading');
      })
      .catch((e) => console.log(e));
  }

  function emailValidate(){
    let emailAdress = $('input[type="text"][name="email"]').val().toLowerCase();
    if (emailAdress.match(regExEmail)) {
      let inputType = 'email';
      fetchData(inputType, emailAdress);
    } else {
      emailField.parentNode.classList.add('error');
    }
  }

  function phoneValidate(){
    let phoneNumber = $('input[type="text"][name="phone"]').val();
    if (phoneNumber.match(regExPhone)) {
      let inputType = 'phone';
      fetchData(inputType, phoneNumber);
    } else {
      phoneField.parentNode.classList.add('error');
    }
   }
  
  /**
   * button search validation for email address.
  */
  $("#btn-email-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //clears storage for next request
    emailValidate();
  });

  /**
   * search and validate on keyup and enter key.
  */
  $('input[type="text"]').keyup(function (e) { 
    let emailAdress = $('input[type="text"][name="email"]').val().toLowerCase();

    let phoneNumber = $('input[type="text"][name="phone"]').val();

    if (emailAdress.match(regExEmail) || phoneNumber.match(regExPhone)) {
      this.parentNode.classList.remove('error');
    }

    keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == '13') { //on press of enter key
      e.preventDefault();
      localStorage.clear(); //clears storage for next request
      
      emailValidate();
      phoneValidate();
      
    }
  });

  /**
   * button search validation for phone number.
  */ 
  $("#btn-phone-search").on("click", function (e) {
    e.preventDefault();
    localStorage.clear(); //clears storage for next request
    phoneValidate();
  });

  /**
   * Tab button for Email search and Phone search.
  */
  $(".btn-filter-search").on("click", function (e) {
    const searchTabs = document.querySelectorAll('.btn-filter-search');
    searchTabs.forEach((element) => {
      element.classList.remove('active');
    });
    $('input[type="text"]').val('');
    this.classList.add('active'); 
    let attrClass = this.getAttribute('data-search'); 

    if (attrClass == 'email-search') {
      document.querySelector('.email-search').classList.remove('d-none');
      document.querySelector('.phone-search').classList.add("d-none");
    } else {
      document.querySelector('.phone-search').classList.remove("d-none");
      document.querySelector('.email-search').classList.add("d-none");
    }
  });

});
