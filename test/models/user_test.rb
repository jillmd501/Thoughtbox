require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def valid_user
    {
     username: 'jill',
     password: 'password',
   }
  end

  test "should be valid with valid attributes" do
    user = User.new(valid_user)

    assert user.valid?
  end

  test "should not be valid with missing username" do
    invalid_user = valid_user
    invalid_user[:username] = nil
    user = User.new(invalid_user)

    assert user.invalid?
  end

  test "should not be valid with missing password" do
    invalid_user = valid_user
    invalid_user[:password] = nil
    user = User.new(invalid_user)

    assert user.invalid?
  end
end
