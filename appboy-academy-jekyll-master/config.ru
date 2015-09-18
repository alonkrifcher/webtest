require 'rack/jekyll'
require 'yaml'
require './cachesettings'
require 'rack/rewrite'
require 'rack/deflater'

use CacheSettings, {
      /.*\.png/ => {:cache_control => "max-age=31536000, public"},
      /.*\.css/ => {:cache_control => "max-age=31536000, public"},
      /.*\.js/ => {:cache_control => "max-age=31536000, public"}
    }
use Rack::Deflater
use Rack::Rewrite do
  rewrite '/', '/Getting_Started'
end

run Rack::Jekyll.new
