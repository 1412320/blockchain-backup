class BlockBroadcastJob < ApplicationJob
  def perform
    p 'sending'
    ActionCable.server.broadcast "block", data: true
  end
end
