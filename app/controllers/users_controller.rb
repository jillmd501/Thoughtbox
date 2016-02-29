class UsersController < ApplicationController

  def new
  end

  def create
    @user = User.new(user_params)
      if @user.save
        session[:user_id] = @user.id
        redirect_to links_path
      else
        flash.now[:error] = "Please enter valid info"
        render :new
      end
  end

  def show
  end


private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
