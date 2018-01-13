class BlockBroadcastJob < ApplicationJob
  def perform()
    ActionCable.server.broadcast "block"
  end
end
