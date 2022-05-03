/*
* @jest-environment jsdom
*/
/* eslint-disable */
import recover from '../../src/pages/login/recover.js';
import * as functionsFirebase from '../../src/lib/exports-firebase.js';
import { forgotPassword } from '../../src/configs/authentication.js';

jest.mock('../../src/lib/exports-firebase.js');

const page = recover();    
      const sendLinkButton = page.querySelector('#button-send');
      const msgAlert = page.querySelector('#msg-recover');
      const userEmail = page.querySelector('#input-email');
      

describe("recover", () => {
  beforeEach(() => functionsFirebase.createUserWithEmailAndPassword.mockClear());
    it ('recover should return error when input is empty', () => {
      userEmail.value = "beaproscarva@gmail.com";
      sendLinkButton.dispatchEvent(new Event('click'));

      expect(msgAlert.innerHTML).toEqual("Email enviado.");
      expect(functionsFirebase.sendPasswordResetEmail).not.toHaveBeenCalled(1);
    });
});  