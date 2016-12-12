// $(document).ready(function() {
    // debugger;
    var buttonDepot = [
        'deer',
        'owl',
        'panda',
        'rabbit',
        'homer',
        'stewie',
        'dragon',
        'peach',
        'bear',
        'wolf',
        'yoga',
        'laugh',
        'hair',
        'frozen',
        'disney',
        'olaf',
        'magic',
        'cat',
        'kitten',
        'robot',
        'futurama',
        'ice',
        'bike',
        'moose',
        'mulan',
        'vikings',
        'mythoology',
        'boom',
        'chaos',
        'moon',
        'ignite'
        ]

    
    var buttonMaker = function() {
        for (j=0;j<buttonDepot.length;j++) {
            var button = $('<button class="another">').text(buttonDepot[j]);
            $('#button-field').append(button);  
        }
    }

    buttonMaker();

    
//adds new buttons from search input
    $('#click').on('click', function(){
        // debugger;
        var another = $('#guess').val();
        buttonDepot.push(another)
        var button = $('<button class="another">').text(another);
        $('#button-field').append(button);
    })

 //add click function to buttons 
    $(document).on('click','.another', function(){

        $('.gif').remove() //clear all gifs
	
    
        
        var select = $(this).text() //places name into button
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + select + "&api_key=dc6zaTOxFJmzC&limit=10"; //adds name of button to api url

        $.ajax({ 
                url: queryURL,
                method: 'GET'
            })
            .done(function(response) {

            	console.log(response)
            	var results = response.data

               
                for (i=0; i<results.length; i++){
            	   //place gif response into new div

                    var gif = $('<div class=gif>').attr('data-value', i); 
                   
                    
                    var p = $('<p class="rating">').text('rating: '+results[i].rating); 

                    var searchImage = $('<img class="image">').attr('src',results[i].images.fixed_height_small_still.url); //create image and use api url as src 
            		searchImage.css('margin', '2px').attr('data-name', results[i].id); 
                    
                     $('#GIF-field').prepend(gif.append(searchImage).append(p)); 
                     console.log('initial still for image# '+i+' url: '+results[i].images.fixed_height_small_still.url)

            	}
                
            })

        });

    $(document).on('click', '#clear', function(){ //clear button removes all GIFs on the page
        // debugger
        ;
        $('.gif').remove()
    });
    
    //animate images
    $(document).on('click', '.image', function() { 
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







