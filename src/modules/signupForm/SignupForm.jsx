import { useState } from 'react';

import Input from 'ui/input';

import s from './signupForm.module.css';

function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [password, setPassword] = useState('');
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    console.log('name', name);
    console.log('email', email);
    console.log('phone', phone);
    console.log('telegramUsername', telegramUsername);
    console.log('password', password);
    console.log('value', Number(value));
  };

  return (
    <form className={s.form} onSubmit={submit}>
      <ul className={s.list_inputs}>
        <li>
          <Input id="signupName" label="Имя" value={name} onChange={setName} placeholder="Введите имя" />
        </li>
        <li>
          <Input
            id="signupEmail"
            label="Email"
            value={email}
            onChange={setEmail}
            placeholder="Введите почту"
            pattern="([A-Za-z0-9_-]+@[a-zA-Z_-]+?\.[a-zA-Z]{2,6})"
            // имя = любые буквы, цифры, а также - и _
            // почт.сервер = любые буквы, а также - и _
            // домен = любые буквы в количестве от 2 до 6
          />
        </li>
        <li>
          <Input
            type="tel"
            id="signupPhone"
            label="phone"
            value={phone}
            onChange={setPhone}
            placeholder="Введите телефон"
          />
        </li>
        <li>
          <Input
            id="signupTelegramUsername"
            label="telegramUsername"
            value={telegramUsername}
            onChange={setTelegramUsername}
            placeholder="Введите никнейм Telegram"
            minLength={5}
            pattern="([a-zA-Z0-9_]+)"
          />
        </li>
        <li>
          <Input
            type="password"
            id="signupPassword"
            label="password"
            value={password}
            onChange={setPassword}
            placeholder="Введите пароль"
            pattern="((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15})"
          />
        </li>
        <li>
          <Input
            id="signupValue"
            label="Сумма"
            value={value}
            onChange={setValue}
            placeholder="Введите сумму"
            pattern="([0-9]+\.?[0-9]{0,2})"
            // любой число, до сотых
          />
        </li>
      </ul>
      <button type="submit" className={s.btn_submit}>
        Зарегистрироваться
      </button>
    </form>
  );
}

export default SignupForm;
