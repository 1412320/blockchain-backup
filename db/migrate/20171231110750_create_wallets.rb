class CreateWallets < ActiveRecord::Migration[5.1]
  def change
    create_table :wallets do |t|
      t.references :user, foreign_key: true
      t.string :address
      t.text :public_key
      t.text :private_key

      t.timestamps
    end
    add_index :wallets, :address, unique: true
    
  end
end
