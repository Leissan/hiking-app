class CreateAttendances < ActiveRecord::Migration[7.0]
  def change
    create_table :attendances do |t|
      t.bigint :user_id
      t.bigint :hike_id

      t.timestamps
    end
  end
end
