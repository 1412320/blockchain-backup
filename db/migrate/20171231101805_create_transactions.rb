class CreateTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :transactions do |t|
      t.string :hash_str
      t.string :block_hash
      t.boolean :is_confirm

      t.timestamps
    end
  end
end
