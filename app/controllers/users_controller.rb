
class UsersController < ApplicationController 
  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    @address = Address.new(address_params)
    @address.user = @user
    if @user.save && @address.save
      redirect_to users_path
    else
      render :new
    end
  end

  def edit
    @user = User.find(params[:id])
    @latitude = @user.address.latitude
    @longitude = @user.address.longitude
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to users_path
  end

  def destroy
    @user = User.find(params[:id])
    @user.destroy
    redirect_to users_path
  end

  private

  def user_params
    params.require(:user).permit(:firstname, :lastname, :phone) 
  end

  def address_params
    params.require(:user).permit(:latitude, :longitude)
  end
end
