class AttendanceSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :hike_id
end
