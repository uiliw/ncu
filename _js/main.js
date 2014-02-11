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
			
			//INICIALIZA MASCARA
			app.initMask();
			
			//INICIALIZA DATEPICKER
			app.initDatepicker();
			
			//INICIALIZA SELECT
			app.initSelect();
			
			//INICIALIZA OS PASSOS DO MOD2
			app.initPassos();
			
			//INICIALIZA O ACORDIOM
			app.initAcordeom();
		},
		
			
		//CHAMADAS AJAX PARA O LMS
		//**ALTERAR A VARIAVEL DA URL DO SISTEMA
		//COMO COMBINADO, SOMENTE OS SETS, JA QUE OS GETS NAO SABEMOS O QUE VAI RETORNAR
		getAPI: function() {

			var urlSistema = "http://DOMINIO/lms/";

			var lmsapi = {

				ajax: function(chamada, callback) {

					try {

						$.get(aulas.getUrlSistema( chamada ), callback);

					} catch (e) {

					}
				},


				setModulo: function(_modulo) {

					lmsapi.ajax('setModulo/' + _modulo);

				},

				setTopico: function(_modulo, _topico) {

					lmsapi.ajax('setTopico/' + _modulo + '/' + _topico);

				},

				setAula: function(_modulo, _topico, _aula) {

					lmsapi.ajax('setAula/' + _modulo + '/' + _topico + '/' + _aula);

				}
				
			};

			return lmsapi;

		},
		
		//INICIALIZA LOADING
		//https://github.com/peachananr/loading-bar
		initLoading: function(){
			$(".ajaxy").loadingbar();
		},
		
		
		//INICIALIZA DATAPICKER
		//http://eternicode.github.io/bootstrap-datepicker/
		initDatepicker: function(){
			$('input.datapicker').datepicker({
				language: "pt-BR",
				format: "dd/mm/yyyy",
			});
		},
		
		
		//INICIALIZA OS PASSOS DO MOD2 - m2_a2_t2.html
		initPassos: function(){
			
			$('#alternativa').click(function(e){
				e.preventDefault();
				if($('#passo-sim').is(':checked')){
					$('.passos a[href="#tab5"]').tab('show')
				}else{
					$('.passos a[href="#tab2"]').tab('show')
				}
			})
			$('#passo-voltar').click(function(e){
				e.preventDefault();
				if($('#passo-sim').is(':checked')){
					$('.passos a[href="#tab7"]').tab('show')
				}else{
					$('.passos a[href="#tab4"]').tab('show')
				}
			})
			$('#passo-resultado').click(function(e){
				e.preventDefault();
				
				
				//função para o calculo do resultado
				
				
				$('.passos a[href="#tab9"]').tab('show')
			})
			
			$('.btn-bar').click(function(e){
				e.preventDefault();
				var $total = $('.passos').find('.tab-pane').length;
				var $current = $(this).parent().index()+1
				var $percent = ($current/$total) * 100;
				$('.passos').find('.progress-bar').css({width:$percent+'%'});
				console.log('current: '+$current+'<br>percent: '+$percent)
				$('.passos').ScrollTo();
			})
		},
		
		
		//INICIALIZA SELECT
		//http://silviomoreto.github.io/bootstrap-select/
		initSelect: function(){
			$('.selectpicker').selectpicker();
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
			  //smoothHeight: true,  
			  initDelay: 1000,
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
			$('[data-toggle=tooltip]').tooltip({html:true,container: 'body'});
			$("[data-toggle=popover]").popover({html:true,trigger:'click',container: 'body'});
			//fecha popover ao clicar fora dela
			$('body').on('click', function (e) {
				$('[data-toggle=popover]').each(function () {
					// hide any open popovers when the anywhere else in the body is clicked
					if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
						$(this).popover('hide');}
				});
			});
	
	
		},
		
		initAcordeom: function() {
			$('.accordion').collapse({
				toggle: false

			}).on('show.bs.collapse', function(e) {

				$(e.target).parent().find(".fa-plus").first().removeClass("fa-plus").addClass("fa-minus");


			}).on('hide.bs.collapse', function(e) {


				$(e.target).parent().find(".fa-minus").first().removeClass("fa-minus").addClass("fa-plus");

			});
		},
		
		//INICIALIZA MASCARA NOS INPUT
		//https://github.com/RobinHerbots/jquery.inputmask
		initMask: function() {
			$(":input").inputmask();
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
		
		
		$.fn.offScreen = function(distance){
		
	    var $t				= $(this),
	    	$w				= $(window),
	    	viewTop			= $w.scrollTop(),
	    	viewBottom		= viewTop + $w.height(),
	    	_top			= $t.offset().top - distance,
	    	_bottom		= $t.offset().top + $t.height() + distance;
   
		   return {
			 top: _bottom <= viewTop,
			 bottom: _top >= viewBottom
		   }
			
		};
			
		
		
		var win = $(window);
		
		var allMods = $(".fade");
		
		allMods.each(function(i, el) {
		  var el = $(el);
		  if (!el.offScreen(-150).bottom) {
			el.addClass("already-visible"); 
		  } 
		});
		
		win.on("scroll resize",function(event) 
		{
		  
		  allMods.each(function(i, el) {
			var el = $(el);
			if (!el.offScreen(-150).top && !el.offScreen(-150).bottom) 
			{
			  el.removeClass("already-visible off-screen-top off-screen-bottom"); 
			  el.addClass("come-in");
			} 
			else
			{
			
				if(el.offScreen(-150).top)
				{
					el.addClass("off-screen-top"); 
				}
				else
				{
					el.addClass("off-screen-bottom"); 
				}
			}
		  });//allMods.each()
		  
		});//win.scroll()
		
		win.trigger("scroll");

				  

			//Fade
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
		//https://github.com/peachananr/flat-shadow
		initIcons: function(){
			$(".icone,.icone0x, .icone2x, .icone3x, .icone4x, .icone5x").flatshadow({
			  color: "#3ab473",
			  angle: "SE"
			});	
		}
	}
});




