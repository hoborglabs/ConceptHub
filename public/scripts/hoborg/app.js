/**
 * Hoborg Labs - Concept Hub
 */
window.AppView = Backbone.View.extend({

	defaults: {
		baseUrl: '/'
	},

	initialize: function() {
		this.preview = new PreviewView({el: $('.preview')});
		this.navigation = new NavigationView({el: $('#navigation'), baseUrl: this.options.baseUrl});

		$('.view-as-list').click(function() {
				bus.trigger('concepthub:navigation:view', NavigationView.VIEW_TYPE_LIST)});
		$('.view-as-thumbs').click(function() {
				bus.trigger('concepthub:navigation:view', NavigationView.VIEW_TYPE_THUMBS)});
	}
});

window.bus = _.clone(Backbone.Events)
