class AddUserIdToAttendances < ActiveRecord::Migration[7.0]
  def change
    add_foreign_key :attendances, :users, column: :user_id
    
  end
end
