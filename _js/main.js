var app = {};

$(function() {

	
	app = {

		init: function() {

			//DESABILITA/HABILITA CACHE NAS RESPOSTAS AJAX
			$.ajaxSetup({
				cache: false //setar true na versão online
			});
			
			// SVG FALLBACK
			app.svg();
			
			//INICIALIZA JREJECT
			app.rejeitarBrowser();
			
			//INICIALIZA FANCYBOX
			app.initModal();

			//INICIALIZA TOOLTIPS
			app.initTooltip();

			//INICIALIZA TABS
			app.initTabEvent();
			
			//INICIALIZA EFEITOS
			app.initEfeitos();
			
			//TRANSFORMA IMAGENS EM CIRCULO
			app.imgCircular();
			
			//INICIA SORTABEL
			app.initSortable();
			
			//INICIALIZA GALERIA
			app.initGaleria();
			
			//INICIALIZA O PRINT
			app.initPrint();
			
			//INICIALIZA LOADING
			app.initLoading();
			
			//INICIALIZA ICONES
			app.initIcons();
		},
		
			
	
		
		//INICIALIZA LOADING
		//https://github.com/peachananr/loading-bar
		initLoading: function(){
			$(".ajaxy").loadingbar();
		},
	
		
		//PERMITE IMPRIMIR SOMENTE UMA ÁREA DESEJADA
		initPrint: function(){
			// Create a jquery plugin that prints the given element.
			jQuery.fn.print = function() {
				// NOTE: We are trimming the jQuery collection down to the
				// first element in the collection.
				if (this.size() > 1) {
					this.eq(0).print();
					return;
				} else if (!this.size()) {
					return;
				}
			
				// ASSERT: At this point, we know that the current jQuery
				// collection (as defined by THIS), contains only one
				// printable element.
			
				// Create a random name for the print frame.
				var strFrameName = ("printer-" + (new Date()).getTime());
			
				// Create an iFrame with the new name.
				var jFrame = $("<iframe name='" + strFrameName + "'>");
			
				// Hide the frame (sort of) and attach to the body.
				jFrame
				.css("width", "1px")
				.css("height", "1px")
				.css("position", "absolute")
				.css("left", "-9999px")
				.appendTo($("body:first"))
				;
			
				// Get a FRAMES reference to the new frame.
				var objFrame = window.frames[strFrameName];
			
				// Get a reference to the DOM in the new frame.
				var objDoc = objFrame.document;
			
				// Grab all the style tags and copy to the new
				// document so that we capture look and feel of
				// the current document.
			
				// Create a temp document DIV to hold the style tags.
				// This is the only way I could find to get the style
				// tags into IE.
				var jStyleDiv = $("<div>").append(
				$("style").clone()
				);
			
				// Write the HTML for the document. In this, we will
				// write out the HTML of the current element.
				objDoc.open();
				objDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
				objDoc.write("<html>");
				objDoc.write("<body>");
				objDoc.write("<head>");
				objDoc.write("<title>");
				objDoc.write(document.title);
				objDoc.write("</title>");
				objDoc.write(jStyleDiv.html());
				objDoc.write("</head>");
				objDoc.write(this.html());
				objDoc.write("</body>");
				objDoc.write("</html>");
				objDoc.close();
			
				// Print the document.
				objFrame.focus();
				objFrame.print();
			
				// Have the frame remove itself in about a minute so that
				// we don't build up too many of these frames.
				setTimeout(
				function() {
					jFrame.remove();
				},
				(60 * 1000)
				);
			}
			
			$('#imprimir').click(function(){
				$('#conteudo').print();
				return (false);
			})
		},
		
		//INICIALIZA GALERIA
		//http://www.woothemes.com/flexslider/
		initGaleria: function(){
			$('.flexslider').flexslider({
			  animation: "slide",
			  controlsContainer: ".flex-container",
			  smoothHeight: true,  
			  slideshow: false,
			  start: function(slider) {
				$('.total-slides').text(slider.count);
			  },
			  after: function(slider) {
				$('.current-slide').text(slider.currentSlide+1);
			  }
			});	
		},
		
		// SVG FALLBACK
		// toddmotto.com/mastering-svg-use-for-a-retina-web-fallbacks-with-png-script#update
		svg: function() {
			if (!Modernizr.svg) {
				var imgs = document.getElementsByTagName('img');
				var dotSVG = /.*\.svg$/;
				for (var i = 0; i != imgs.length; ++i) {
					if(imgs[i].src.match(dotSVG)) {
						imgs[i].src = imgs[i].src.slice(0, -3) + "png";
					}
				}
			}
		},
		
		//ALERTA PARA BROWSERS ANTIGOS
		//http://jreject.turnwheel.com/
		rejeitarBrowser: function(){
		
			$.reject({  
					reject : {
				all: false, 
				msie5: true, msie6: true, msie7: true, msie8: true 
			},  
			display: [],
			browserShow: true,
			browserInfo: {
				firefox: {  
					text: 'Firefox 25', 
					url: 'http://www.mozilla.com/firefox/' 
				},  
				safari: {  
					text: 'Safari 7',  
					url: 'http://www.apple.com/safari/download/'  
				},  
				opera: {  
					text: 'Opera 18',  
					url: 'http://www.opera.com/download/'  
				},  
				chrome: {  
					text: 'Chrome 31',  
					url: 'http://www.google.com/chrome/'  
				},  
				msie: {  
					text: 'Internet Explorer 11',  
					url: 'http://www.microsoft.com/windows/Internet-explorer/'  
				},  
				gcf: {  
					text: 'Google Chrome Frame',  
					url: 'http://code.google.com/chrome/chromeframe/',  
					allow: { all: false, msie: true }  
				}  
			},  
		  
			header: 'Você sabia que seu browser esta desatualizado?',  
			paragraph1: 'Seu browser esta desatualizado e pode não ser compatível com nosso website. Uma lista dos browsers mais populares podem ser encontrado abaixo.',  
			paragraph2: 'Clique no icones para ir para a página de download do browser',  
			close: true,
			closeMessage: 'Ao fechar esta janela, você reconhece que a sua experiência de uso neste site pode ser prejudicado',  
			closeLink: 'Fechar esta janela',  
			closeURL: '#',
			closeESC: true,
		   
			closeCookie: false,
			cookieSettings: {
				path: '/',
				expires: 0  
			},  
		  
			imagePath: '_js/_jReject/images/',
			overlayBgColor: '#000', 
			overlayOpacity: 0.8,
		  
			fadeInTime: 'fast', 
			fadeOutTime: 'fast',  
		  
			analytics: false  
			});
		  
			return false;
		},
		
		//MODAL FANCYBOX
		//http://fancyapps.com/fancybox/
		initModal: function() {
			$(".popup").fancybox({
				maxWidth	: 800,
				maxHeight	: 600,
				padding		:0,
				//fitToView	: false,
				//width		: '70%',
				//height	: '70%',
				autoSize	: true,
				//closeClick	: true,
				//openEffect	: 'none',
				//closeEffect	: 'none',
				helpers : {
					media : {},
					title	: {
						type: 'outside'
					},
					thumbs	: {
						width	: 50,
						height	: 50
					},
					//buttons	: {}
				}
			});
		},
		
		//INICIALIZA TOOLTIP
		//http://getbootstrap.com/javascript/#tooltips
		//http://getbootstrap.com/javascript/#popovers
		initTooltip: function() {
			$('[data-toggle=tooltip]').tooltip({html:true,});
			$("[data-toggle=popover]").popover({html:true,trigger:'click'});
		},
		
		
		//INICIALIZA TABS
		//http://getbootstrap.com/javascript/#tabs
		initTabEvent: function() {
			$('.nav-tabs a').click(function(e) {
				e.preventDefault();
				$(this).tab('show');
			})
		},
		
		//TRANSFORMA IMAGENS EM CIRCULA
		imgCircular: function(){
			$(".perfil img").load(function() {
				$(this).wrap(function(){
					return '<span class="image-wrap ' + $(this).attr('class') + '" style="position:relative; display:inline-block; background:url(' + $(this).attr('src') + ') no-repeat center center; width: ' + $(this).width() + 'px; height: ' + $(this).height() + 'px;" />';
				});
				$(this).css("opacity","0");
			});
		},
		
		//INICIALIZA SORTABLE PARA ORDENAR OS PAINEIS
		//http://jqueryui.com/sortable/
		initSortable: function(){
			$(".grid").sortable({
				tolerance: 'pointer',
				revert: 'invalid',
				placeholder: 'area-drop',
				forceHelperSize: true,
				connectWith: ".grid2",
				cursor: "move",
				forcePlaceholderSize: true,
				handle: ".panel-move",
				opacity: 0.5,
			});
			$(".grid2").sortable({
				tolerance: 'pointer',
				revert: 'invalid',
				placeholder: 'area-drop',
				forceHelperSize: true,
				connectWith: ".grid",
				cursor: "move",
				forcePlaceholderSize: true,
				handle: ".panel-move",
				opacity: 0.5,
			});
		},
		
		//INICIALIZA EFEITOS
		//https://github.com/rstacruz/jquery.transit		
		initEfeitos: function(){
		
			//Fade
			$(".fade").transition({ opacity: 1, delay: 2000 });
			$('.rodar_fade').click(function(e){
				$(".fade").transition({ opacity: 0, delay: 0 , complete: function(){$(".fade").transition({ opacity: 1, delay: 1000 });} });
				e.preventDefault();
			});
			
			//Slide
			$('.slide').each(function() {
				var x = $(this).attr('class').split(' ')[1].split("_").pop();
				$(".s_"+x).transition({ opacity: 1, x: "0", delay: x*1000 });
			})
			$('.rodar_slide').click(function(e){
				
				$('.slide').each(function() {
				var x = $(this).attr('class').split(' ')[1].split("_").pop();
					$(".s_"+x).transition({ opacity: 0, x: "40" },0).transition({ opacity: 1, x: "0", delay: x*1000 });
				})
				e.preventDefault();
			});
		},
		
		//INICIALIZA ICONES COM EFEITO DE SOMBRA
		initIcons: function(){
			$(".icone, .icone2x, .icone3x, .icone4x, .icone5x").flatshadow({
			  color: "#3ab473",
			  angle: "SE"
			});	
		}
	}
});




