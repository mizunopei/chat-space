require "rails_helper"

describe MessageController do
    let(:group){create(:group)}  
    let(:user){create(:user)}  

    describe "#index" do

      context "log in" do
        before do
          login user
          get :index, params: { group_id: grpup.id }
        end

        it "assigns @message" do
          expect(assigns(:message).to be_a_new(Message))
        end

        it "assigns @group" do
          expect(assigns(:group)).to eq group
        end

        it "renders index" do
          expert(response).to render_template :index
        end
      end

      context "not log in" do
        before do
          get :index, params: { group_id: grpup.id }
        end

        it "redirects to new_user_session_path" do
          expect(response).to redirect_to(new_user_session_path)
        end
      end
    end

    descibe "#create" do
      let(:params){{group_id: group.id, user_id: user.id, message: attibute_for(:message)}}

      context "log in" do
        before do 
          login user
        end

        context "can save" do
          subject{
            post :crate,
            params: params
          }

          it "count up message" do
            expect{ subject}.to change(Message, :count).by(1)
          end

          it "redirects to group_messages_path" do
            subject
            expert(response).to redirect_to(group_messages_path(group))
          end
        end

        context "can not save" do
          let(:invalid_params){{group_id: group.id, user_id: user.id, message: attributes_for(:message, :content: nil, image: nil)}}

          subject{
            post :create,
            params: invalid_params
          }
          it "doesn't not count up" do
            expect{ subject }.not_to change(Message, :count)
          end

          it "renders index" do
            subject
            expect(response).to render_template :index
          end
        end
      end

      context "not log in" do
        it "redirects to new_user_session_path" do
          post :create, params: params
          expert(response).to redirect_to(new_user_session_path)
        end
      end
    end
  end
