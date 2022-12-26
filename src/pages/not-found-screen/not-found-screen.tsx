import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <section>
      <h1>404</h1>
      <h3>Страница не найдена</h3>
      <Link to={AppRoute.Root}>Назад на главную страницу</Link>
    </section>
  );
}

export default NotFoundScreen;
