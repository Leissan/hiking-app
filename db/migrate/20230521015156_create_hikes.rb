class CreateHikes < ActiveRecord::Migration[7.0]
  def change
    create_table :hikes do |t|
      t.string :title
      t.string :description
      t.integer :level
      t.bigint :owner_id
      t.bigint :location_id

      t.timestamps
    end
  end
end
