$(function(){
  function buildHTML(message){
    var img = message.image? `<img src = ${ message.image }>`: " ";
    var html = `<div class = "message" data-id="${message.id}">
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class = "upper-message__date">
                      ${ message.created_at}
                    </div>
                  </div>
                  <div class = "lower-message">
                      <p class = "lower-message__content" >
                        ${ message.content}
                      </p>
                      <p class = "lower-message__image" >
                        ${ img }
                      </p>
                  </div>
                </div>`
    return html;
  }
  $("#new_message").on("submit",function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      dataType: "json",
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".messages").append(html)
      $("form")[0].reset();
      $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
      return false
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $(".form__submit").prop("disabled", false);
    })
  })

  if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var reloadMessages = function(){
      last_message_id = $(".message:last").data("id");
      group_id = $(".left-header__title").data("group-id")
      $.ajax({
        url: "api/messages",
        type: "get",
        dataType: "json",
        data: {id: last_message_id},
      })
    .done(function(messages) {
      var insertHTML = "";
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $(".messages").append(insertHTML);
          $(".messages").animate({scrollTop: $(".messages")[0].scrollHeight}, "fast");
        })
      console.log("success");
      })
    .fail(function(){
      console.log('error');
    });
    };
}
  setInterval(reloadMessages,5000);
});