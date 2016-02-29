Rails.application.routes.draw do
  root to: 'sessions#new'

    namespace :api do
       namespace :v1 do
         resources :links, only: [:index, :create, :update, :destroy], defaults: { format: 'json' }
       end
     end


     get '/login', to: 'sessions#new'
     post '/login', to: 'sessions#create'
     delete '/logout', to: 'sessions#destroy'

     resources :users
     resources :links
end
