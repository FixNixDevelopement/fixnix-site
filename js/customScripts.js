(function($) {
// JavaScript Document
$(document).ready(function() {

	/*global $:false */
	var obert=false;

	$('ul.slideshow li').addClass('ocult');
	$('ul.slideshow li:first-child').removeClass('ocult').addClass('visi');

	function mostra(){
		if(!$('.slideshow .visi').next().length){
			$('.slideshow .visi').removeClass('visi').addClass('ocult');
			$('ul.slideshow li:first-child').removeClass('ocult').addClass('visi');
		}else{
			$('.slideshow .visi').removeClass('visi').addClass('ocult').next().removeClass('ocult').addClass('visi');
		}
	}

	// ----------- FREEBIES IPHONE SLIDESHOW ----------- //
	var i=0;
	var timer=null;

	function start(){
		timer = setInterval(function() {mostra(i);}, 4000);
	}

	start();

// ----------- TEAM SOCIAL MENU ----------- //

	$(".photo-footer").mouseenter(function() {
			$(".plus-btn", this).stop().animate({top:70},'fast');
	});

	$(".photo-footer").mouseleave(function() {
			$(".plus-btn", this).stop().animate({top:0},'fast');
	});
	
	// ----------- TEAM NEXT/PREV ----------- //

	var y=0;

	$(".dir-right").click(function() {
		if(!$(this).hasClass('disable-2')){
			$(".jump"+(y+1)).click();
		}
	});

	$(".dir-left").click(function() {
		if(!$(this).hasClass('disable')){
			$(".jump"+(y-1)).click();
		}
	});

	var teams = $('.team li');
	var dotsul = '';
	teams.each(function (index) {
		if (index===0){dotsul = '<ul class="dotsmenu">';}
		dotsul += '<li class="dots jump' + index + '" id="' + index + '"></li>';
		if (index===teams.length-1) {
			dotsul += '</ul>';
			$('.team').after(dotsul);
		}
	});
	// ----------- TEAM DOTS ----------- //


	$(".dots").click(function() {
			$(".teamshow").stop().animate({scrollLeft:pos[$(this).attr('id')]},'slow');
			$('.activo').removeClass('activo');
			$(this).addClass('activo');
			y=parseInt($(this).attr('id'),10);

			if(y===0){$('.dir-left').addClass('disable');}else{$('.dir-left').removeClass('disable');}

			if(tamany>2){
				if(y===2){$('.dir-right').addClass('disable-2');}else{$('.dir-right').removeClass('disable-2');}
			}else
			if(tamany===2){
				if(y===8){$('.dir-right').addClass('disable-2');}else{$('.dir-right').removeClass('disable-2');}
			}else
			if(tamany===1){
				if(y===8){$('.dir-right').addClass('disable-2');}else{$('.dir-right').removeClass('disable-2');}
			}
	});

	var res= null;
	var tamany= null;
	var pos= null;
	var old= null;
	recalcul();

	$(window).bind("resize", function(){
		old=tamany;
		recalcul();
		if(old!==tamany){
			$(".jump0").click();
			if(obert===true){obre($actual.attr('id'));}
		}
		
		magia();
	});

	function recalcul(){
		res=$(window).width();
		if (res > 959) { tamany=4; pos=[0,900,1800];} else
		if (res > 767) { tamany=3; pos=[0,780,1555]; } else
		if (res > 479) { tamany=2; pos=[0, 302, 604, 903, 1204, 1507, 1782, 2085, 2385];} else
		if (res < 480) { tamany=1; pos=[0, 302, 604, 903, 1204, 1507, 1782, 2085, 2385]; }
	}

// ----------- PROJECT WINDOW SHOW/HIDE ----------- //

	var $actual= null;

	$(".ch-grid").click(function() {
			$.scrollTo( $('#project-show'), 800, {offset:-130});
			obre($(this).attr('id'));
			$actual=$(this);
//			alert($('.project-content').position().top)
//			$('html,body').animate({scrollTop:($('.project-content').position().top)+165}, 1000);
	});

	$(".portfolio-btn").click(function() {
			obert=false;
	});
			
	function obre(quin){
	$.ajax({
		//type: "POST",
		//data: { id: $(this).attr('cid')},
		url: quin,
		success: function(data) {


			$('.project-content').html(data);
			
			/*  Gallery Works */
			function portfolio(){
				
			l = $(".thumb-project li").length;
			ample=$(".img-project").width();
			$('.thumb-project').css('width',ample*l)
			$('.thumb-project li').css('width',ample)
			
			ini = 1;
			$(".img-prev").css('display', 'none');
			$(".thumb-project").stop().animate({scrollLeft:0},'fast');
			
			$(".img-next").click(function(){
			  $(".img-project").stop().animate({scrollLeft:"+="+ample},'slow');
			  ini++;
			  if(ini>=l){
			  ini=l;
			  $(".img-next").css('display', 'none');
			  }else{
				  $(".img-prev").css('display', 'block');
			  }
			  //alert(ini);
		  	 });
		   
			$(".img-prev").click(function(){
			  $(".img-project").stop().animate({scrollLeft:"-="+ample},'slow');
			  ini--;
			  if(ini<=1){
			  ini=1;
			  $(".img-prev").css('display', 'none');
			  
			  }else{
				 $(".img-next").css('display', 'block'); 
			  }
			  //alert(ini);
		   	});
			
			/*if(ini=1){
			  $(".img-prev").css('display', 'none');
			  }else{
			  $(".img-prev").css('display', 'block');	
			}
			if(ini=l){
			  $(".img-next").css('display', 'none');
			  }else{
			  $(".img-next").css('display', 'block');	
			}*/
			
		}
		portfolio();
		
		tanca();
		dots();
		canvia();
		if( obert===false){$(".project-window").slideDown("slow");}
		obert=true;
			
		//per calcular la alçada per animar
/*        var $newHTML  = $('<div class="dummy" style="position : absolute; left : -9999px;">' + data + '</div>').appendTo('body'),
        theHeight = $newHTML.height();
		alert(theHeight)
		$('.project-content').css('height',theHeight);
        $('.dummy').remove();*/
			
			/*  end Gallery Works */
		}
	});
	}


	function tanca(){

		$(".close").click(function() {
			$(".project-window").slideUp("slow");
			obert=false;
		});

	}


	function seguent(){
		if($actual.parent().next().hasClass('final')){
			$actual=$($('.inici').next().children('.ch-grid'));
		}else{
			$actual=$($actual.parent().next().children('.ch-grid'));
		}

		if($actual.parent().hasClass('isotope-hidden')){
			seguent();
		}else{
			obre($actual.attr('id'));
		}
	}

	function enrera(){
		if($actual.parent().prev().hasClass('inici')){
			$actual=$($('.final').prev().children('.ch-grid'));
		}else{
			$actual=$($actual.parent().prev().children('.ch-grid'));
		}

		if($actual.parent().hasClass('isotope-hidden')){
			enrera();
		}else{
			obre($actual.attr('id'));
		}
	}

	function canvia(){

		$('.btn-next').click(function() {
			seguent();
		});
		$('.btn-prev').click(function() {
			enrera();
		});
	}


	// ----------- PORTFOLIO DOTS ----------- //
	function dots(){

	$(".jump12").click(function() {
			$(".img-project").stop().animate({scrollLeft:0},'slow');
			$('.activo2').removeClass('activo2');
			$(this).addClass('activo2');
	});

	$(".jump22").click(function() {
			$(".img-project").stop().animate({scrollLeft:694},'slow');
			$('.activo2').removeClass('activo2');
			$(this).addClass('activo2');
	});

	$(".jump32").click(function() {
			$(".img-project").stop().animate({scrollLeft:1388},'slow');
			$('.activo2').removeClass('activo2');
			$(this).addClass('activo2');
	});

	$(".jump42").click(function() {
			$(".img-project").stop().animate({scrollLeft:2082},'slow');
			$('.activo2').removeClass('activo2');
			$(this).addClass('activo2');
	});
	$(".jump52").click(function() {
			$(".img-project").stop().animate({scrollLeft:2776},'slow');
			$('.activo2').removeClass('activo2');
			$(this).addClass('activo2');
	});
	$(".jump62").click(function() {
			$(".img-project").stop().animate({scrollLeft:3470},'slow');
			$('.activo2').removeClass('activo2');
			$(this).addClass('activo2');
	});

	$(".jump72").click(function() {
			$(".img-project").stop().animate({scrollLeft:4164},'slow');
			$('.activo2').removeClass('activo2');
			$(this).addClass('activo2');
	});
	$(".jump82").click(function() {
			$(".img-project").stop().animate({scrollLeft:4857},'slow');
			$('.activo2').removeClass('activo2');
			$(this).addClass('activo2');
	});
	}


	// ----------------- EASING ANCHORS ------------------ //

	$('a[href*=#]').click(function() {

     if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {

             var $target = $(this.hash);

             $target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');

             if ($target.length) {

                 var targetOffset = $target.offset().top;

                 $('html,body').animate({scrollTop: targetOffset-100}, 1000);

                 return false;

            }

       }

   });

   //parallax

	$(window).bind("scroll", function(){//when the user is scrolling...
		Move('.paraOn'); //move the background images in relation to the movement of the scrollbar
	});

	function Move(seccio){
		$(seccio).each(function(){
			if($(this).attr('id')==='banner'){
				$(this).css('background-position', '0 '+$(window).scrollTop()/3+'px');
			}else{
				$(this).css('background-position', '0 '+(($(window).scrollTop()+$(window).height()-$(this).attr('yPos'))/3+$(this).height())+'px');
			}
		});
	}

   //inview

   $('.parallax').bind('inview', function (event, visible) {
		if (visible === true) {
		// element is now visible in the viewport
		var offset = $(this).offset();
		$(this).addClass('paraOn').attr('yPos',offset.top);
		} else {
		// element has gone out of viewport
		$(this).removeClass('paraOn');
		}
});

});// JavaScript Document
})(jQuery);


