import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header.js';

function Register({ onRegister }) {
    const [data, setData] = React.useState({
        email: '',
        password: '',
    });

    const history = useHistory();

    function handleChangeData(e) {
        const {name, value} = e.target
        setData({
            ...data,
            [name]: value,
        });
      }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(data)
        .then(() => history.push('/sing-in'))
    }

    return (
        <>
            <Header loginText={'Войти'} link="/sign-in"/>
            <section className="form">
                <form onSubmit={handleSubmit} className="form__container form__containe_type_register">
                    <h3 className="form__title">Регистрация</h3>
                    <label className="form__field">
                    <input  value={data.email} onChange={handleChangeData}
                            placeholder="Email"
                            type="email" 
                            name="email" 
                            className="form__input form__input_type_register" 
                            id="email" 
                            required 
                            minLength="2"
                            maxLength="40"/>
                    <span className="form__error" id="email-error"></span>
                    </label>
                    <label className="form__field">
                    <input  value={data.password} onChange={handleChangeData}
                            placeholder="Пароль"
                            type="text" 
                            name="password" 
                            className="form__input form__input_type_password" 
                            id="password" 
                            required 
                            minLength="2" 
                            maxLength="200"/>
                    <span className="form__error" id="password-error"></span>
                    </label>
                    <button type="submit" className="form__save-button">Зарегистрироваться</button>
                    <p className="form__sing-in-text">Уже зарегистрированы? Войти</p>
                </form>
            </section>
        </ >
    )
}

export default Register