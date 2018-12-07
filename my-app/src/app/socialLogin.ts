import {
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider,
    } from 'angular-6-social-login-v2';
    import { ConstantData } from './constantData';
    export function getAuthServiceConfigs() {
    const constantData = new ConstantData();
    const config = new AuthServiceConfig([
    {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(constantData.faceBookId)
    },
    {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(constantData.googleId)
    }
    ]);
    return config;
    }