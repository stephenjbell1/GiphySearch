 

var animals = ["Lion", "Elephant", "Dog", "Cat", "Dolphin"];
0
function displayAnimalInfo() {
  clear();
  var gifCount = 0;
  for( i=0; i<10; i++) {


    var animal = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + animal + " animal";


        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          console.log(response);

          var animalDiv = $("<div class='animal'>");

          var imgURLStill = response.data.fixed_height_small_still_url;
          var imgURLMove = response.data.fixed_height_small_url;
          var image = $("<img class = 'gif'>").attr("src", imgURLStill).attr("data-still", imgURLStill).attr("data-animate", imgURLMove).attr("data-state", "still");
          var rating = response.data.rating;
          var p = $("<p>").text("Rating: " + rating);

            
          animalDiv.prepend(p);
          animalDiv.append(image);

          $("#animals-view").prepend(animalDiv);
          image.on("click", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }); console.log(i);
          if(++gifCount == 10) {
          $("#animals-view").show(); 
        }

        });
      } 
    }


    function clear() {
      $("#animals-view").html("").hide();
      $("#")
    }

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < animals.length; i++) {

          var a = $("<button>");
          a.addClass("search-animal");
          a.attr("data-name", animals[i]);
          a.text(animals[i]);
          $("#buttons-view").append(a);
        }
      }

      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        var animal = $("#animal-input").val().trim();

        animals.push(animal);

        renderButtons();
      });

      $(document).on("click", ".search-animal", displayAnimalInfo);

      renderButtons();