class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :last_name, :username, :password_digest

  has_one :owned_hike
  has_many :participated_hikes
end
