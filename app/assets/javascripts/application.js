$(document).ready(function(){
    getLinks();
});

function getLinks(){
  $.getJSON('/api/v1/links', function(data) {
    $.each(data, function(index, link){
      showLinks(link)
    })
  });
};

function markAsRead(id) {
  $('#mark-as-read' + id).on('click', function(){
    event.preventDefault();

    $.getJSON('/api/links/' + id, function(link){
      var newStatus = function(){
        if (link.read === 'read'){
          return 'read'
        } else { return 'unread'}
      };

      $.ajax({
        type: 'PUT',
        url: '/api/links/' + id + '.json',
        data: {
          link: {read: newStatus}
        },
        success: function(idea){
          $('#mark-as-read' + id).html(newStatus);
        }
      })
    })
  })
}

function searchLinks() {
  $("#filter").keyup(function(){
		var filter = $(this).val();
		$("#link-listing").children().each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
			} else {
				$(this).show();
			}
		});
	});
}
