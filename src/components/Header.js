import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({ loggedIn, loginText, onClick, link, login }) {
    return (
        <header className="header">
            <img src={logo} alt="Лого" className="header__logo"/>
            <div className="header__container">
                <p className="header__email">{login}</p>
                <Link to={link} className={`${loggedIn ? "header__link_singout" : ""} header__link`} onClick={onClick}>{loginText}</Link>
            </div>
        </header>
    )
}
export default Header
