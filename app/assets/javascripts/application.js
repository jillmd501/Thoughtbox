// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
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

function showLinks(link) {
  $('#link-listing').prepend(
    "<li class='read-" + link.read  + " link' data-id='" + link.id + "'>"
    + "<h5 contenteditable='true' class='title-editable'>" + link.title + "</h5>"
    + "<h6 contenteditable='true' class='url-editable'>" + link.url + "</h6>"
    + "<input class='btn btn-default pull-right' id='read-" + link.read + "-button' type='button' name='submit' value='" + + "'></li>"
  )
};
