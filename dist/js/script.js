$(document).ready(function(){

	//Create Slider

	$('.carousel__inner').slick({
		speed: 1200,
		adaptiveHeight: true,
		autoplay: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrow-prev.png"></img></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/arrow-next.png"></img></button>',
		responsive: [
			{
				breakpoint: 991,
				settings: {				  
				  	arrows: false,				
					dots: true					
				}
			}
		]
	});

	// Create Tabs

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	// function toggleSlide(item) {
	// 	$(item).each(function(i) {
	// 		$(this).on('click', function(e) {
	// 			e.preventDefault();
	// 			$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
	// 			$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
	// 		});
	// 	});
	// }
	// toggleSlide('.catalog-item__link');
	// toggleSlide('.catalog-item__back');

	function toggleSlide(items) {
		items.forEach((item, i) => {
			item.addEventListener('click', (e) => {
				e.preventDefault();
				document.querySelectorAll('.catalog-item__content')[i].classList.toggle('catalog-item__content_active');
				document.querySelectorAll('.catalog-item__list')[i].classList.toggle('catalog-item__list_active');
			})
		})
	}
	toggleSlide(document.querySelectorAll('.catalog-item__link'));
	toggleSlide(document.querySelectorAll('.catalog-item__back'));

	//Modal

	// $('[data-modal = consultation]').on('click', function() {
	// 	$('.overlay, #consultation').fadeIn();
	// });

	// $('.modal__close').on('click', function() {
	// 	$('.overlay, #consultation, #order, #thanks').fadeOut();
	// });
	
	// $('.button_mini').each(function(i) {
	// 	$(this).on('click', function() {
	// 		$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
	// 		$('.overlay, #order').fadeIn();
	// 	});
	// });

	document.querySelectorAll('[data-modal = "consultation"]').forEach(function(item) {
		item.addEventListener('click', () => {
			document.querySelector('.overlay').style.display='block'
			document.querySelector('#consultation').style.display='block'
		})
	})

	document.querySelectorAll('.modal__close').forEach(function(item) {
		item.addEventListener('click', () => {
			document.querySelector('.overlay').style.display='none'
			document.querySelector('#consultation').style.display='none'
			document.querySelector('#order').style.display='none'
			document.querySelector('#thanks').style.display='none'
		})	
	})

	document.querySelectorAll('.button_mini').forEach(function(item, i) {
		item.addEventListener('click', () => {
			document.querySelector('#order .modal__descr').innerHTML = document.querySelectorAll('.catalog-item__subtitle')[i].innerHTML
			document.querySelector('.overlay').style.display='block'
			document.querySelector('#order').style.display='block'
		})
	})

	// Validation

	function validateForm(form) {
		$(form).validate({
			rules:{
				name: {
					required: true,
					minlength: 2
				},
				phone: 'required',
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите Ваше имя",
					minlength: jQuery.validator.format("Требуется не менее {0} символов")
				},		
				phone: "Пожалуйста, введите Ваш номер телефона",
				email: {
				  required: "Пожалуйста, введите Ваш Email",
				  email: "Ваш Email должен быть в формате: name@domain.com"
				}
			}
		});
	}

	validateForm('#consultation-form');
	validateForm('#consultation form');
	validateForm('#order form');

	// Mask for phone (type='number' must be deleted)

	$('input[name=phone]').mask("+7(999) 999-99-99");

	// ajax request

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val('');
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn();
			$('form').trigger('reset');
		});
		return false;
	});

	// Smooth scroll and pageup

	// $(window).scroll(function() {
	// 	if ($(this).scrollTop() > 1600) {
	// 		$('.pageup').fadeIn();
	// 	} else {
	// 		$('.pageup').fadeOut();
	// 	}
	// });
	
	window.addEventListener('scroll', () => {		
		if ((document.documentElement.scrollTop || window.pageYOffset) > 1600) {
			document.querySelector('.pageup').style.display = 'block'
		} else {
			document.querySelector('.pageup').style.display = 'none'
		}
	})	

	$("a[href=#up]").click(function(){
		const _href = $(this).attr("href");
		$("html, body").animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	new WOW().init();
});