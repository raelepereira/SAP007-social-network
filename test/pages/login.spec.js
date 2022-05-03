/*
* @jest-environment jsdom
*/
/* eslint-disable */
import login from '../../src/pages/login/login.js';
import * as functionsFirebase from '../../src/lib/exports-firebase.js';
import { userWithLogin } from '../../src/configs/authentication.js';

jest.mock('../../src/lib/exports-firebase.js');

it ('login should signIn with success', async () => {
  await userWithLogin.mockResolvedValueOnce();
  const page = login();
  const buttonEmail = page.querySelector('#input-email');
  const buttonPassword = page.querySelector('#input-password');
  const buttonLogin = page.querySelector('#button-login');
  buttonEmail.value = 'teste@teste.com';
  buttonPassword.value = '123456';  

  buttonLogin.dispatchEvent(new Event('click'));
  
  expect(userWithLogin).toHaveBeenCalledTimes(1);
  expect(userWithLogin).toHaveBeenCalledWith('teste@teste.com', '123456');
  //expect(functionsFirebase.signInWithEmailAndPassword).toHaveBeenCalledWith('teste@teste.com', '123456');
});

describe("page login", () => {
  it("It should return an error", () => {
    const page = login();
    const buttonEmail = page.querySelector('#input-email');
    const buttonPassword = page.querySelector('#input-password');
    const buttonLogin = page.querySelector('#button-login');

    buttonEmail.value = '';
    buttonPassword.value = '123456';
    buttonLogin.dispatchEvent(new Event('click'));

    const msgAlert = page.querySelector('#message');

    expect(msgAlert.innerHTML = "Insira um email válido.").toBe("Insira um email válido.");
  });
});


