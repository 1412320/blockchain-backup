class Block < ApplicationRecord
  # has_many :transactions, foreign_key: :block_hash, primary_key: :hash_str  
  after_commit { BlockBroadcastJob.perform_later }  
end
