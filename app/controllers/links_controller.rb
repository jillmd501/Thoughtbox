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

  def edit
    @link = Link.find(params[:id])
  end

  def update
    link = Link.find(params[:id])
    if link.update(link_params)
      flash[:messages] = "Link Updated"
      redirect_to links_path
    else
      flash.now[:errors] = link.erros.full_messages.join(", ")
      render :edit
    end
  end

  def destroy
    Link.delete(params[:id])
    flash[:messages] = "Link Deleted"
    redirect_to links_path
  end

  private

  def link_params
    params.require(:link).permit(:title, :url)
  end
end
