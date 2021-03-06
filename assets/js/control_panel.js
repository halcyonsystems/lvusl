/* Filename: forms.js
 *  Contains JavaScript statements and functions which are triggered by interacting 
 *  with HTML DOM elements of the webpage.
 * 
 *  --- NOTE! ---
 *  + JavaScript functions which control the layout and  physical appearance of the webpage 
 *    are contained within, 'animations.js'.
 *  + JavaScript functions which assist the page with navigation are located within, 'nav.js'.
 *  + JavaScript functions which are called when a visitor interacts with a form located 
 *    on the webpage are contained within, 'forms.js'.
 *    
 * ******************************************************************************************** */

var $jQ = jQuery.noConflict();

var time_value = new Number();
// Holds the length of time, in miliseconds, that animations are to take place.
var window_margin = new Number();
// The distance in pixels that the browser window can lie either above or below 
// a Section and still be considered viewing an individual Section.

var url_hash = new String();

time_value = 500;
window_margin = 150;

url_hash = window.location.hash;

$jQ(document).ready(
  function () {
    
    $jQ("#nav-link").mouseover( 
    // Once the visitor moves the cursor over the "menu icon", the 
    // click-state of the "menu icon" is changed to the "hover" state.

      function () {
        navLinkHoverState("hover", time_value);
      }
    );

    $jQ("#nav-link").mouseout( 
    // Once the visitor moves the cursor away from the "menu icon", the 
    // click-state of the "menu icon" is changed to the "base" state.

      function () {
        var nav_selector = new String();
        var nav_element = new Object();

        var nav_left_val = new String();
        // Holds the value of the CSS property, "left", for the HTML 
        // element using the selector, "nav".

        nav_selector = "nav";
        nav_element = $jQ(nav_selector);

        nav_left_val = $jQ(nav_element).css("left");

        if (nav_left_val !== "0px") {
        // If the main menu is not visible, this condition is triggered.
          navLinkHoverState("base", time_value); 
        }
      }
    );
    
    $jQ("#nav-link").click( 
    // Once the visitor clicks the "menu icon", the inter-section 
    // navigation that appears on the left side of the browser window 
    // is made visible and the click-state of the "menu icon" is changed 
    // to the "first" "click" state.

      function () {
        var nav_selector = new String();
        var nav_element = new Object();
        
        var nav_left_value = new String();
        // Holds the value of the CSS property, "left", of the 
        // HTML element using the selector, "nav".

        nav_selector = "nav";
        nav_element = $jQ(nav_selector);

        nav_left_value = $jQ(nav_element).css("left");

        if (nav_left_value === "0px") {
        // If the main menu of the 
        // browser window, this condition is triggered.

          setTimeout(
            function () {
              navLinkHoverState("base", time_value);
              // The click-state of the "menu icon" is changed to the "base" 
              // state.
            }, (time_value * 2.5)
          );
        } else {
        // Otherwise, if the navigation is not viewable, this condition is 
        // triggered.

          navLinkHoverState("click", time_value);
          // The click-state of the "menu icon" is changed to the "first" 
          // "click" state.
        }
        
        assembleURLString(time_value);
        // "assembleURLString" determines the Positions of the ".copy" elements 
        // contained in the various Sections.
        
        animateSideNav(time_value);
        // "animateSideNav" animates the inter-section navigation that appears 
        // on the left of the browser window into view.
      }
    );
    
   $jQ("#options > a").mouseenter(
   // If the visitor moves the cursor over one of the menu options of the 
   // main menu of the browser window, 
   // the click-state of the menu option is changed.
   
      function () {
        var option_element = new Object();

        option_element = this;

        animateMenuOptions(option_element);
        // "animateMenuOptions" changes the click-state of the menu option.
      }
    );

    $jQ("#options > a").mouseleave(
    // If the visitor moves the cursor over one of the menu options of the 
    // main menu of the browser window, 
    // the click-state of the menu option is changed.
      function () {
        var option_element = new Object();

        option_element = this;

        animateMenuOptions(option_element);
        // "animateMenuOptions" changes the click-state of the menu option.
      }
    );
    
    $jQ("#options > a").click(
    // If the visitor clicks on one of the menu options, the visible Positions 
    // within the Sections are found and passed on to the URL hash, 
    // the main menu side of the 
    // browser window is made visible, the click-state of the "menu icon" 
    // is changed and the browser window navigates to the Section 
    // that the visitor wishes to view.
      function () {
        var option_element = new Object();

        option_element = this;
        
        assembleURLString(time_value);
        // "assembleURLString" determines the Positions of the ".copy" elements 
        // contained in the various Sections.
        animateSideNav(time_value);
        // "animateSideNav" animates the inter-section navigation that appears 
        // on the left of the browser window into view.
        
        setTimeout(
          function () {
            navLinkHoverState("base", time_value);
            // The click-state of the "menu icon" is changed to "base".
            activateSideNav(option_element);
            // "activateSideNav" navigates the browser window to the Section 
            // the visitor wishes to view.
          }, (time_value * 2.5));
      }
    );

    $jQ("#info > div > a:nth-child(2)").click(
    // Navigates the browser window to view 'SECTION #1' when a visitor 
    // clicks on the <a> element which contains the text, 
    // "Request Season Tickets".

      function () {
        var wndow_height = new Number();
        // Holds the height of the HTML elements using the selector, ".wndow".

        var page_dimensions_Array = new Array();
        // The calculated values for the "width" and "height" of various HTML elements 
        // of the webpage within the browser window are passed on to "page_dimensions_Array".
        
        page_dimensions_Array = parseWindowDimensions();
        // The calculated values for the "width" and "height" of various HTML elements 
        // of the webpage within the browser window are passed on to "page_dimensions_Array".

        wndow_height = page_dimensions_Array[1];
        
        $jQ(window).scrollTop(wndow_height);
        // The browser window scrolls to the vertical location of 'SECTION #1'.
      }
    );

    $jQ("#email a").click(
    // Closes the email alert splash page when a visitor clicks on the grey 'X' which 
    // appears to the right of the email alert content.

      function () {
        animateEmailAlert(url_hash, time_value);
      }
    );

    $jQ("#input-email").mouseenter(
    // Activates when the visitor interacts with the question field that 
    // a visitor enters their email address.

      function () {
        validateQuestionField("start", "email");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "email");
      }
    ).focus(
      function () {
        validateQuestionField("start", "email");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "email");
      }
    );

    $jQ("#input-full_name").mouseenter(
    // Activates when the visitor interacts with the form question which 
    // the visitor enters their full name.

      function () {
        validateQuestionField("start", "full_name");
        // The form question is initialized.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "full_name");
      }
    ).focus(
      function () {
        var input_element = this;

        var question_value = new String();
        // Holds a String which identifies the form question in which the visitor 
        // enters their full name.

        var full_name_default_value = new String();
        // Holds a String which matches the default value for the form question 
        // which contains the full name.
        var full_name_error_value = new String();
        // Holds a String which matches the error message which appears if 
        // the visitor enters invalid data.

        full_name_default_value = "Please enter your full name";
        full_name_error_value = "Please include a space in your full name";

        question_value = $jQ(input_element).attr("id").slice(6);
        
        formQuestionFocusCheck(question_value, full_name_default_value, full_name_error_value);
      }
    ).blur(
      function () {
        var input_element = this;

        var question_value = new String();
        // Holds a String which identifies the form question in which the visitor 
        // enters their full name.

        var full_name_default_value = new String();
        // Holds a String which matches the default value for the form question 
        // which contains the full name.
        var full_name_error_value = new String();
        // Holds a String which matches the error message which appears if 
        // the visitor enters invalid data.

        full_name_default_value = "Please enter your full name";
        full_name_error_value = "Please include a space in your full name";

        question_value = $jQ(input_element).attr("id").slice(6);
        
        formQuestionFocusCheck(question_value, full_name_default_value, full_name_error_value);
      }
    );

    $jQ("#input-address_1").mouseenter(
    // Activates when the visitor moves interacts with the form question which 
    // this visitor enters their street number and street.

      function () {
        validateQuestionField("start", "address_1");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "address_1");
      }
    ).focus(
      function () {
        validateQuestionField("start", "address_1");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "address_1");
      }
    );
    
     $jQ("#input-address_2").mouseenter(
    // Activates when the visitor interacts with the form question which 
    // this visitor enters an apartment number.

      function () {
        validateQuestionField("start", "address_2");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "address_2");
      }
    ).focus(
      function () {
        validateQuestionField("start", "address_2");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "address_2");
      }
    );

    $jQ("#input-city").mouseenter(
    // Activates when the visitor interacts with the form question which 
    // the visitor would enter their city name.

      function () {
        validateQuestionField("start", "city");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "city");
      }
    ).focus(
      function () {
        validateQuestionField("start", "city");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "city");
      }
    );

    $jQ("#input-state").mouseenter(
    // Activates when the visitor interacts with the form question which 
    // the visitor would enter the state name.

      function () {
        validateQuestionField("start", "city");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "city");
      }
    ).focus(
      function () {
        validateQuestionField("start", "city");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "city");
      }
    );

    $jQ("#input-state").mouseenter(
    // Activates when the visitor interacts with the form question which 
    // the visitor would enter the state name.

      function () {
        validateQuestionField("start", "state");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "state");
      }
    ).focus(
      function () {
        validateQuestionField("start", "state");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "state");
      }
    );

    $jQ("#input-zip_code").mouseenter(
    // Activates when the visitor interacts with the form question which 
    // the visitor would enter their zip code.

      function () {
        validateQuestionField("start", "zip_code");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "zip_code");
      }
    ).focus(
      function () {
        validateQuestionField("start", "zip_code");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "zip_code");
      }
    );

    $jQ("#input-card_num").mouseenter(
    // Activates when the visitor interacts with the form question which 
    // the visitor would enter their credit card number.

      function () {
        validateQuestionField("start", "card_num");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "card_num");
      }
    ).focus(
      function () {
        validateQuestionField("start", "card_num");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "card_num");
      }
    );
   
    $jQ("#input-security_code").mouseenter(
    // Activates when the visitor interacts with the form question which 
    // the visitor would enter the 3 digit security code of their credit card number.

      function () {
        validateQuestionField("start", "security_code");
        // The data of the form question is in the process of validation.
      }
    ).mouseleave(
      function () {
        validateQuestionField("reset", "security_code");
      }
    ).focus(
      function () {
        validateQuestionField("start", "security_code");
      }
    ).blur(
      function () {
        validateQuestionField("reset", "security_code");
      }
    );

    $jQ("#input-next_step, #input-previous_step").click(
    // Fades in the individual pages of the 'Request Season Tickets' form.

      function () {
        animateForm(time_value);
        // "animateForm" fades in the "second" page of 'FORM TYPE #1'.
      }
    );

    $jQ("#sctn_main-email, #sctn_1-request_tickets").submit(
    // Validates the data contained within either the 'Email Alert' or 
    // 'Request Season Tickets' forms.
    
      function (event) {
        var form_element = new Object();

        var form_complete_flag = new Boolean;
        // A Boolean which is set to true if the all of the data 
        // of a form is proper.
        
        var wndow_selector = new String();
        var wndow_element = new Object();

        form_element = this;

        form_complete_flag = validateForm(form_element);
        // If the data of the form is proper, the value 
        // of "form_complete_flag" will be "true". 
        // 
        // If any of the data of the form is improper, 
        // the value of "form_complete_flag" will be 
        // false.
        
        if (form_complete_flag === false) {
        // If the form that this function processes contains 
        // improper data, then this condition is triggered.
          
          var alert_div_element = new String();
          // Holds HTML which makes up an alert which appears 
          // within the browser window to inform the visitor that 
          // input withing the form needs to change.

          var form_element_id = new String();
          // Holds the selector which identifies the form under processing.

          var email_search_string = new String();
          var email_search_string_index_num = new Number();

          var alrt_selector = new String();
          var alrt_element = new Object();


          alert_div_element = 
            "<div id=\"alrt\">" + 
            "  <div>" + 
            "    <div>" + 
            "      <span>Alert</span>" + 
            "      <p>" + 
            "        This form needs more information than you provided." + 
            "      </p>" +
            "      <p>" + 
            "        Please check the form for text boxes that are surrounded by red borders." + 
            "      </p>" +  
            "      <p>" + 
            "        Click the screen to close this alert." + 
            "      </p>" + 
            "    </div>" + 
            "  </div>" + 
            "</div>";
          
          form_element_id = $jQ(form_element).attr("id");

          email_search_string = "email";
          email_search_string_index_num = form_element_id.indexOf(email_search_string);

          if (email_search_string === -1) {
            wndow_selector = "#wndow-sctn_1";
          } else {
            wndow_selector = "#wndow-sctn_main";
          }

          wndow_element = $jQ(wndow_selector);

          $jQ(wndow_element).prepend(alert_div_element);
          // The HTML of "alert_div_element" is inserted into the HTML of the webpage.

          alrt_selector = "#alrt";
          alrt_element = $jQ(alrt_selector);

          $jQ(alrt_element).click(
          // Activates when the visitor clicks on the alert message.
            function () {
              $jQ(this).fadeTo(time_value, 0, 
              // The alert message fades out.
                function () {
                  $jQ(this).detach();
                  // The HTML code is removed from the webpage.
                }
              );
            }
          );

          event.preventDefault();
          // Code which validates the Method.
        }
      }
    );

    $jQ(window).on("load", 
      function () {
        var url_hash = new String();
        
        var page_dimensions_Array = new Array();
        // The calculated values for the "width" and "height" of various HTML elements 
        // of the webpage within the browser window are passed on to "page_dimensions_Array".
        var window_width = new Number();
        // Holds the numerical value of the width of the browser window.

        var sctn_main_search_string = new String();
        var sctn_main_index_num = new Number();

        var section_value = new String();

        url_hash = window.location.hash;
        
        page_dimensions_Array = parseWindowDimensions();
        window_width = page_dimensions_Array[0];
        
        sctn_main_search_string = "sctn_main";
        sctn_main_index_num = url_hash.indexOf(sctn_main_search_string);

        setupPage(time_value);
        // "setupPage" prepares for view the HTML elements of the visible Section 

        if (url_hash === "" || 
            sctn_main_index_num !== -1)  {
        // If the URL hash is blank or is "#sctn_main", this condition 
        // is triggered.

          if (window_width > 980) {
          // If the width of the browser window is greater than 980px, 
          // this condition is triggered.
            
            animateInfoElement(time_value);
            // The HTML content contained within 'MAIN LANDING SECTION' is 
            // faded into view.
          } 
        } 

        if (sctn_main_index_num !== -1) {
        // If the viewable Section is 'MAIN LANDING SECTION', then this 
        // condition is triggered.

          var email_section_search_string = new String();
          var email_section_search_index_num = new Number();

          email_section_search_string = "email";
          email_section_search_index_num = url_hash.indexOf(email_section_search_string);

          if (email_section_search_index_num !== -1)  {
          // If the visitor has submitted their email for an email alert, 
          // then this condition is triggered.

            animateEmailAlert(url_hash, time_value);
          }
        }

        section_value = url_hash.charAt(6);

        if (section_value === "1") {
        // If the viewable Section is 'SECTION #1', the this condition is 
        // triggered.
          
          formatHeader(url_hash);
          // "formatHeader" formats the text of the header for the Section 
          // which contains the season ticket reservation form based upon 
          // the URL hash. 
        }        
      }
    );
    

    $jQ(window).on("scroll", 
      function () {
        var current_position = new Number();
        // Holds a number which matches the vertical position within the webpage that is viewable.
        var url_hash = new String();

        var info_selector = new String();
        var nav_selector = new String();

        var info_element = new Object();
        var nav_element = new Object();

        var info_css_opacity_val = new String();
        // Holds the value of the CSS property, "opacity" for the HTML element 
        // using the selector, "#info".
        
        current_position = $jQ(window).scrollTop();
        url_hash = window.location.hash;

        info_selector = "#info";
        nav_selector = "nav";

        info_element = $jQ(info_selector);
        nav_element = $jQ(nav_selector);

        info_css_opacity_val = $jQ(info_element).css("opacity");
        
        setURL(current_position, url_hash);
        // "setURL" matches the URL hash with the current viewable Section.

        // setPageInitialLocation(url_hash);
        
        if (current_position < 144) {
        // If the current location of the browser window is above the location of 
        // the logo, this condition is triggered.

          if ($jQ(nav_element).css("opacity") === "1") {
          // If the main menu is visible, this condition is triggered.
            $jQ(nav_element).css("opacity", "0");
            // The opacity of the main menu is changed to 0.
          } // END of "if" STATEMENT which is triggered if the main menu 
            // is visible.

          if (current_position === 0 && 
              info_css_opacity_val === "0") {
          // If the current location of the browser window is 0 and the 
          // HTML content contained within 'MAIN LANDING SECTION' has an 
          // opacity of 0, then this condition is triggered.

            animateInfoElement(time_value);
            // The HTML content contained within 'MAIN LANDING SECTION' is 
            // faded into view.
          } 
        } else {
          if ($jQ(nav_element).css("opacity") === "0")  {
            $jQ(nav_element).css("opacity", "1");
          }
        } 
      } 
    );
    
    $jQ(window).on("hashchange",
      function () {
        var url_hash = new String();

        var nav_visible_search_string = new String();
        // Holds the String, "copyValues=", which is searched for in the value of, 
        // "url_hash".
        var sctn_blank_search_string = new String();
        // Holds a blank String, which is used to determine if the browser has 
        // just loaded the webpage from the top.
        
        url_hash = window.location.hash;

        nav_visible_search_string = "copyValues=";
        sctn_blank_search_string = "";

        if (url_hash.indexOf(nav_visible_search_string) === -1 && 
            url_hash !== "") {
        // If the inter-section navigation which appears on the left 
        // of the browser window is not visible and the URL hash 
        // is not blank, then this condition is triggered.
          
          var nav_selector = new String();
          var nav_element = new Object();

          var nav_width_string = new String();
          // Holds the value of the CSS property, "width", of the HTML element 
          // using the selector, "nav".
          var nav_left_string = new String();
          // Holds the value of the CSS property, "left", of the HTML element 
          // using the selector, "nav".

          var px_search_string = new String();
          // Holds a String which is searched for within the value of 
          // "nav_width_string."
          var px_search_index_num = new Number();
          // Holds the location within the value of, "nav_width_string", that 
          // the value, "px_search_index_num", appears.
          var nav_width_val = new Number();
          // Holds the numeric value of the width of the HTML element, "nav".
          var nav_left_val = new Number();
          // Holds the numeric value of the CSS property, "left", of the 
          // HTML element, "nav".

          var section_value_search_string = new String();
          // Holds the String, "sctn_", which is searched for in the value of, 
          // "url_hash".
          var section_value_search_index_num = new Number();
          // Holds the location within, "url_hash", that the String, "sctn_", is 
          // located.

          var email_section_search_string = new String();
          // Holds the String, "email", which is searched for in the value of, 
          // "url_hash".
          var email_section_search_index_num = new Number();
          // Holds the location within, "url_hash", that the String, "email", 
          // is located.
          var section_value = new String();
          
          nav_selector = "nav";
          nav_element = $jQ(nav_selector);
          
          nav_width_string = $jQ(nav_element).css("width");
          nav_left_string = $jQ(nav_element).css("left");
          
          px_search_string = "px";
          px_search_index_num = nav_width_string.indexOf(px_search_string);

          nav_width_val = nav_width_string.substring(0, px_search_index_num);
          // The numeric value of the width of the HTML element, "nav", is 
          // extracted from the value of "nav_width_string".
          nav_width_val = parseFloat(nav_width_val);
          // The value of "nav_width_val" is changed to an Number.
          nav_width_val = Math.round(nav_width_val);
          // The value of "nav_width_val" is rounded up to the nearest Integer.

          px_search_index_num = nav_left_string.indexOf(px_search_string);
          nav_left_val = nav_left_string.substring(1, px_search_index_num);
          // The numberic value of the CSS property, "left", of the HTML element 
          // "nav", is extracted from the value of "nav_left_val".
          // 
          // The "-" character is not included so that the absolute value of the 
          // CSS property, "left", is taken.
          nav_left_val = parseFloat(nav_left_val);
          // The value of "nav_left_val" is changed to a Number.
          nav_left_val = Math.round(nav_left_val);
          // The numeric value of "nav_left_val" is rounded to an integer.

          section_value_search_string = "sctn_";

          section_value_search_index_num = url_hash.indexOf(section_value_search_string);
          section_value_search_index_num = section_value_search_index_num + section_value_search_string.length;

          section_value = url_hash.charAt(section_value_search_index_num);

          email_section_search_string = "email";
          email_section_search_index_num = url_hash.indexOf(email_section_search_string);

          if (nav_width_val === nav_left_val) {
          // If the main menu of the 
          // browser window is not visible, this condition is triggered.
            
            var current_position = new Number();
            // Holds a number which matches the vertical position 
            // within the webpage that is viewable.
            
            current_position = $jQ(window).scrollTop();

            if (section_value === "5")  {
            // If the viewable section is SECTION #5, then this condition 
            // is triggered.

              var listing_search_string = new String();
              // Holds the String, "listing=" which will be searched for in the value of,  
              // "url_hash".

              listing_search_string = "listing=";

              if (url_hash.indexOf(listing_search_string) !== -1) {
              // If the visitor has made a request to view a job listing, this condition 
              // is triggered.

                var listing_val = new String();
                // Holds a Character representing the listing the link within the <a> element 
                // refers to.
                var url_hash_length = new Number();
                // Holds the total number of characters contained in the "src" attribute of the 
                // <a> element.

                var listing_selector = new String();
                var listings_selector = new String();

                var listing_element = new Object();
                var listings_elements = new Object();

                var not_visible_css = new Object();
                var visible_css = new Object();

                var time_value_short = new Number();
                              
                url_hash_length = url_hash.length;

                listing_val = url_hash.charAt(url_hash_length - 1);

                listing_selector = "#sctn_5-job_listing-" + listing_val;
                listings_selector = ".sctn_5-listing";

                listing_element = $jQ(listing_selector);
                listings_elements = $jQ(listings_selector);

                not_visible_css = {
                  display: "none"
                };

                visible_css = {
                  display: "block", 
                  opacity: "0"
                };

                time_value_short = time_value / 1.25;

                $jQ(listings_elements).css(not_visible_css);
                $jQ(listings_elements).removeClass();
                $jQ(listings_elements).addClass("sctn_5-listing not_visible");

                $jQ(listing_element).removeClass();
                $jQ(listing_element).addClass("sctn_5-listing visible");
                $jQ(listing_element).css(visible_css);
                $jQ(listing_element).fadeTo(time_value_short, 1);

              }
            } else if (section_value === "1") {
            // If the viewable Section is 'SECTION #1', this condition is triggered.

              formatHeader(url_hash);
              // "formatHeader" changes the content of the header when a visitor 
              // completes a season ticket reservation.
            } else if (email_section_search_index_num !== -1) {
            // If the visitor has chosen to view the content relating to email 
            // alerts or the location of the webpage within the browser window 
            // is 1, this condition is triggered.

              animateEmailAlert(url_hash);
              // "animateEmailAlert" displays content which allows the visitor 
              // to sign up for an email alert.
            }
            
            // setPageInitialLocation(url_hash)
            animatePageElements(time_value);
            // "animatePageElements" is called to animate the blocks 
            // that are contained within an individual "window".
          }
        }
      }
    );
    
    $jQ(window).on("resize", 
      function () {
        setupPage(time_value);
        // "setupPage" prepares for view the HTML elements of the visible Section 
      } // END of ".on("resize")" Method
    );

  }
);