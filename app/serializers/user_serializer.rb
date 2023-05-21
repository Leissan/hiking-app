class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :last_name, :username, :password_digest, :image_url
end
