class CreateBlocks < ActiveRecord::Migration[5.1]
  def change
    create_table :blocks do |t|
      t.string :hash_str

      t.timestamps
    end
  end
end
