class CreateOutputs < ActiveRecord::Migration[5.1]
  def change
    create_table :outputs do |t|
      t.string :output_ref, null: false
      t.integer :output_index, null: false
      t.float :amount
      t.string :receiver
      t.string :sender
      t.boolean :is_used, default: false

      t.timestamps
    end
    add_index :outputs, [:output_ref, :output_index], unique: true
  end
end
