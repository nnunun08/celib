//script for import start!! 다른 html 문서를 가져오기 위한 스크립트 시작
window.addEventListener('load', function () {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function (el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
});

(function($) {

// ajax시작 전
$(document).ajaxStart(function(){
	$('.book_loading').css('display','block');
});
	
// ajax시작 후
$(document).ajaxStop(function(){
    $('.book_loading').css('display','none');
});

var page_name = 'mainPage';

// 개인룸 이미지 팝업 열기 + 이미지 선택시 변경
function openModal (house_name, tab_idx) {

    $('#modal').fadeIn(300);
    var $modal = $(".modal_con");
    $modal.fadeIn(300);

    var $tab = $('.s6_tablink', $modal);
	$tab.removeClass("s6_btn_active");
    $tab.eq(tab_idx-1).addClass("s6_btn_active");
    var $con= $modal.find('.s6_tabcontent');
    $con.css('display', "none");
    $con.eq(tab_idx-1).css('display', "flex");

    $.each($tab, function (idx) {
        $(this).off().on('click', function () {
			$tab.removeClass("s6_btn_active");
    		$con.css('display', "none");

    		$con.eq(idx).css('display', "flex");
    		$(this).addClass("s6_btn_active");
		});
	});

    $.each($con, function (t_idx, value) {
        var $thumbs = $(this).find('.s6_sm > img');
        var $img_elm = $(this).find('.s6_big > img');

        var img_addr = '/assets/images/sub/' + house_name + '/s6_big' + (t_idx + 1) + '-1.jpg';
        $img_elm.attr('src', img_addr);

        $.each($thumbs, function (i_idx, img_val) {
            $(this).removeClass("s6ImgActive");
            if(i_idx == 0) {
                $(this).addClass("s6ImgActive");
            }
            $(this).off().on('click', function () {
                var img_idx = i_idx + 1;
                img_addr = '/assets/images/sub/' + house_name + '/s6_big' + (t_idx + 1) + '-' + img_idx + '.jpg';
                $img_elm.attr('src', img_addr);

                $thumbs.removeClass("s6ImgActive");
                $(this).addClass("s6ImgActive");
            });
        });
    });
}

/*
 * main 
*/
$(document).ready(function() {
    page_name = $('section').attr('id');

    if($('#mainPage').length){

        $('.tablinks').click(function() {
			var elm_id = $(this).data('id');
			var $tab_content, $tab_main;

			$tab_main = $(".main_s2");
			$tab_content = $(".tabcontent");

			$tab_content.each(function(index, item) {
				$(item).hide();
			});

			$('#' + elm_id).show();

			if (elm_id == 'celib-select') {
				$tab_main.addClass('bg_type2');
			} else {
				$tab_main.removeClass('bg_type2');
			}

			$('.tablinks').each(function(index, item) {
				$(item).removeClass('active');
				$(item).attr('style', '');
				$(item).find('hr').css('visibility', 'hidden');
			});

			$(this).addClass('active');
			$(this).find('hr').css('visibility', 'visible');

		});

		$('.tablinks').hover(function() {
			if (!$(this).hasClass("active")) {
				$(this).css('opacity', '1');
			}
		}, function() {
			if (!$(this).hasClass("active")) {
				$(this).css('opacity', '0.4');
			}
		});

		$('#tab-locations').click();


	    var swiper = new Swiper(".tab-swiper-container1", {
			slidesPerView: 3,
			spaceBetween: 29,
            observer: true,
            observeParents: true,
            allowTouchMove: false,

			/* 
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			}
			*/
		});

		var swiper = new Swiper(".tab-swiper-container2", {
			slidesPerView: 3,
			spaceBetween: 29,
            observer: true,
            observeParents: true,
            allowTouchMove: false,
			/*
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			}
			*/
		});

		var swiper = new Swiper(".swiper-container2", {
			slidesPerView: 1,
			spaceBetween: 30,
			pagination: {
				el: ".swiper-pagination2",
				clickable: true,
			},
			navigation: {
				nextEl: ".swiper-button-next2",
				prevEl: ".swiper-button-prev2"
			}
		});

		var swiper = new Swiper(".swiper-container3", {
			slidesPerView: 1,
			spaceBetween: 30,
			
			pagination: {
				el: ".swiper-pagination3",
				clickable: true,
			}
			/*,
			navigation: {
				nextEl: ".swiper-button-next3",
				prevEl: ".swiper-button-prev3"
			}
			*/
		});
	    
	    $('.accordion-head').find('.arrow').on('click', function() {
	    	if (!$('.accordion-body').is(':visible')) {
	    		$('.accordion-body').slideDown();
	    		$(this).removeClass("down");
	    		$(this).addClass("up");
	    	} else {
	    		$('.accordion-body').slideUp();
	    		$(this).removeClass("up");
	    		$(this).addClass("down");
	    	}
	    });
    }
});


/*
 *  sub page
*/
$(document).ready(function(){
    if($(".house_view").length){
        /*
		var space_thumb = new Swiper(".small_gallery", {
	    	//loop: true,
	    	spaceBetween: 10,
	    	slidesPerView: 9,
			touchRatio:0,
            slideToClickedSlide: true,
	    	//freeMode: true,
	    	watchSlidesVisibility: true,
	    	watchSlidesProgress: true,
	    });
        */
	    var space_swiper = new Swiper(".big_gallery", {
	      loop: true,
	      spaceBetween: 10,
	    });
	
		// get all bullet elements
		var bullets = $('#swiper-left-tab > li');
		var thumbs = $('.sub_s5 .small_gallery > img');
		
		// swiper 오른쪽 메뉴 클릭 이벤트
		$.each(bullets, function (index, value) {
			$(this).on('click', function(){
	    	    space_swiper.slideTo($(this).data('slide'), 1000);
	    	});
		});
        // swiper 오른쪽 메뉴 클릭 이벤트
		$.each(thumbs, function (index, value) {
			$(this).on('click', function(){
	    	    space_swiper.slideTo($(this).data('slide'), 1000);
	    	});
		});
	
		// swiper 변경시 이벤트
		space_swiper.on('slideChange', function () {

            var slide_idx = this.activeIndex;

			bullets.removeClass("active");
			thumbs.removeClass("active");

			$.each(bullets, function (index, value) {
			    if($(this).data('slide') == slide_idx) {
			        $(this).addClass("active");
			        return false;
			    }
			});
            $.each(thumbs, function (index, value) {
			    if($(this).data('slide') == slide_idx) {
			        $(this).addClass("active");
			        return false;
			    }
			});
		}); 

        $('.drawings_wrap a.modal-open').each(function(index){
            $(this).off().on('click', function(){
                openModal(page_name, index+1);
                //console.log($(this).find('h3').text());
            });
        });
		
		// 개인룸 이미지 팝업 닫기
		$('.sub_mod_close').click(function() {
			$('.modal_con').fadeOut(300);
			$('#modal').fadeOut(300);
		});
        
        $(".sub_apply_fix_mo").click(function () {

            var form_elm = $('.sub_s10').offset().top;
            $("html, body").animate({
                scrollTop: form_elm
            }, 500);
        });

        $(window).scroll(function () {
            var show_elm = $('.sub_s9').offset().top;
            var hide_elm = $('.sub_s10').offset().top - 50;
            var scroll_top = $(window).scrollTop();

            if ((scroll_top > ($(document).height() - $(window).height() * 2) || scroll_top > hide_elm)) {
                $('.sub_apply_fix_mo').hide();
            } else {
                $('.sub_apply_fix_mo').show();
            }
        });
			
    }
});

/*
 *  common
*/
$(document).ready(function(){
	// 모바일 메뉴 클릭시 한개만 활성화
	$('input[type="checkbox"][name="accordion-1"]').click(function() {
		if($(this).prop('checked')) {
			$('input[type="checkbox"][name="accordion-1"]').prop('checked',false);
			$(this).prop('checked',true);
		}
	});

	(text_trim = function(obj) {
		if($('#email'.length)){
			var a = $('#phone').val().replace(/ /gi, '');
			$('#phone').val(a);
		}
		
		if($('#email'.length)){
			var a = $('#email').val().replace(/ /gi, '');
			$('#email').val(a);
		}
        
    });
	
	// 개인정보 이용동의 default
	$('.accordion_body').slideUp();

	// 개인정보 이용동의 접기/펴기
	$('.accordion_head').find('.arrow').on('click', function() {
		if (!$('.accordion_body').is(':visible')) {
			$('.accordion_body').slideDown();
			$(this).removeClass("down");
			$(this).addClass("up");
		} else {
			$('.accordion_body').slideUp();
			$(this).removeClass("up");
			$(this).addClass("down");
		}
	});

	// 체크박스 전체선택 및 전체해제 PC
	$("#apply_all").click(function() {
		if ($("#apply_all").is(":checked")) {
			$(".apply_chk").prop("checked", true);
		} else {
			$(".apply_chk").prop("checked", false);
		}
	});

	// 한개의 체크박스 선택 해제시 전체선택 체크박스도 해제 PC
	$(".apply_chk").click(function() {
		if ($("input[name='chk']:checked").length == 2) {
			$("#apply_all").prop("checked", true);
		} else {
			$("#apply_all").prop("checked", false);
		}
	});

	//var is_mobile = isMobile();
	/*
	$(window).resize(function(){

	    is_mobile = isMobile();

		// PC <-> MOBILE 변경시 팝업 닫기
		if(is_mobile){
			$('#applyWrap').dialog('close');
		}else{
			$('#mo-applyWrap').dialog('close');
		}
	});
	*/


	// 개인정보 수집 및 이용동의
	$( '.privacy' ).click(function() {
		var url = '/privacy';
		
		var is_mobile = isMobile();
		if(is_mobile){
			var pb_height = 400;
			var pb_width = 300;

		}else{
			var pb_height = 450;
			var pb_width = 550;
		}
	
		 $('<div id="PrivacyDiv">').dialog({
				
			dialogClass: 'privacy-dialog',
			modal: true,
			open: function () {

				$(".ui-widget-overlay").css({
					opacity: 0.5
				});

				$(this).load(url);
			},

			close: function (e) {
				$(this).empty();
				$(this).dialog('destroy');
			},
			
			height: pb_height,
			width: pb_width
		});
	});

	// 개인정보 제3자 제공동의
	$( '.terms' ).click(function() {
		
		var url = '/privacy/terms';

		var is_mobile = isMobile();
		if(is_mobile){
			var pb_height = 400;
			var pb_width = 300;

		}else{
			var pb_height = 450;
			var pb_width = 550;
		}

		 $('<div id="TermsDiv">').dialog({
				
				dialogClass: 'terms-dialog',
				modal: true,
				open: function () {

					$(".ui-widget-overlay").css({
						opacity: 0.5
					});

					$(this).load(url);
				},

				close: function (e) {
					$(this).empty();
					$(this).dialog('destroy');
				},

				height: pb_height,
				width: pb_width
		});
	});

	// 메인페이지 투어신청 팝업 오픈
	$( '.myBtn' ).click(function() {

		$('#applyWrap').dialog('open');
		$('#applyWrap').draggable();
	
		// 서브페이지 투어신청시 지점선택 default
		var house_val = $("#house_id").val();	
		var loc_house = $(location).attr('pathname').split(".");
        loc = loc_house[0];
		
		if(loc == '/soonra'){
			 $("#house_id").val('1');
		}else if(loc == '/yeoui'){
			 $("#house_id").val('2');
		}else if(loc == '/eunpyong'){
			 $("#house_id").val('3');
		}else if(loc == '/yongsan'){
			 $("#house_id").val('4');
		}else{
			$("#house_id").val('');
		}
	});

	$( "#applyWrap" ).dialog({
		dialogClass: 'celib-dialog',
        autoOpen : false, 
        modal : true, 
        resizable : false,
		open: function(event, ui) {
			$("body").css({ overflow: 'hidden' })
		 },
		beforeClose: function(event, ui) {
			$("body").css({ overflow: 'inherit' })
		 },
		width: 'auto'
	});

	$('#btn_close').click(function() {

		$('#applyWrap').dialog('close');
	});

	// 신청완료 팝업닫기
	$('.btn_confirm').click(function() {
		$('.apply_clear').css('display','none');
	});

	// 메인페이지 투어신청 팝업 오픈
	$( '#celib_intro' ).click(function() {
		$('#celib-intro-wrap').dialog('open');
	});
	
	//celib-intro 팝업
	$( '#celib-intro-wrap' ).dialog({
		dialogClass: 'intro-dialog',
        autoOpen : false, 
        modal : true, 
        resizable : false,
		open: function(event, ui) {
			$("body").css({ overflow: 'hidden' })

			$('.ui-widget-overlay').off('click');
			$('.ui-widget-overlay').on('click', function() {
				$('#celib-intro-wrap').dialog('close');
			});

			$('#btn_intro_close').on('click', function() {
				$('#celib-intro-wrap').dialog('close');
			});
		},
		beforeClose: function(event, ui) {
			$("body").css({ overflow: 'inherit' })
		},
		width: 'auto'
	});

	// 셀립소개
	$('#celib-intro-wrap').click(function() {
		$('#celib-intro-wrap').dialog('close');
	});
});
    //모바일 체크
    function isMobile()
    {
           return (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ); 
    }

	// 이메일형식 체크함수
	function email_chk(str) {

        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (!filter.test(str)) {
            return true;
        } else {
            return false;
        }
    }

	// 특수문자 체크함수
	function special_chk(str) {

		var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi; 
		
		if(special_pattern.test(str) == true) { 
			return true;
		} else { 
			return false; 
		} 
	}

	// 휴대폰번호 체크함수
	function phone_chk(str) {

		var regExp = /^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/;
		
		if(regExp.test(str) == true) { 
			return true;
		} else { 
			return false; 
		} 
	}

	var apply_btn = $("#tourApply_btn");

	apply_btn.click(function(){

		var house_id	= $("#house_id").val();			// 지점정보
		var name		= $("#name").val();				// 이름
		var phone		= $("#phone").val();			// 휴대폰
		var tour_date	= $("#tour_date").val();		// 투어 희망일
		var tour_time	= $("#tour_time").val();		// 투어 희망시간
		var period		= $("#period").val();			// 입주 희망기간
		var email 		= $("#email").val();			// 이메일
		var agree_chk_A	= $("input:checkbox[id=apply_chk1]").is(':checked');	// 개인정보 이용동의
		var agree_chk_B	= $("input:checkbox[id=apply_chk2]").is(':checked');	// 개인정보 제3자 제공동의


		if(!house_id){
			alert('지점을 선택해주세요!');
			return;
		}

		if(!phone){
			alert('휴대폰번호를 입력해주세요!');
			return;
		}

		if(email.length > 0){
			if(email_chk(email) == true) {
				alert('이메일 형식을 정확하게 입력해주세요!');
				return;
			}
		}

		if(!agree_chk_A || !agree_chk_B){
			alert('개인정보 이용동의에 모두 체크해주세요!');
			return;
		}

		$("#frm-tour").submit();
	});


	var frm_tour = $("#frm-tour");
	
	// 투어 예약하기
	frm_tour.submit(function(e) {
	
	    e.preventDefault(); // avoid to execute the actual submit of the form.
	
	    var form = $(this);
		var btn_close = $('#applyWrap');
		
	    $.ajax({
	        type: "POST",
			url: '/api/Tours/apply',
	        data: form.serialize(), // serializes the form's elements.
	        success: function(data)
	        {
                if(data.code == 0) {
	                alert('신청 실패. 관리자에 문의하세요.');
					return;
                }else if(data.code == -1) {
	                alert('휴대폰번호를 입력해주세요.');
					return;
                }else if(data.code == -2) {
	                alert('유효한 핸드폰 번호가 아닙니다. 다시 확인해주세요.');
					return;
                }else if(data.code == -3) {
	                alert('지점을 선택해주세요.');
					return;
                }else if(data.code == -4) {
	                alert('유효한 이메일이 아닙니다. 다시 확인해주세요.');
					return;
                }else if(data.code == -5) {
	                alert('저장 에러. 관리자에 문의하세요.');
					return;
                } else if(data.code == -6) {
	                alert('이메일 전송실패.');
					return;
                }else {
					$('.apply_clear').show();
					btn_close.dialog('close');
					frm_tour[0].reset();
                }
	        }
    		,error:function(e){
    			alert('신청 실패.');
    		}
    		,timeout:100000
	    });

	});

	// jquery alert창
	jQuery.jQueryAlert = function (msg) {
		 var $messageBox = $.parseHTML('<div id="ready_alertBox"></div>');
		 $("body").append($messageBox);
 
		 $($messageBox).dialog({
			 title:'안내',
			 dialogClass: 'alert-dialog',
			 open: $($messageBox).append(msg),
			 open: function(event, ui) {
			 	$("body").css({ overflow: 'hidden' })
			 },
			 beforeClose: function(event, ui) {
			 	$("body").css({ overflow: 'inherit' })
			 },
			 autoOpen: true,
			 modal: true,
			 buttons: {
				 OK: function () {
					 $(this).dialog('close');
				 }
			 }
		 });
	 };
 
	 $('.ready_to_faq').on("click", function(){
		 $.jQueryAlert("준비중입니다.");
	 });

	 //start book_tr-page
	 if($('#book_tr-page').length){
		
		//페이지 로딩 시 timeslot 설정
		set_timeslot();
		
		var performerId;
		//지점 선택
		jQuery('#select_unit_id').change(function () {
			performerId = jQuery(this).val();
			$("#booking-place").text($("#select_unit_id option:selected").text()+"점")
		});

		var startTime;
		var selected_date;
		$("#setBookingDate").on("change",function(){
			selected_date = $(this).val();
			var date_info;
			date_info = selected_date +" (" +getDate(selected_date) +") ";
			$("#booking-date").text(date_info);
			if($("#select_unit_id option:selected").text() == "지점을 선택해주세요."){
				toastr.warning('지점을 먼저 선택해주세요.');
				// return false;
			}else{
				$.ajax({
					type: "POST",
					url: '/admins/Simplybook/chk_availabletime',
					data: {
						'date': selected_date,
						'unitId': performerId,
					},
					global: false,
					beforeSend: function(){
						$('.book_loading').css('display','block');
					},
					complete: function(){
						$('.book_loading').css('display','none');
					},
					success: function(data){
						//예약 가능 시간 셋팅
						jQuery('#setBookingTime').empty();
						var reserv_time = ["10:00:00","11:00:00","12:00:00","13:00:00","14:00:00","15:00:00","16:00:00","17:00:00","18:00:00"];
						var html = '';
						html += '<dt class="small">예약 시간 선택</dt><dd><ul>';
						$(reserv_time).each(function(index, obj){ 
							if(data.indexOf(obj) == -1){
								// console.log("예약불가능>>"+formatAMPM(obj.substring(0,2)));
								html +='<li class="disabled" id ="'+obj+'"><a href="#">' + formatAMPM(obj.substring(0,2)) + '</lii>';
							}else{
								// console.log("예약가능>>"+formatAMPM(obj.substring(0,2)));
								html +='<li id ="'+obj+'"><a href="javascript:void(0)">' + formatAMPM(obj.substring(0,2)) + '</a></lii>';
							}
						});
						html += '</dd></ul>';
						jQuery('#setBookingTime').append(html);
	
						jQuery('#setBookingTime li:not(.disabled)').click(function () {
							$(this).addClass("active").siblings().removeClass("active");
							startTime = $(this).attr('id');
							var get_time;
							if(formatAMPM(startTime.substring(0,2)).slice(-2) == "am"){
								get_time = "오전 "+formatAMPM(startTime.substr(0, 2)).slice(0,-3)+"시";
							}else{
								get_time = "오후 "+formatAMPM(startTime.substr(0, 2)).slice(0,-3)+"시";
							}
							$("#booking-time").text(get_time);
						});
	
					}
					,error:function(e){
						//alert('저장 실패.');
						console.log(e);
					}
				});// end ajax
			}

		});

		//예약 submit
		$('#bookingSubmit').on("click",function () {

			let check = 0;
			toastr.remove();
			if($("#select_unit_id option:selected").text() == "지점을 선택해주세요."){
				toastr.warning('지점을 선택해주세요.'); check = 1;
			}else if(selected_date == undefined){
				toastr.warning('날짜를 선택해주세요.'); check = 1;
			}else if(startTime == undefined){
				toastr.warning('시간을 선택해주세요.'); check = 1;
			}else if($('#clientName').val() == ""){
				toastr.warning('예약자 이름을 입력해주세요.'); check = 1;
			}else if($('#clientEmail').val() == ""){
				toastr.warning('예약자 전화번호를 입력해주세요.'); check = 1;
			}else if($('#clientPhone').val() == ""){
				toastr.warning('예약자 이메일를 입력해주세요.'); check = 1;
			}else if(email_chk($('#clientEmail').val())){
				toastr.warning('이메일을 다시 입력해주세요.'); check = 1;
			}
			if(check == 0){
				$.ajax({
					type: "POST",
					url: '/admins/Simplybook/tour_book',
					data: {
						'name': $('#clientName').val(),
						'email': $('#clientEmail').val(),
						'phone': $('#clientPhone').val(),
						'date': selected_date,
						'time': startTime,
						'unitId': performerId,
					},
					success: function(data){
						console.log(data);
						
						if(data == "true") {
							$("#modal").show();
						}else{
							toastr.warning('예약에 실패하였습니다.');
						}
					}
					,error:function(e){
						//alert('저장 실패.');
						console.log(e);
						toastr.warning('예약에 실패하였습니다.');
					}
				});
			}
		});

		$.datepicker.setDefaults({
			dateFormat: 'yy-mm-dd',
			prevText: '이전 달',
			nextText: '다음 달',
			monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
			dayNames: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
			dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
			showMonthAfterYear: true,
			yearSuffix: '년'
		});

		$( "#setBookingDate" ).datepicker({
			beforeShowDay: function(date){
				var day = date.getDay();
				return [(day != 6)];
			},
			minDate: 0,
		});

		toastr.options = {
			"closeButton": false,
			"debug": false,
			"newestOnTop": false,
			"progressBar": false,
			"positionClass": "toast-bottom-center",
			"preventDuplicates": false,
			"onclick": null,
			"showDuration": "300",
			"hideDuration": "1000",
			"timeOut": "5000",
			"extendedTimeOut": "1000",
			"showEasing": "swing",
			"hideEasing": "linear",
			"showMethod": "fadeIn",
			"hideMethod": "fadeOut"
		}

		// $(".ui-state-highlight").trigger("click");
		function set_timeslot(){
			jQuery('#setBookingTime').empty();
			var reserv_time = ["10:00:00","11:00:00","12:00:00","13:00:00","14:00:00","15:00:00","16:00:00","17:00:00","18:00:00"];
			var html = '';
			html += '<dt class="small">예약 시간 선택</dt><dd><ul>';
			$(reserv_time).each(function(index, obj){ 
				html +='<li class="disabled" id ="'+obj+'"><a href="#">' + formatAMPM(obj.substring(0,2)) + '</lii>';
			});
			html += '</dd></ul>';
			jQuery('#setBookingTime').append(html);
		}

	 }//end book_tr-page 

})(jQuery); // End of use strict

// mainVisual slider
$(document).ready(function(){
	$('.main_visual').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		fade: true,
		speed: 1000,
		cssEase: 'ease-in',
		arrows: false
	});
	$('.slick').slick({
        slide: 'li',    //슬라이드 태그 
		autoplay: true,	
        infinite : true,  //무한 반복 옵션	 
        slidesToShow : 4,	// 한 화면에 보여질 컨텐츠 개수
        speed : 500,	 // 다음 버튼 누르고 다음 화면 뜨는데까지 걸리는 시간(ms)
        arrows : false, 		// 옆으로 이동하는 화살표 표시 여부
        dots : false, 		// 스크롤바 아래 점으로 페이지네이션 여부
        focusOnSelect : true, 
        variableWidth: true, // 객체가 동일한 길이가 아닌 각각의 길이를 가지게 됨
        autoplaySpeed : 3000, 		// 자동 스크롤 시 다음으로 넘어가는데 걸리는 시간 (ms)
        pauseOnHover : true,		// 슬라이드 이동시 마우스 호버하면 슬라이더 멈추게 설정
        vertical : false,		// 세로 방향 슬라이드 옵션
		responsive: [
            {
                breakpoint: 769,
				settings: "unslick",
            }
        ]

    });
 });
