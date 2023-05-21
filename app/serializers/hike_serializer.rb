class HikeSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :level, :owner_id, :location_id
end
