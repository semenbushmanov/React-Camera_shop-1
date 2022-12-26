import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './order-fail-screen.css';

function OrderFailScreen(): JSX.Element {
  return (
    <div className="order-fail">
      <section>
        <h3>Ошибка при отправке заказа</h3>
        <h4>Побробуйте отправить заказ позже</h4>
        <Link to={AppRoute.Root} className="btn btn--purple product-card__btn">
          Назад на главную страницу
        </Link>
      </section>
    </div>
  );
}

export default OrderFailScreen;
