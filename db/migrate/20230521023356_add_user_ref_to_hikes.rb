class AddUserRefToHikes < ActiveRecord::Migration[7.0]
  def change
    add_reference :hikes, :owner, foreign_key: { to_table: :users }
    add_reference :hikes, :participants, foreign_key: { to_table: :users }
  end
end