jQuery(document).ready(function(){
	app.init();
	$('#conteudo').load('_paginas/apresentacao.html');
	$('#nav-conteudo').hide();
	$('.nav-conteudo').click(function(){
		if ($('#conteudo_wrap').hasClass('menu_aberto')){
			
		$('#conteudo_wrap').removeClass();
		$('#conteudo_wrap').addClass('col-xs-10 col-sm-offset-1');
		$('#nav-conteudo').hide();
		
		}else{
		$('#conteudo_wrap').removeClass();
		$('#conteudo_wrap').addClass('col-xs-7 col-sm-offset-4 menu_aberto');
		$('#nav-conteudo').show();
		}
	})
	var $body = $(document.body),
		$menu = $('#menu'),
		$content = $('#conteudo')
		
	$("a.nav-next").click(function(){
       var cur = $('#menu li.active');
	   next = cur.next('li');
	   if (next.length === 0) {  // wrap if necessary
		   next = $('#menu li:first');
	   } 
	   cur.removeClass('active');  // move the current class
	   next.addClass('active');
       next.children('a').click();
    });

	$("a.nav-prev").click(function(){
	   var cur = $('#menu li.active');
       next = cur.prev('li');
	   if (next.length === 0) {
		   next = $('#menu li:last');
	   }      
	   cur.removeClass('active');
	   next.addClass('active'); 
	   next.children('a').click();
	});
		
		
	$.Ajaxy.configure({
		'debug': false,
		'method': 'get',
		'scrollto_content': true,
		'Controllers': {
			'_generic': {
				request: function(){
					var Ajaxy = $.Ajaxy;$body.addClass('loading');
					return true;
				},
				response: function(){
					var Ajaxy = $.Ajaxy; var data = this.State.Response.data; var state = this.state||'unknown';
					var title = data.title||false;
					if ( !title && this.state||false ) title = 'Inserir Titulo '+this.state;
					if ( title ) document.title = title;
					$body.removeClass('loading');
					$('.navega-titulo').text(title);
					$('#current').text('Our current state is: ['+state+']');
					return true;
				},
				error: function(){
					var Ajaxy = $.Ajaxy; var data = this.State.Error.data||this.State.Response.data; var state = this.state||'unknown';
					var error = data.error||data.responseText||'Unknown Error.';
					var error_message = data.content||error;
					$body.removeClass('loading');
					$('#current').text('Our current state is: ['+state+']');
					return true;
				}
			},
			
			'page': {
				classname: 'ajaxy-page',
				matches: /^\/_paginas\/?/,
				request: function(){
					var Ajaxy = $.Ajaxy;
					$menu.find('.active').removeClass('active');
					$content.stop(true,true).fadeOut(400);
					return true;
				},
				response: function(){
					var Ajaxy = $.Ajaxy; var data = this.State.Response.data; var state = this.state; var State = this.State;
					$menu.children(':has(a[href*="'+State.raw.state+'"])').addClass('active').siblings('.active').removeClass('active');
					var Action = this;
					$content.html(data.content).fadeIn(400,function(){
						Action.documentReady($content);
					});
					app.init();
					return true;
				}
			}
		}
	});
});