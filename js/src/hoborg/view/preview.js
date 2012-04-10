/**
 * Hoborg Labs - Concept Hub
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
		'click .zoom-fit': 'handleZoomFit',
		'click .zoom-horizontal': 'handleZoomFitWidth'
	},
	
	initialize: function() {
		this.bindEvents();
		this.resizeViewport();
		$('#image').draggable();
		
		this.options.imageSize = {
			width : 60,
			height : 60
		};
		this.setZoom(100);
	},
	
	resizeViewport: function() {
		var p = $('#viewport').position();
		var h = $(window).height();
		$('#viewport').css({height: (h - p.top)});
	},

	bindEvents: function() {
		bus.on('concepthub:file:load', this.handleFileLoad, this);

		$(window).resize(_.bind(this.resizeViewport, this));
		$('#image').load(_.bind(this.handleImageLoaded, this));
	},
	
	handleReset: function() {
		this.setZoom(100);
		this.reset();
	},
	
	handleZoomIn: function() {
		this.changeZoom(10);
		this.drawImage();
	},
	
	handleZoomOut: function() {
		this.changeZoom(-10);
		this.drawImage();
	},
	
	handleZoomFit: function() {
		var widthRatio = $('#viewport').width() / this.options.imageSize.width;
		var heightRatio = $('#viewport').height() / this.options.imageSize.height;
		
		if (widthRatio < heightRatio) {
			this.setZoom(100 * widthRatio)
		} else {
			this.setZoom(100 * heightRatio)
		}
		
		this.drawImage();
		this.centerImage();
	},
	
	handleZoomFitWidth: function() {
		var widthRatio = $('#viewport').width() / this.options.imageSize.width;
		this.setZoom(100 * widthRatio);
		this.drawImage();
		this.centerImage();
	},
	
	handleWheel: function(event, delta) {
		var sign = delta < 0 ? -1 : 1;
		this.changeZoom(sign * Math.pow(Math.abs(delta), 2));
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
		this.options.imageSize = {
			width : $('#image').width(),
			height : $('#image').height()
		};
		this.reset();
		this.drawImage();
	},

	reset: function() {
		var left = ($('#viewport').width() - this.options.imageSize.width) / 2;
		var top = ($('#viewport').height() - this.options.imageSize.height) / 2;

		$('#image').css({
			left : left,
			top : top,
			width : this.options.imageSize.width,
			height : this.options.imageSize.height
		});
	},
	
	changeZoom: function(delta) {
		this.options.zoom += parseInt(delta);
		if (this.options.zoom < 10) {
			this.options.zoom = 10;
		}

		this.displayZoom();
	},
	
	setZoom: function(zoom) {
		this.options.zoom = parseInt(zoom);
		this.displayZoom();
	},
	
	displayZoom: function() {
		$('.zoom').html(this.options.zoom);
	},

	drawImage: function() {
		var zoom = this.options.zoom;
		var location = {
			width : Math.round(this.options.imageSize.width * zoom / 100),
			height : Math.round(this.options.imageSize.height * zoom / 100),
			top : parseInt($('#image').css('top').replace('px', '')),
			left : parseInt($('#image').css('left').replace('px', ''))
		};
		location.top -= Math.round((location.height - $('#image').height()) / 2);
		location.left -= Math.round((location.width - $('#image').width()) / 2);

		$('#image').css(location);
	},
	
	centerImage: function() {
		var location = {
			top : parseInt(($('#viewport').height() - $('#image').height()) / 2),
			left : parseInt(($('#viewport').width() - $('#image').width()) / 2)
		};
		$('#image').css(location);
	}

});

