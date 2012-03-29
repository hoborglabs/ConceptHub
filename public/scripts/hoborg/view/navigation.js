/**
 * Hoborg Labs - Concept Hub
 */
window.NavigationView = Backbone.View.extend({
	
	defaults: {
		baseUrl: '/'
	},

	initialize: function() {
		var folder  = (location.search.match(RegExp("[?|&]project=(.+?)(&|$)"))||[,null])[1]
		$.ajax({
			url : this.options.baseUrl + 'folder.php?f=' + folder,
			dataType : 'json',
			success : _.bind(this.handleNavigationLoaded, this)
		});
		this.bindEvents();
	},
	
	bindEvents: function() {
		bus.on('concepthub:navigation:view', this.switchViewType, this);
	},
	
	switchViewType: function(type) {
		var items = this.$('.carousel .item');
		if (NavigationView.VIEW_TYPE_LIST == type) {
			$(items[0]).removeClass('prev');
			$(items[1]).addClass('next');
		}
		if (NavigationView.VIEW_TYPE_THUMBS == type) {
			$(items[1]).removeClass('next');
			$(items[0]).addClass('prev');
		}
	},

	handleNavigationLoaded: function(data) {
		var view = this;
		var baseUrl = this.options.baseUrl;
		$.each(data, function(index, item) {
			$('.files').append(
					'<li><a href="' + baseUrl + item.src + '">'
					+ item.name + '</a></li>');

			view.addThumbnail(item);
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
	},
	
	addThumbnail: function(item) {
		console.log(item);
		var li = $('<li><a href="' + this.options.baseUrl + item.src + '"></a></li>');
		var img = $('<img alt="' + item.name + '" />');
		img.load(_.bind(this.handleThumbnailLoaded, this, img));
		img.attr({
			src : item.src
		});

		$('a' , li).append(img);
		$('.files-thumb').append(li);
	},
	
	handleThumbnailLoaded: function(image) {
		var ratio = image.width() / image.height();
		if (ratio > 1) {
			image.css({
				position: 'relative',
				width: Math.round(88 * ratio),
				height: 88,
				left: Math.round(44 * (1 - ratio))
			});
		} else {
			image.css({
				position: 'relative',
				width: 88,
				height: Math.round(88 / ratio),
				top: Math.round(88 - (88 / ratio))
			});
		}
	}

}, {
	VIEW_TYPE_LIST: 'list',
	VIEW_TYPE_THUMBS: 'thumbs',
});
