/**
 * Hoborg Labs ContentStandard
 */
window.AppView = Backbone.View.extend({

	initialize: function() {
		var folder  = (location.search.match(RegExp("[?|&]project=(.+?)(&|$)"))||[,null])[1]
		$.ajax({
			url : 'folder.php?f=' + folder,
			dataType : 'json',
			success : function(data) {
				$.each(data, function(index, item) {
					$('.files').append(
							'<li><a href="' + item.src + '">'
									+ item.name + '</a></li>')
				});

				$('.files a').click(function() {
					bus.trigger('concepthub:file:load', $(this));
					return false;
				});
				$('.files a:first').click();
			}
		});

		this.preview = new PreviewView({el: $('.preview')});
	}

});

window.bus = _.clone(Backbone.Events)
