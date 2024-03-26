jQuery(function ($) {
  /**
   * Gets an object and sets its content into the result card in the result page
   * If there's no content in the JSON object, makes sure to tell the user
   */
  if (window.localStorage) {
    if (localStorage.userObject) {
      const user_object = localStorage.getItem('userObject');
      retreivedObject = JSON.parse(user_object); //parses the retrieved object into an JSON object
      if (JSON.stringify(retreivedObject) == "[]") {
        $('#resultCount').text("0 Results");
        $("#resultSubtext").text("Try starting a new search below");
      } else {
        $('#resultCount').text("1 Result");
        $("#resultSubtext").text("Look at the result below to see the details of the person you’re searched for.");
        $("#userName").append(`${retreivedObject.first_name} ${retreivedObject.last_name}`);
        $('#userDescription').append(retreivedObject.description);
        $("#Address").append(`<p>${retreivedObject.address} </p>`);
        $("#Email").append(`<p>${retreivedObject.email}</p>`);

        for (const phone_number in retreivedObject.phone_numbers) {
          let phone = retreivedObject.phone_numbers[phone_number];
          formatted_phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6, 10)}`; 

          $("#phoneNumber").append(`<a href="tel:${phone}" style='display: block;color: #004A80;'> ${formatted_phone} </a>`);
        }

        for (const relative in retreivedObject.relatives) {
          $("#Relatives").append(`<p style='margin-bottom: 0'> ${retreivedObject.relatives[relative]} </p>` );
        }

        $(".result-wrap").show();
      }
    }
  }
});
