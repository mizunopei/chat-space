$(function(){
  function buildHTML(message){
    var html = `.message
                  .upper-message
                    .upper-message__user-name
                      ${ message.user.name }
                    .upper-message__date
                      ${ message.created_at.strftime("%Y/%m/%d %H:%M")}
                  .lower-message
                    - if message.content.present?
                      %p.lower-message__content
                        = ${ message.content }
                      = image_tag ${ message.image }.url, class: 'lower-message__image' if message.image.present?`
    return html;
   }
  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)
      $('.form_message').val('')
    })
  })
})