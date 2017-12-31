class Output < ApplicationRecord
  belongs_to :trans, foreign_key: :output_ref, primary_key: :hash_str, class_name: 'Transaction'
end
