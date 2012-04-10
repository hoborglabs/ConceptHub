/**
 * Hoborg Labs - Concept Hub
 */
window.AppView = Backbone.View.extend({

	defaults: {
		baseUrl: '/',
		apiUrl: '/api/1'
	},

	initialize: function() {
		this.options = _.extend(this.defaults, this.options);
		
		this.preview = new PreviewView({el: $('.preview')});
		this.navigation = new NavigationView({
			el: $('#navigation'), 
			baseUrl: this.options.baseUrl,
			apiUrl: this.options.apiUrl,
			app: this
		});

		$('.view-as-list').click(function() {
				bus.trigger('concepthub:navigation:view', NavigationView.VIEW_TYPE_LIST)});
		$('.view-as-thumbs').click(function() {
				bus.trigger('concepthub:navigation:view', NavigationView.VIEW_TYPE_THUMBS)});
	},
	
	error: function(message, level) {
		html = '<div class="alert alert-error"><a class="close" data-dismiss="alert">x</a>'+
				'<b>Oh snap!</b> ' + message + 
				'</div>';
		this.$el.prepend($(html));
	}
});

window.bus = _.clone(Backbone.Events)
