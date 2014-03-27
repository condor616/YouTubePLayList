
var thumbsUrl = [];
var numberOfItems = $(videos).size();
var counter =0;


var thumbs = {
	
	titles: [numberOfItems],
	
	durations: [numberOfItems],
	
	convertTime: function(seconds){
		var m = Math.floor(seconds/60);
		var s = Math.ceil(seconds%60);
		var result = m  + ":" + (s  < 10 ? "0" + s : s);

		return  result;
	},
		
	loadUrl: function(){
		
		//Insert the first video
		iframe = $('div.video-container').find('iframe');
		$('div.video-container').append("<iframe width=\"560\" height=\"315\" frameborder=\"0\" allofullscreen></iframe>");
		$('div.video-container').find('iframe').attr("src","http://www.youtube.com/embed/"+videos[0]);
		
				
		for (var i=0; i<numberOfItems; i++){
			
			var video = $('div.preview-container');
			
			video.append("<div class=\"video\" id=\" " + videos[i] + "\"><div class=\"thumb\"></div><div class=\"details\"><span class=\"title\"></span></div></div>");
			
			var videoId = videos[i];		
			thumbsUrl[i] = "http://img.youtube.com/vi/" + videoId + "/default.jpg";
			
			//Display image in the righ sidebar
			video.find('div.video:eq('+i+') .thumb').css('background-image','url('+thumbsUrl[i]+')');
			video.find('div.video:eq('+i+') .thumb').css('background-repeat','no-repeat');
			
			if (i==numberOfItems-1){
				$('div.video:eq('+i+')').addClass('last-item');
			}	
			
			$.ajax({
				type: 'GET',
				cache:false,
				async: false,
				crossDomain:true,
  				url: "http://gdata.youtube.com/feeds/api/videos/"+videoId+"?v=2&alt=jsonc",
				dataType: "json",
  				success: function(info){
					thumbs.durations[i] = info.data.duration;
					thumbs.titles[i] = info.data.title;
					thumbs.titles[counter++] = info.data.title;
					$('div.preview-container div.video:eq('+i+')').find('div.details span.title').html(thumbs.convertTime(thumbs.durations[i]) +"<br />"+ thumbs.titles[i]);
				},
					error: function(jqXHR, textStatus, errorThrown) {
        			console.log(jqXHR.getResponseHeader("content-type"));
    			}			
			});
		}
		
		thumbs.addEventListeners();

	},
	
	addEventListeners: function(){
		
		$('.preview-container.bottom .video .thumb').each(
			function(index, element) {
            	
				$(this).click(
						function(){
								$('div.video-container').find('iframe').attr("src","http://www.youtube.com/embed/"+videos[index]);				
						}
				);
				console.log(index,element);
			
        	}
		);
		
	}
	
	
	
	
};


$(document).ready(thumbs.loadUrl);
