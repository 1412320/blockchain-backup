class CreateWallets < ActiveRecord::Migration[5.1]
  def change
    create_table :wallets do |t|
      t.references :user, foreign_key: true
      t.string :address
      t.string :public_key
      t.string :secret_key

      t.timestamps
    end
    add_index :wallets, :address,                unique: true
    add_index :wallets, :public_key,             unique: true
    add_index :wallets, :secret_key,             unique: true    
  end
end
