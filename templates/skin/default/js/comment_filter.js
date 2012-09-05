/**
 *		Comment Filter
 *		a LiveStreet plugin
 *		by Anton Maslo (http://amaslo.com)
 *		originally developed for MMOzgoved (http://www.mmozg.net/) project
 *
 *		Uses parts of slider code from jQuery Simple Slider Control
 *  	http://www.advancebydesign.com/software/javascript/controls-and-navigation/jquery-simple-slider-control.html
 */

// This can be changed to facilitate custom templates (or future standard LS template changes)
var items_to_hide = '.comment_content';

var jscsd = { 'w':15, 'h':15 };
var jscsc = 0;
var jscsm = false;
var jscsid = 0;

$(function() {
	// filter slider
	$(document).mouseup(function() { jscsm = false; });
	
	$('#comment_slider').each(function() {
		h = $(this).height();
		
		c = $(this).attr('class').split(/\s+/);
		cs = new Array();
		for(i in c) if(c[i].substr(0, 10)=="jscslider_") cs.push(c[i]);
		cs = cs.join(" ");
		
		htm = '<div class="jscslider_up slider_btn">+</div>'
			+ '<div class="jscslider ' + cs + '" style="height:' + h + 'px;" id="id_jscslider_' + jscsc + '">'
			+ '<div class="jscslider_scale"></div>'
			+ '<div class="jscslider_tracker"></div>'
			+ '</div>'
			+ '<div class="jscslider_down slider_btn">&ndash;</div>';
		
		min = parseInt($(this).attr('min'));
		max = parseInt($(this).attr('max'));
		if(isNaN(min)) min = 0;
		if(isNaN(max)) max = 100;
		val = (isNaN(parseInt($(this).val()))?min:parseInt($(this).val()));
		step = (h-jscsd.h)/(max-min);
		
		$(this).after(htm).attr('readonly', true).css('display', "none");
		$('#id_jscslider_'+jscsc).data({'min':min, 'max':max, 'h':h, 'step':step}).children('.jscslider_tracker').css("top", ((max-val)*step));
		
		jscsc++;
	});
	
	if($('.jscslider_tracker').length)
	{
		jscsd.w = $('.jscslider_tracker').eq(0).width();
		jscsd.h = $('.jscslider_tracker').eq(0).height();
		w = $('.jscslider').eq(0).width();
	}
	
	$('.jscslider').click(function(event) {
		pos = $(this).offset();
		y = (pos.top + $(this).height() - event.pageY) - (jscsd.h/2);
		jscs_hit($(this), y);
	}).mousemove(function(event) {
		if(!jscsm) return;
		
		event.preventDefault();
		
		pos = $(this).offset();
		y = (pos.top + $(this).height() - event.pageY) - (jscsd.h/2);
		jscs_hit($(this), y);
	}).mousedown(function(event) {
		if(event.which==1) {
			jscsm = true;
			jscsid = $(this).attr('id');
			event.preventDefault();
			
			$(this).prev().focus();
		}
	});

	// Up button clicked (+)
	$('.jscslider_up').click(function() {
		var j = $(this).parent().find('.jscslider');
		var val = $(this).parent().find('input').val();
		jscs_change(j, ++val);
	});

	// Down button clicked (-)
	$('.jscslider_down').click(function() {
		var j = $(this).parent().find('.jscslider');
		var val = $(this).parent().find('input').val();
		jscs_change(j, --val);
	});

	// actual comment filtering
	setRatingFilter($('#comment_slider').val());

	$('#comment_slider').change(function() {
	    setRatingFilter($(this).val());
	});
});

function jscs_hit(j, y) {
	min = j.data('min');
	max = j.data('max');
	step = j.data('step');
	
	val = min + Math.round(y/step);
	
	jscs_change(j, val);
}

function jscs_change(j, val) {
	min = j.data('min');
	max = j.data('max');
	step = j.data('step');

	val = (val > max ? max : ( val < min ? min : val));
	j.children('.jscslider_tracker').css("top", ((max-val)*step));
	j.parent().find('input').val(val).change();
}

function setRatingFilter(value) {
    $('#comment-filter .jscslider_tracker').html((value == -25) ? '&#8704;' : value);
    
    $('#comments').on('click', '.show-hidden-comment', function(e) { showComment($(this).parents('.comment')); e.preventDefault(); });
    
    $('#comments .comment').each(function() {
    	// for -25 show all comments regardless of rating
        if((value <= -25) || (Number($(this).find('.vote-count').text()) >= value)) {
            showComment($(this));
         } else {
            // hide (don't show)
            hideComment($(this));
        }
    });
};

function showComment(comment) {
    if(comment.hasClass('hidden')) {
        comment
            .removeClass('hidden')
            .find('.comment-hidden-hint').remove();
    }
}

function hideComment(comment) {
    if(!(comment.hasClass('hidden'))) {
        comment
        	.addClass('hidden')
            .append('<div class="comment-hidden-hint">Комментарий ниже заданного рейтинга, <a href="#" class="show-hidden-comment link-dotted">показать</a>?</div>');
    }
}