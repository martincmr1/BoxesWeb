/*
	JS: 	JS Global
	By:		LayoutFlow
	URL: 	https://layoutflow.com
*/	


	// JAVASCRIPT

		// COPYRIGHT YEAR (AUTOMATIC)
		let getyear = new Date().getFullYear();
		let getyeardiv = document.getElementById('year');
		if(getyeardiv){
			getyeardiv.innerHTML = getyear;
		}


		// HEADER FIXED
		function headerfixed(){
			let getheaderdiv = document.getElementsByTagName('header')[0].classList;
			if(document.documentElement.scrollTop > 100){
				getheaderdiv.add('sticky');
			}else{
				getheaderdiv.remove('sticky');
			}
		}
		window.onscroll = headerfixed;


	// JQUERY
		jQuery(document).ready(function($){
			// Navigation
			var menuid = '#navigation';
			var gaptop = 135;
			var scrollspeed = 1200;
			var menu_active_class = 'active';
			var lastId,topMenu=$(menuid),topMenuHeight=topMenu.outerHeight()+gaptop,menuItems=topMenu.find("a"),scrollItems=menuItems.map(function(){var t=$($(this).attr("href"));if(t.length)return t});menuItems.click(function(t){var e=$(this).attr("href"),n="#"===e?0:$(e).offset().top-90;$("html, body").stop().animate({scrollTop:n},scrollspeed),t.preventDefault()}),$(window).scroll(function(){var t=$(this).scrollTop()+topMenuHeight,e=scrollItems.map(function(){if($(this).offset().top<t)return this}),n=(e=e[e.length-1])&&e.length?e[0].id:"";lastId!==n&&(lastId=n,menuItems.parent().removeClass(menu_active_class).end().filter("[href='#"+n+"']").parent().addClass(menu_active_class))});


			// Nav Behaviour in Mobile
			$('a.showmenu').click(function(){
				$('.headermenu').fadeIn();
				$('a.hidemenu').fadeIn('slow');
				$('body').addClass('disable');
			});
			$('a.hidemenu').click(function(){
				$('.headermenu').fadeOut();
				$(this).hide();
				$('body').removeClass('disable');
			});
			$('nav ul li').click(function(){
				let getscreenwidth = $(window).width();
				if(getscreenwidth < 1201){
					$('.headermenu').fadeOut();
					$('a.hidemenu').hide();
					$('body').removeClass('disable');
				}
			});
		});


			