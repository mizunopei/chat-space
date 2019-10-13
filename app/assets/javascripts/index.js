$(function(){
  var UserList = $("#user-search-result");
  var MemberList = $("#member-search-result");

  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</div>
                </div>`
    UserList.append(html);
  }

  function appendMembers(name,user_id){
    var html = `<div class="chat-group-user clearfix js-chat-member", id = "chat-group-user-${user_id}" >
                  <input name = "group[user_ids][]" type ="hidden" value = "${user_id}">
                  <p class ="chat-group-user__name">${ name }</p>
                  <a class ="user-search-remove chat-group-user__btn chat-group-user__btn--remove is-remove-btn">削除</a>
                </div>`
    MemberList.append(html);
  }

  function appendNouser(msg){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${ msg }</p>
              </div>`
    UserList.append(html);
  }

  $("#user-search-field").on("keydown",function(){
    var input = $(this).val();

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
      alert("ユーザー検索に失敗しました");
    })
  });
  $(document).on("click", ".user-search-add", function(){
    var name = $(this).data("user-name");
    var user_id = $(this).data("user-id");
    $(this).parent().remove();
    appendMembers(name, user_id);
  });

  $(document).on("click", ".user-search-remove", function(){
    $(this).parent().remove();
  });
});

