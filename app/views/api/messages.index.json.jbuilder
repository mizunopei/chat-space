jsons.array! @messages do |message|
  json.content      message.content
  json.image        message.image.url
  json.cretated_at  message.created_at.strftime("%Y/%m/%d %H:%M")
  json.user_name    message.user.name
  json.id           message.id
end