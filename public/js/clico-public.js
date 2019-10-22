function checkClicoBtns() {

	var attr = 'data-clico-btn';

	if( document.querySelector('['+ attr +']') ){
		var id = document.querySelector('['+ attr +']').getAttribute(attr);
		setClicoValue(id);

		var btns = document.querySelectorAll('['+ attr +']');
		btns.forEach(btn => {
			var href = btn.getAttribute('href');
			var id = btn.getAttribute(attr);
			btn.addEventListener('click', function(){
				event.preventDefault();
				addClick(href, id);
				// console.log(this, href);
			})
		});
	}
}

function addClick(href, id) {
	(function( $ ) {
		$.ajax({
			url: ajax_object.ajax_url,
			type: 'POST',
			data: {
				action: 'update_clico_value',
				id: id,
			},
			error: function(request, txtstatus, errorThrown) {
				console.log(request);
				console.log(txtstatus);
				console.log(errorThrown);
			},
			success: function(response) {
				window.open(href);
			}
		});
		event.preventDefault();
	})( jQuery );
}

function setClicoValue(id) {
	var attr = 'data-clico-value';
	if( document.querySelector('['+ attr +']') ){
	var items = document.querySelectorAll('['+ attr +']');

		(function( $ ) {
			$.ajax({
				url: ajax_object.ajax_url,
				type: 'POST',
				data: {
					action: 'get_clico_value',
					id: id,
				},
				error: function(request, txtstatus, errorThrown) {
					console.log(request);
					console.log(txtstatus);
					console.log(errorThrown);
				},
				success: function(response) {
					var value = response;
					setClicoValue(value);
				}
			});
		})( jQuery );

	function setClicoValue(value) {
		items.forEach(item => {
			item.innerHTML = value;
		});
	}

	}
}

checkClicoBtns();
