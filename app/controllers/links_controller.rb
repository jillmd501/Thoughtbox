class LinksController < ApplicationController
  def index
    @links = current_user.links
  end

  def new
    @link = Link.new
  end

  def create
    @link = current_user.links.new(link_params)
    if @link.save
      flash[:notice] = "Successfully added Link"
      redirect_to links_path
    else
      flash.now[:error] = "Invalid Link."
      @links = current_user.links
      render :index
    end
  end

  private

  def link_params
    params.require(:link).permit(:title, :url)
  end
end
