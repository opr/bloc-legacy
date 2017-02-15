$(document).ready(function(){
	$('.carousel__content').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		prevArrow: '<button type="button" class="slick-prev"></button>',
		nextArrow: '<button type="button" class="slick-next"></button>',
		responsive: [
		    {
		      	breakpoint: 600,
		      		settings: {
		        		slidesToShow: 1,
		        		slidesToScroll: 1,
		        		infinite: true
		      		}
		    }
		]
	});
});