class CreatePendingTransactions < ActiveRecord::Migration[5.1]
  def change
    create_table :pending_transactions do |t|
      t.string :receiver
      t.integer :amount
      t.bigint :user_id

      t.timestamps
    end
  end
end
