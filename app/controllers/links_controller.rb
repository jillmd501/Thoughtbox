class LinksController < ApplicationController
  def index
    @link = Link.new
  end

  def create
  @link = Link.new(users_link_params)
    if @link.save
      redirect_to links_path
    else
      flash[:errors] = "Make sure you entered your URL correctly! :)"
      redirect_to links_path
    end
  end

  private

  def link_params
    params.require(:link).permit(:title, :url, :read)
  end

  def users_link_params
    completed_params = link_params
    completed_params[:user_id] = current_user.id
    completed_params
  end

end
