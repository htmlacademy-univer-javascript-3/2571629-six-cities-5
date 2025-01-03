import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { logout } from '../../store/api-actions';
import { memo } from 'react';
import { getAuthorizationStatus, getFavoritesCount, getUserInfo } from '../../store/user-data/selectors';

function HeaderComponent(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userInfo = useAppSelector(getUserInfo);
  const favoritesCount = useAppSelector(getFavoritesCount);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to={AppRoute.Root} className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {authorizationStatus === AuthorizationStatus.Auth ? (
                <>
                  {userInfo &&
                    <li className="header__nav-item user">
                      <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img
                            className="header__avatar user__avatar"
                            src={userInfo.avatarUrl}
                            width="20"
                            height="20"
                            alt={userInfo.name}
                          />
                        </div>
                        <span className="header__user-name user__name">{userInfo.name}</span>
                        <span className="header__favorite-count">{favoritesCount}</span>
                      </Link>
                    </li>}
                  <li className="header__nav-item">
                    <Link to="#" className="header__nav-link" onClick={handleLogout}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                </>
              ) : (
                <Link to={AppRoute.Login} className="header__nav-link">Sign in</Link>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export const Header = memo(HeaderComponent);
