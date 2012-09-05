<?php

/**
 *		Comment Filter
 *		a LiveStreet plugin
 *		by Anton Maslo (http://amaslo.com)
 *		originally developed for MMOzgoved (http://www.mmozg.net/) project
 */

class PluginCommentFilter_HookCommentFilter extends Hook { 
	
	
	public function RegisterHook() {
		// Run the function when a topic is shown
		$this->AddHook('topic_show', 'AddCommentFilter');
	}
	
	public function AddCommentFilter () {
   		$sTemplateWebPath = Plugin::GetTemplateWebPath (__CLASS__);

   		// Add custom CSS, JS and the block to display comment filter
    	$this -> Viewer_AppendStyle($sTemplateWebPath . 'css/comment_filter.css');
    	$this->Viewer_AppendScript($sTemplateWebPath . 'js/comment_filter.js');
   		$this->Viewer_AddBlock('toolbar', 'plugins\commentfilter\templates\skin\default\comment_filter.tpl');
    }
  }

?>