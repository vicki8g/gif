// $(document).ready(function() {
    // debugger;
    var buttonDepot = [
        'monkey',
        'owl',
        'koala',
        'deer',
        'seal',
        'hummingbird',
        'killer whale',
        'chameleon',
        'horse',
        'coyote',
        'brown bear',
        'gazelle',
        'bear',
        'ocelot',
        'reindeer',
        'turtle',
        'rabbit',
        'cat',
        'gorilla',
        'pig',
        'dog',
        'chipmunk',
        'beaver',
        'antelope',
        'squirrel',
        'black bear',
        'raccoon',
        'rhinoceros',
        'moose',
        'blue Jay',
        'iguana'
        ]
//creates all pre-made buttons ************************************************
    
    var buttonMaker = function() {
        for (j=0;j<buttonDepot.length;j++) {
            var button = $('<button class="another">').text(buttonDepot[j]);
            $('#button-field').append(button);  
        }
    }

    buttonMaker();

    
//creates a new button and adds it to the button pool ***************************
    $('#click').on('click', function(){
        // debugger;
        var another = $('#guess').val();
        buttonDepot.push(another)
        var button = $('<button class="another">').text(another);
        $('#button-field').append(button);
    })

 //This is when you click a button **********************************************  
    $(document).on('click','.another', function(){

        $('.gif').remove() //erases all current GIFs when a button is clicked 
	
    // debugger;
        
        var select = $(this).text() //stores the name of the button into var select
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + select + "&api_key=dc6zaTOxFJmzC&limit=10"; //adds name of button to api url

        $.ajax({ 
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

            	console.log(response)
            	var results = response.data

               
                for (i=0; i<results.length; i++){
            		// debugger;

                    var gif = $('<div class=gif>').attr('data-value', i); //create a div for every gif in response 
                   
                    
                    var p = $('<p class="rating">').text('rating: '+results[i].rating); //print rating to screen 

                    var searchImage = $('<img class="image">').attr('src',results[i].images.fixed_height_small_still.url); //create image and use api url as src 
            		searchImage.css('margin', '2px').attr('data-name', results[i].id); //little css
                    
                     $('#GIF-field').prepend(gif.append(searchImage).append(p)); //append images to #gidfield
                     console.log('initial still for image# '+i+' url: '+results[i].images.fixed_height_small_still.url)

            	}
                
            })

        });

    $(document).on('click', '#clear', function(){ //clear button removes all GIFs on the page
        // debugger
        ;
        $('.gif').remove()
    });
    
    //When you click on the image to make it animate ****************************************************
    $(document).on('click', '.image', function() { //when an image is clicked: 
        // debugger;
        var queryURL = "http://api.giphy.com/v1/gifs?&api_key=dc6zaTOxFJmzC&limit=10&ids="+ $(this).attr('data-name'); //use api id stored in data-name
        var thisImageUrl = $(this).attr('src')
        var parentDivValue = $(this).parent('div').attr('data-value')
        $.ajax({
                    url: queryURL,
                    method: 'GET'
                })
                .done(function(response) {
                    // debugger;
            var still = response.data[0].images.fixed_height_small_still.url
            var moving = response.data[0].images.fixed_height_small.url
            
            if(thisImageUrl == still) {
                // debugger
                thisImageUrl = moving
                $('div[data-value='+parentDivValue+']').children('.image').attr('src', thisImageUrl)
            }else if (thisImageUrl == moving){
                thisImageUrl = still
                $('div[data-value='+parentDivValue+']').children('.image').attr('src', thisImageUrl)
            }



                
        });
    });







