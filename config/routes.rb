Rails.application.routes.draw do
  resources :users, only: [:index, :new, :create, :edit, :update, :destroy]
  root "users#index"
end
