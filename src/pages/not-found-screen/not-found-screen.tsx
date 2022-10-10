import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <section>
      <h1>404</h1>
      <h2>Page not found</h2>
      <Link to={AppRoute.Root}>Back to Homepage</Link>
    </section>
  );
}

export default NotFoundScreen;
