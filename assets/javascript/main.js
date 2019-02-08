$( document ).ready(function() {
    
    
    $("#new-button").on("click", function(event) {
        event.preventDefault()
        //
        let animalInput = $('#animal-input').val();
        let button= $("<button>");
        button.text(animalInput);
        button.addClass('animals');
        $('#animal-div').append(button);
        console.log("this is the new button:",animalInput);
        $('#animal-input').val("");

    })
    //create array for holding still image urls
    let gifStill = [];
    $("body").on("click", ".animals", function() {
        //empty still image url array
        gifStill=[];
        //empty div of gifs
        $('#gif-div').empty();
        //create dynamic gif api url based off animal in button
        var animal = $(this).text();
        console.log(animal);
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          animal + "&api_key=dc6zaTOxFJmzC&limit=10";
  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            //logs the giphy response object
          console.log(response);
            
          const results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            //div for gif and rating
            const animalDiv = $('<div>');
            //holder for rating
            const p = $('<p>');
            p.text(results[i].rating)
            // Make an image tag with jQuery and store it in a variable named animalImage.
            const animalImage = $('<img>');
            // push still urls into an array
            gifStill.push(results[i].images.fixed_height_still.url)
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            animalImage.attr("id","gif"+i)
            //create gif class for gif click listener
            animalImage.addClass("gif");
            // Append the p variable to the animalDiv variable.
            animalDiv.append(p, animalImage);
            // Append the animalImage variable to the animalDiv variable.
            // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
            $("#gif-div").prepend(animalDiv);

          }
        });
    });

    $("body").on("click", ".gif", function() {
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        //for loop to set every image to sill when any image is clicked
        for (var j = 0; j < 10; j++){
            $("#gif"+j).attr("src", gifStill[j]);
            $("#gif"+j).attr("data-state", "still");
        }
        //animate if the image was still,
        //actually not 100% why it works, I would think that if an animated picture was clicked,
        //the state would reset to still and thus satisfy the if statement and change it to animate again...
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } 
      });
})


