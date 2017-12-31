class Transaction < ApplicationRecord
  belongs_to :block, foreign_key: :block_hash, primary_key: :hash_str
  has_many :outputs, foreign_key: :output_ref, primary_key: :hash_str
end
