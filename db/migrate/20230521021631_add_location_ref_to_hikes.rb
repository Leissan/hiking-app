class AddLocationRefToHikes < ActiveRecord::Migration[7.0]
  def change
    add_reference :hikes, :location, foreign_key: true
    
  end
end

