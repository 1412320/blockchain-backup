class BlockChannel < ApplicationCable::Channel
  def follow
    stream_from "block"
  end

  def unfollow
    stop_all_streams
  end
end
