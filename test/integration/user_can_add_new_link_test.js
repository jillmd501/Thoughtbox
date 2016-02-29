require "test_helper"

class AddLinksTest < ActionDispatch::IntegrationTest

  test "user can add link" do
    user = User.create(username: "Jill", password: "Password")
    login_user

    visit links_path

    fill_in "Title", with: "NewLink"
    fill_in "Url", with: "https://gist.github.com/stevekinney/82831c5b25029415ce8b#file-simulated-assessment-md"
    click_button "Add Link"

    assert_equal links_path, current_path

    assert page.has_content?("NewLink")
  end
end
