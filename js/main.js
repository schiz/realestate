var Site = Site || {};

Site = Backbone.View.extend({
	events: {
		'mouseenter nav a' : 'nav_hoverOn',
		'mouseleave  nav a' : 'nav_hoverOff',
		'click nav a' : 'emulateContentChange',

		'mouseenter li.rooms' : 'rooms_hoverOn',
		'mouseleave li.rooms' : 'rooms_hoverOff',
		'click li.rooms' : 'rooms_click',

		'mouseenter div.city-button' : 'cityButton_hoverOn',
		'mouseleave div.city-button' : 'cityButton_hoverOff',
		'click div.city-button' : 'cityButton_click',

		'mouseenter input.price-to-form' : 'priceToForm_hoverOn',
		'mouseleave input.price-to-form' : 'priceToForm_hoverOff',
		'focus input.price-to-form' : 'priceToForm_focus',

		'mouseenter .form-input' : 'formInput_hoverOn',
		'mouseleave .form-input' : 'formInput_hoverOff',
		'focus .form-input' : 'formInput_focus',

		'change .step2 .form-input' : 'formInput_change',

		'click .next-button' : 'nextButton_click',

		'click .green-btn'	: 'greenBtn_click',

		'click .bullets' : 'slide',

		'click #otherCityLink' : 'showCities'
	},
	initialize:function(){
		this.setElement('body');
		this.addDigits();
		this.addShowMore();
		this.addBullets();
		this.render();
	},

	nav_hoverOn: function(e){		
		$(e.currentTarget).addClass('hovered');
	},
	nav_hoverOff: function(e){
		$(e.currentTarget).removeClass('hovered')
	},
	emulateContentChange: function(e){
		$(e.currentTarget).toggleClass('clicked')
        				  .siblings('a').removeClass('clicked')
		
		if ($('.step1').is(':hidden')) $('.step2').fadeOut(500,function(){$('.step1').fadeIn(500)});
		if ($('.step2').is(':hidden')) $('.step1').fadeOut(500,function(){$('.step2').fadeIn(500)});        
	},
	rooms_hoverOn: function(e){
		if ($(e.currentTarget).hasClass('on')) return;        
        
        $(e.currentTarget).addClass('hovered')
        				  .find('i').addClass('hovered')
	},
	rooms_hoverOff: function(e){
		$(e.currentTarget).removeClass('hovered')
        				  .find('i').removeClass('hovered');
	},
	rooms_click: function(e){
		if ($(e.currentTarget).hasClass('on')) return;

         $(e.currentTarget).toggleClass('on')
					       .siblings().removeClass('on').end()
					       .find('i').toggleClass('on').end()
					       .siblings().find('i').removeClass('on')
	},
	cityButton_hoverOn: function(e){
		if ($(e.currentTarget).hasClass('on')) return;

        $(e.currentTarget).addClass('hovered');
	},
	cityButton_hoverOff: function(e){
		$(e.currentTarget).removeClass('hovered');
	},
	cityButton_click: function(e){
		if ($(e.currentTarget).hasClass('on')) return;

        $(e.currentTarget).addClass('on')
        				  .siblings().removeClass('on');
	},
	priceToForm_hoverOn: function(e){
		$(e.currentTarget).addClass('hovered');
	},
	priceToForm_hoverOff: function(e){
		$(e.currentTarget).removeClass('hovered');
	},
	priceToForm_focus: function(e){
		 $(e.currentTarget).addClass('focused')
         				   .attr('placeholder','');
	},
	formInput_hoverOn: function(e){
		$(e.currentTarget).addClass('hovered');
	},
	formInput_hoverOff: function(e){
		$(e.currentTarget).removeClass('hovered');
	},
	formInput_focus: function(e){
		$(e.currentTarget).addClass('focused');
	},
	nextButton_click: function(e){
		e.preventDefault()

		 $(e.currentTarget).addClass('clicked')
		 				   .delay(100)
		 				   .removeClass('clicked');
		 
        $('.step1').fadeOut('500',function(){
          $('span.step').html('Шаг 2 из 2')
          $('.step2').fadeIn('500');
        })
	},
	greenBtn_click: function(e){
		e.preventDefault();

		$(e.currentTarget).addClass('clicked');
		 	setTimeout(function(){
		 		$(e.currentTarget).removeClass('clicked');
		 	},100)
		 				   
	},
	formInput_change: function(e){
		if ($(e.currentTarget).parents('figure').hasClass('name')) {             
           $('.step2 .name i').addClass('success').show();
         }
         if ($(e.currentTarget).parents('figure').hasClass('phone')) {             
           $('.step2 .phone i').addClass('error').show();
         }
	},
	showCities: function(e){
		e.preventDefault();		
		$.modal($('<div id="modalText"></div>'))
	},
	slide: function(e){
		if ($(e.currentTarget).hasClass('active')) return;

          var index = $(e.currentTarget).index();
          
          $(e.currentTarget).addClass('active')
                            .siblings('div.bullets')
                            .removeClass('active')
          
          $('.success-slide').fadeOut('500').eq(index).fadeIn('1000'); 
	},
	addDigits: function(){
		 $('.digits').each(function(i,item){
          var text = $(item).text(),c;          		
            $(item).html('');
    var textChars = text.split('');

            for(var c=0; c<text.length;c++){   
                   
             if (textChars[c] === ',') {
             	
               $(item).append('<span class="coma">'+textChars[c]+'</span>');       
             } else {      
 
               $(item).append('<span><img class="block-line" src="img/blockLine.png"/>'+textChars[c]+'</span>');              
             }                    
            }
        })
	},
	addShowMore: function(){
		if ( $('p.text').text().search('{showMore}') !== -1 ) {

	        $.each($('p.text'), function(i,item){

	          var marker = $(item).text().search('{showMore}'),
	              fullText = $(item).text(),     
	              showLink = $('<span class="showMore" id="show">показать всё</span>'),
	              hideLink = $('<span class="showMore" id="hide">спрятать</span>'),
	              textHeight = $(item).height(),
	              article = $(item).parents('article'),
	              articleHeight = article.height(),
	              offset = articleHeight - textHeight,
	              cutText;
	              
	            cutText = fullText.substring(0,marker);
	            cutText = cutText.substring(0, cutText.length - 1 ) + '... ';      
	            fullText = fullText.replace(/(\{.*\})/, "");

	            $(item).html(cutText).append(showLink);

	            
	            $(item).on('click.showMore', '#show',function(){

					if (navigator.appVersion.indexOf("MSIE 7.") != -1){

						 $('.success-bkg').height($('.success-bkg').height() + $(item).height());	              
		                 $('.middle-bkg').height($('.middle-bkg').height() + $(item).height());        
		                  $('.footer-bkg').css('marginTop', $(item).height());          
		                 $('.bullets-block').css('marginTop', $(item).height() + parseInt( $('.bullets-block').css('marginTop')))
		                 article.css('height', 'auto');
					}  else {
						 $('.success-bkg').height($('.success-bkg').height() + offset);	              
		                 $('.middle-bkg').height($('.middle-bkg').height() + offset);               
		                 $('.footer-bkg').css('marginTop', offset)   
		                 $('.bullets-block').css('marginTop', offset + parseInt( $('.bullets-block').css('marginTop')))
		                 article.css('height', 'auto'); 

					}	            	
	            		
	               $(this).parents('article p.text')
	                      .html(fullText).append(hideLink);
	                     	                	             
	            })

	            $(item).on('click.showMore','#hide',function(){ 

	            	if (navigator.appVersion.indexOf("MSIE 7.") != -1){ 
	            		$('.success-bkg').height($('.success-bkg').height() - 120);
	               		$('.middle-bkg').height($('.middle-bkg').height() - 120);
	               		$('.footer-bkg').css('marginTop', 0);
	               		$('.bullets-block').css('marginTop', -(120 - parseInt( $('.bullets-block').css('marginTop')))) 
	               		$(this).parents('article p.text').html(cutText).append($('<span class="showMore" id="show">показать всё</span>')); // не материте меня, это из долбаного ие
	               		article.css('height', articleHeight);

	            	} else { 
	            		$('.success-bkg').height($('.success-bkg').height() - offset);
	               		$('.middle-bkg').height($('.middle-bkg').height() - offset);
	               		$('.footer-bkg').css('marginTop', 0);
	               		$('.bullets-block').css('marginTop', -(offset - parseInt( $('.bullets-block').css('marginTop')))) 
	               		$(this).parents('article p.text').html(cutText).append($('<span class="showMore" id="show">показать всё</span>'));  
	               		article.css('height', 'auto'); 
	            	}
	               
	            })         
	        })  
	    }
	},
	addBullets: function(){
		var bulletsCount = $('.success-slide').length,            
            i;
        
        for (i=0;i<bulletsCount;i++) {		
          $('.bullets-block').append($('<div class="bullets"></div>'));
        }
	},
	render:function(){
		$('.bullets').eq(0).addClass('active');
	}

});


jQuery(document).ready(function($){
	new Site;
})

