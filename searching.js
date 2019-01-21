src = "https://code.jquery.com/jquery-3.3.1.min.js";
integrity = "sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=";
crossorigin = "anonymous";

var inputText = "";
$("input").change(function() {
  inputText = $("input").val();
});

// Pressing Enter button
var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("myBtn").click();
  }
});

/*
   Code included inside $( document ).ready() will only run
   once the page DOM is ready for JavaScript code to execute.
*/
$(document).ready(function() {
  // Clicking Search Icon Button
  $("button").click(function() {
    //Input condition for empty string
    if (inputText === "") {
      return;
    } else {
      $.ajax({
        url:
          "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000",
        success: function(result) {
          let response = inputText;
          for (var i = 0; i < result.length; i++) {
            if (result[i].keywords.includes(inputText)) {
              var htmlContent = "";
              htmlContent +=
                ' <p class="titleMargin"> <i class=" fa fa-star" ></i> ' +
                result[i].title +
                "</p>" +
                "<p>" +
                result[i].body
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")
                  .replace(/&amp;nbsp;/g, " ") +
                "</p>";

              $(".container").html(htmlContent);

              var isClicked = true;
              $(".fa-star").click(function() {
                var color = isClicked ? "green" : "grey";
                $(this).css("color", color);
                $(".favContent").html(htmlContent);
                //Changed toggle
                if ($(this).css("color") === "rgb(0, 128, 0)") {
                  $(".favContent").show();
                } else {
                  $(".favContent").hide();
                }

                isClicked = !isClicked;
              });
            }
          }
        }
      });
    }
  });
});
