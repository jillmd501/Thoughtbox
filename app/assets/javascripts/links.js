$(document).ready(function(){
    fetchLinks();
    createLink();
    deleteLink();
    editLink();
    searchLinks();
});


function renderLinks(link) {
  $("#latest-links").prepend(
    "<div class='link' id='link-id-" + link.id + "' data-id='" + link.id + "'> " +
      "<h4>" + link.title + "</h4>" +
      "<h4>" + link.url + "</h4>" +
      "<h5 contentEditable=false id='link-quality-" + link.read + "'>" + "</h5>" +
      "<div class='btn blue' id='delete-link'>Delete</div>" +
      "<div class='btn blue' id='edit-link'>Edit</div>" +
      "<div class='btn blue' id='save-link'>Save</div>" +
    "</div>"
    )
  }

function fetchLinks() {
  var newestLinkID = parseInt($(".link").last().attr("data-id"))
  $.ajax({
    type:    "GET",
    url:     "/api/v1/links.json",
    success: function(links) {
      $.each(links, function(index, link) {
        if (isNaN(newestLinkID) || link.id > newestLinkID) {
          renderLinks(link)
        }
      })
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
  })
}

function createLink() {
  $("#create-link").on("click", function() {
    var linkParams = {
      link: {
        title: $("#link-title").val(),
        body: $("#link-body").val()
      }
    }

  $("#link-title").val('')
  $("#link-body").val('')

  $.ajax({
    type:    "POST",
    url:     "/api/v1/links.json",
    data:    linkParams,
    success: function(newLink) {
      renderLinks(newLink)
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
    })
  })
};

  function deleteLink() {
    $('#latest-links').on('click', '#delete-link', function() {
      var $link = $(this).closest('.link')
      $.ajax({
        type: 'DELETE',
        url:  '/api/v1/links/' + $link.attr("data-id") + '.json',
        success: function(){
          $link.remove()
        },
        error: function(){
          $link.remove()
          console.log('Sorry, link has already deleted.')
        }
      })
    })
  }


  function editLink() {
    $('#latest-links').on('click','#edit-link', function() {
      var $link = $(this).closest(".link");
      document.getElementById("link-id-" + $link.attr('data-id')).contentEditable = true;
      $("#save-link").click(function(){
        document.getElementById("link-id-" + $link.attr('data-id')).contentEditable = false;
        $("#save-link").disable();
        var linkParams = {
          link: {
            id: $link.attr('data-id'),
            title: $("#link-id-" + $link.attr('data-id')).text(),
            body: $("#link-id-" + $link.attr('data-id')).text()
          }
        }

        $.ajax({
          type: 'PUT',
          url: '/api/v1/links/' + $link.attr('data-id'),
          data: linkParams,
          success: function() {
            fetchLinks();
          },
          error: function(xhr) {
            console.log(xhr.responseText)
          }
        });
      });
    });
  };

  function searchLinks() {
  $("#filter").keyup(function(){
		var filter = $(this).val();
		$("#latest-links").children().each(function(){
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(this).fadeOut();
			} else {
				$(this).show();
			}
		});
	});
}
