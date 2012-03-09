/**
 * Hoborg Labs - Concept Hub
 */
window.NavigationView = Backbone.View.extend({
	
	initialize: function() {
		var folder  = (location.search.match(RegExp("[?|&]project=(.+?)(&|$)"))||[,null])[1]
		$.ajax({
			url : 'folder.php?f=' + folder,
			dataType : 'json',
			success : _.bind(this.handleNavigationLoaded, this)
		});
		this.bindEvents();
	},
	
	bindEvents: function() {
		bus.on('concepthub:navigation:view', this.switchViewType, this);
	},
	
	switchViewType: function(type) {
		if (NavigationView.VIEW_TYPE_LIST == type) {
			$('.files').show();
			$('.files-thumb').hide();
		}
		if (NavigationView.VIEW_TYPE_THUMBS == type) {
			$('.files').hide();
			$('.files-thumb').show();
		}
	},

	handleNavigationLoaded: function(data) {
		$.each(data, function(index, item) {
			$('.files').append(
					'<li><a href="' + item.src + '">'
					+ item.name + '</a></li>');
			$('.files-thumb').append(
					'<li class=""><a href="' + item.src + '"'
					+ 'class=""><img src="' + item.src + '"'
					+ 'alt="' + item.name + '"></a></li>');
		});
		this.bindNavigationEvents();
		$('.files a:first').click();
	},

	bindNavigationEvents: function() {
		$('.files a').click(_.bind(this.handleImageClick, this));
		$('.files-thumb a').click(_.bind(this.handleImageClick, this));
	},

	handleImageClick: function(event) {
		bus.trigger('concepthub:file:load', $(event.currentTarget));
		return false;
	}

}, {
	VIEW_TYPE_LIST: 'list',
	VIEW_TYPE_THUMBS: 'thumbs',
});

