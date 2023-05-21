class RemoveOwnerIdFromHikes < ActiveRecord::Migration[7.0]
  def change
    remove_column :hikes, :owner_id, :bigint
    remove_column :hikes, :location_id, :bigint
  end
end
