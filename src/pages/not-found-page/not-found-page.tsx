import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AppRoute } from '../../const';
import { Header } from '../../components/header/header';

function NotFoundPage(): JSX.Element {
  return (
    <>
      <Header />
      <Helmet>
        <title>6 cities. Page not found.</title>
      </Helmet>
      <div style={{textAlign : 'center'}}>
        <h1>404. Page not found</h1>
        <Link to={AppRoute.Root}>Return to the main page</Link>
      </div>
    </>
  );
}

export default NotFoundPage;
