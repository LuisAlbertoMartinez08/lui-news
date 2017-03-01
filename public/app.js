$(document).ready(function(){




$.getJSON("/articles", function(data) {
  
  for (var i = 0; i < data.length; i++) {
    
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>" + "<hr>");
  }
});



$('#getInfo').on("click", function() {
  
  $("#notes").empty();
  
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        data[i]
      
      $("#notes").append("<h4>" + data[i].title + "</h4>");
      
      $("#notes").append("<input id='titleinput' name='title' size='55' placeholder='Insert Title'>");
      
      $("#notes").append("<textarea id='bodyinput' name='body' rows='5' cols='56' placeholder='Write Your Note'></textarea>");
      
      $("#notes").append(" <button data-id='" + data[i]._id + "' id='savenote' class='btn btn-success'>Save Note</button>");

      if (data[i].note) {
        
        $("#titleinput").val(data[i].note.title);
        
        $("#bodyinput").val(data[i].note.body);
      }
    }
    });
});


$(document).on("click", "#savenote", function() {
  
  var thisId = $(this).attr("data-id");

  
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      
      title: $("#titleinput").val(),
      
      body: $("#bodyinput").val()
    }
  })
    
    .done(function(data) {
      
      console.log(data);
      
      $("#notes").empty();
    });

  
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

});