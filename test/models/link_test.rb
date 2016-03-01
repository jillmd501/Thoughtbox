require 'test_helper'

class LinkTest < ActiveSupport::TestCase
  test "link is valid with correct attributes" do
    link = Link.create(title: "test", url: "http://www.test.com")
    assert_equal "http://www.test.com", link.url
    assert_equal "test", link.title
  end

  test "link is invalid without title" do
    link = Link.create(title: "", url: "http://www.test.com")
    refute link.valid?
  end

  test "link is invalid without url" do
    link = Link.create(title: "hi", url: "test.com")
    refute link.valid?
  end
end
