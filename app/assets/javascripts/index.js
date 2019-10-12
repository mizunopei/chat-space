$(function(){
  var user_list = $("#user-search-result");
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</div>
                </div>`
   user_list.append(html);
  }
  function appendNouser(msg){
   var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ msg }</p>
              </div>`
    user_list.append(html);
  }
  $(".chat-group-form__input").on("keydown",function(){
    var input = $("#user-search-field").val();

    $.ajax({
      type: "GET",
      url: "/users",
      data: { keyword: input},
      dataType: "json"
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (users.length != 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendNouser("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
});

