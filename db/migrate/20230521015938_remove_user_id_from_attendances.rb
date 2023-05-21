class RemoveUserIdFromAttendances < ActiveRecord::Migration[7.0]
  def change
    remove_column :attendances, :user_id, :bigint
    remove_column :attendances, :hike_id, :bigint
  end
end