jQuery(document).ready(function(){
	
	//LMS - SETA MODULO/TOPICOS/AULAS
	$('a.aulas').click(function(){
		var aulas = $(this);
		var tipo = aulas.data('tipo');
		
		
		//LMS - SETA MODULO
		if (tipo == 'modulo'){
			app.getAPI().setModulo(aulas.data('modulo'));
			console.log(aulas.data('modulo'))
		};
		
		//LMS - SETA TOPICO
		if (tipo == 'aula'){
			app.getAPI().setTopico(aulas.data('modulo'), aulas.data('aula'));	
			console.log(aulas.data('modulo')+' / '+aulas.data('aula'))	
		};
		
		//LMS - SETA AULA
		if (tipo == 'topico'){
			app.getAPI().setAula(aulas.data('modulo'), aulas.data('aula'), aulas.data('topico'));
			console.log(aulas.data('modulo')+' / '+aulas.data('aula')+' / '+aulas.data('topico'))		
		};
		
	});
			
	$("#menu ul").hide();

	// Toggle
	$("#menu .menu-abre").click(function(e) {
		$(this).siblings("ul").slideToggle();
		$(this).toggleClass('fa-plus-square-o fa-minus-square-o');
		e.preventDefault();
	});
	$("#menu .abrir-tudo").click(function(e) {
		$("#menu .menu-abre").siblings("ul").slideDown();
		if ($("#menu .menu-abre").hasClass('fa-plus-square-o')){
			$("#menu .menu-abre").removeClass('fa-plus-square-o').addClass('fa-minus-square-o');
		};
		e.preventDefault();
	});
	$("#menu .fechar-tudo").click(function(e) {
		$("#menu .menu-abre").siblings("ul").slideUp();
		if ($("#menu .menu-abre").hasClass('fa-minus-square-o')){
			$("#menu .menu-abre").removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
		};
		e.preventDefault();
	});
	app.init();
	$('#conteudo').load('_paginas/apresentacao.html');
	
	   
	$('#nav-conteudo').css({x:-240});
	$('.nav-conteudo').click(function(){
		if ($('#conteudo_wrap').hasClass('menu_aberto')){
			
		$('#conteudo_wrap').removeClass();
		$('#conteudo_wrap').addClass('col-xs-8 col-sm-offset-3');
		$('#nav-conteudo').transition({x:-240});
		
		}else{
		$('#conteudo_wrap').removeClass();
		$('#conteudo_wrap').addClass('col-xs-8 col-sm-offset-3 menu_aberto');
		$('#nav-conteudo').transition({x:0});
		}
	})
		
	
	
	$("a.nav-next").click(function(e){
		e.preventDefault();
		var cur = $('#menu li.active');
		next = $('#menu li').eq($('#menu li').index(cur) + 1);
		if (next.size() === 0) { 
		   next = $('#menu li:first');
		} 
		cur.removeClass('active');
		next.addClass('active');
		next.find('a').eq(0).click();
		$('.popover').remove();
	});

	$("a.nav-prev").click(function(e){
		e.preventDefault();
		var cur = $('#menu li.active');
		
		prev = $('#menu li').eq($('#menu li').index(cur) - 1); 
		
		if (prev.size() === 0) {
		   prev = $('#menu li:last');
		}      
		cur.removeClass('active');
		prev.addClass('active'); 
		prev.find('a').eq(0).click();
		$('.popover').remove();
	});
	
	
	
	
	
	var $body = $(document.body),
		$menu = $('#menu'),
		$content = $('#conteudo')
		
		
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
					return true;
				},
				error: function(){
					var Ajaxy = $.Ajaxy; var data = this.State.Error.data||this.State.Response.data; var state = this.state||'unknown';
					var error = data.error||data.responseText||'Unknown Error.';
					var error_message = data.content||error;
					$body.removeClass('loading');
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
					$menu.find(':has(a[href*="'+State.raw.state+'"])').addClass('active').siblings('.active').removeClass('active');
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