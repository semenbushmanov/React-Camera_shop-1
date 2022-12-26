import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './not-found-screen.css';

function NotFoundScreen(): JSX.Element {
  return (
    <div className="page-not-found">
      <section>
        <h1>404</h1>
        <h3>Страница не найдена</h3>
        <Link to={AppRoute.Root} className="btn btn--purple product-card__btn">
          Назад на главную страницу
        </Link>
      </section>
    </div>
  );
}

export default NotFoundScreen;
