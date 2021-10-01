import React, { FC, useState } from 'react';
import { User } from '../../layouts/User';
import { InputWithBorder } from '../../components/InputWithBorder';
import { FooterLink } from './styled';

export const Login: FC<any> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <User
      title="Login"
      message="Welcome back, sign in to continue"
      form={(
        <>
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={email}
            onChangeText={setEmail}
            placeholder="Email"
          />
          <InputWithBorder
            variant="bodyRegular"
            defaultValue={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
        </>
      )}
      button={{
        text: 'Sign in',
        action: () => {},
      }}
      footer={(
        <>
          Don’t have an account?{' '}
          <FooterLink variant="bodyBold" onPress={() => navigation.navigate('CreateAccount')}>Create account</FooterLink>
        </>
      )}
    />
  );
};
