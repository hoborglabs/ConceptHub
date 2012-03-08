/**
 * Hoborg Labs ContentStandard
 */
window.PreviewView = Backbone.View.extend({
	defaults: {
		zoom: 100,
	},
	
	events: {
		'wheel #viewport': 'handleWheel',
		"click .reset": "handleReset",
		'click .zoom-in': 'handleZoomIn',
		'click .zoom-out': 'handleZoomOut',
	},
	
	initialize: function() {
		this.bindEvents();
		$('#image').draggable();
		this.options.zoom = 100;
		this.options.imageSize = {
			width : 60,
			height : 60
		};
	},

	bindEvents: function() {
		bus.on('concepthub:file:load', this.handleFileLoad, this);

		$('#image').load(_.bind(this.handleImageLoaded, this));
	},
	
	handleReset: function() {
		this.reset();
	},
	
	handleZoomIn: function() {
		this.options.zoom += 10;
		this.drawImage();
	},
	
	handleZoomOut: function() {
		this.options.zoom -= 10;
		if (this.options.zoom < 10) {
			this.options.zoom = 10;
		}
		this.drawImage();
	},
	
	handleWheel: function(event, delta) {
		var sign = delta < 0 ? -1 : 1;

		this.options.zoom += sign * Math.pow(Math.abs(delta), 2);
		if (this.options.zoom < 10) {
			this.options.zoom = 10;
		}

		this.drawImage();
	},
	
	handleFileLoad: function(link) {
		$('#image').css({
			width : 'auto',
			height : 'auto'
		});
		$('#image').attr({
			src : link.attr('href')
		});
	},
	
	handleImageLoaded: function() {
		console.log('image loaded');
		this.options.imageSize = {
			width : $('#image').width(),
			height : $('#image').height()
		};
		this.reset();
	},

	reset: function() {
		console.log('reset');
		this.options.zoom = 100;
		var left = ($('#viewport').width() - this.options.imageSize.width) / 2;
		var top = ($('#viewport').height() - this.options.imageSize.height) / 2;

		$('#image').css({
			left : left,
			top : top,
			width : this.options.imageSize.width,
			height : this.options.imageSize.height
		});
	},

	drawImage: function () {
		var zoom = this.options.zoom;
		var p = $('#image').position();
		var location = {
			width : this.options.imageSize.width * zoom / 100,
			height : this.options.imageSize.height * zoom / 100,
			top : parseInt($('#image').css('top').replace('px', '')),
			left : parseInt($('#image').css('left').replace('px', ''))
		};
		location.top -= ((location.height - $('#image').height()) / 2);
		location.left -= ((location.width - $('#image').width()) / 2);

		$('#image').css(location);
	}

});

