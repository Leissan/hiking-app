class RemoveParticipantsRefToHikes < ActiveRecord::Migration[7.0]
  def change
    remove_reference :hikes, :participants
    change_column :hikes, :level, :integer, :default => 1
  end
end
