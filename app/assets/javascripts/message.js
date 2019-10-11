$(function(){
  function buildHTML(message){
    var html = `<div class = "message">
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class = "upper-message__date">
                      ${ message.time}
                    </div>
                  </div>
                  <div class = "lower-message">
                      <p class = "lower-message__content" >
                        ${ message.content}
                      </p>
                      <img class = "lower-message__image" ${ message.image }.url>
                  </div>
                </div>`
    return html;
   }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')

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
      $('.messages').append(html)
      $('.form_message').val('')
      $('.messages').animate({
        scrollTop: $('.messages')[0].scrollHeight
      });
      return false
    })
    .fail(function(){
      alert('error');
    })
    .always(function(data){
      $(".form__submit").prop('disabled', false);
    })
  })
})