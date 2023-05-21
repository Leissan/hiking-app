# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_21_024142) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "attendances", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "hike_id", null: false
    t.index ["hike_id"], name: "index_attendances_on_hike_id"
    t.index ["user_id"], name: "index_attendances_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.text "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.bigint "hike_id"
    t.index ["hike_id"], name: "index_comments_on_hike_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "hikes", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "level", default: 1
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "location_id"
    t.bigint "owner_id"
    t.index ["location_id"], name: "index_hikes_on_location_id"
    t.index ["owner_id"], name: "index_hikes_on_owner_id"
  end

  create_table "locations", force: :cascade do |t|
    t.string "title"
    t.string "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "last_name"
    t.string "username"
    t.string "password_digest"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "attendances", "hikes"
  add_foreign_key "attendances", "users"
  add_foreign_key "comments", "hikes"
  add_foreign_key "comments", "users"
  add_foreign_key "hikes", "locations"
  add_foreign_key "hikes", "users", column: "owner_id"
end
