$(document).ready(function(){
  console.log("hi")
    getLinks();
});

function getLinks(){
  $.getJSON('/api/v1/links', function(data) {
    $.each(data, function(index, link){
      showLinks(link)
    })
  });
};

function titleEditable(){
  $('#link-listing').delegate('#title-editable', 'keydown', function(event) {
    if(event.which == 13 || event.keyCode == 13){
      var $title = event.currentTarget.textContent
      var $id = $(this).closest('.link').attr('data-id')
      var params = {
        link: {
          title: $title,
          url: $url
        }
      }
      event.preventDefault();
      this.blur();
      $.ajax({
        type: 'PUT',
        url: '/api/v1/links/' + $id + '.json',
        data: params,
        success: function(link){
        }
      })
    }
  })
}
