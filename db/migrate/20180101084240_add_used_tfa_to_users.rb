class AddUsedTfaToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :used_tfa, :boolean, default: false
  end
end