/*  Recent Works Slider */

function bullets(){ // Automatic Adding Bullets
	
	var q = $("#slider li").length;
    fragment = document.createDocumentFragment(), 
    li = document.createElement('li');
	while (q--) {
		fragment.appendChild(li.cloneNode(true));
	}
	$('.bullets ul').append(fragment);
}// end Automatic Adding Bullets
bullets();

var n = $("#slider li").length;


function magia(){
	res=$(window).width();
	$('#slider').css('width',res*n)
	$('#slider li').css('width',res)
	
	$('.bullets ul li').removeClass('selected');
	$('.bullets ul li:first-child').addClass('selected');
	
	$(".anythingSlider").stop().animate({scrollLeft:0},'fast');
}	


	var index = 0;
	var pos = 1;

	$(".next").click(function(){
		if( index != $(".bullets ul li").size()-1){
		  index++;
		  $(".anythingSlider").stop().animate({scrollLeft:res*index},'slow');
		  pos++;
		  $('.bullets ul li.selected').removeClass('selected').next().addClass('selected');
	}
	  //$('.bullets ul li:nth-child("pos")').addClass('selected');
	  //alert(pos);
	  
   });
   
	$(".prev").click(function(){
	  if( index!=0 ){
		  index--;
		  $(".anythingSlider").stop().animate({scrollLeft:res*index},'slow');
		  pos--;
		  $('.bullets ul li.selected').removeClass('selected').prev().addClass('selected');
	  }
	  //$('.bullets ul li:nth-child("pos")').addClass('selected');
	  //alert(pos);
	  
   });
   
   $(".bullets ul li").click(function(){
	   index = $(this).index();
	   $(".anythingSlider").stop().animate({scrollLeft:res*index},'slow');
	   $('.bullets ul li').removeClass('selected');
	   $(this).addClass('selected');
   });

magia();