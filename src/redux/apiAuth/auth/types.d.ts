/* eslint-disable @typescript-eslint/no-unused-vars */
namespace AUTH {
    type GetMeResponse = {
      profile: {
        id: string;
        username: string;
        role: string;
        email: string;
        isActive: string;
        photo: string;
        createdAt: string;
        updatedAt: string;
      };
    };
    type GetMeRequest = void;
  
    type PostSignUpResponse = {
      accessToken: string;
      accessTokenExpiration: string;
      refreshToken: string;
      message: string;
    };
  
    type PostSignUpRequest = {
      email: string;
      password: string;
      username: string;
      photo: string;
    };
  
    type PostSignInResponse = {
      accessToken: string;
      accessTokenExpiration: string;
      refreshToken: string;
    };
    type PostSignInRequest = {
      email: string;
      password: string;
    };
  
    type LogOutResponse = void;
    type LogOutRequest = void;
  }
  