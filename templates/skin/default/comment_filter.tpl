<!-- 
 		Comment Filter
 		a LiveStreet plugin
 		by Anton Maslo (http://amaslo.com)
 		originally developed for MMOzgoved (http://www.mmozg.net/) project
-->

<script>
	$(function() {
		console.log({lang_load name='plugin.commentfilter.comment_hidden_hint'});
		ls.lang.load({lang_load name='plugin.commentfilter.comment_hidden_hint'});
		initCommentFilter();
	});
</script>

<section id="comment-filter" title="{$aLang.plugin.commentfilter.control_hint}">
	<input type="number" class="slider" id="comment_slider" min="-25" max="25" value="-25" style="height:102px;">
</section>