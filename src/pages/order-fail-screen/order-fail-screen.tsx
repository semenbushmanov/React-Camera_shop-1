import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function OrderFailScreen(): JSX.Element {
  return (
    <section>
      <h3>Ошибка при отправке заказа</h3>
      <h4>Побробуйте отправить заказ позже</h4>
      <Link to={AppRoute.Root}>Назад на главную страницу</Link>
    </section>
  );
}

export default OrderFailScreen;
