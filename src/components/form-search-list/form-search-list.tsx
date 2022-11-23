import { Cameras } from '../../types/camera';

type FormSearchListProps = {
  cameras: Cameras;
  onItemClick: (id: number) => void;
};

function FormSearchList({cameras, onItemClick}: FormSearchListProps): JSX.Element {
  return (
    <ul className="form-search__select-list scroller">
      {cameras.map((camera) => (
        <li className="form-search__select-item" {...{tabIndex: 0}} role='button' key={camera.name}
          onClick={() => onItemClick(camera.id)} onKeyDown={(evt) => evt.key === 'Enter' && onItemClick(camera.id)}
        >
          {camera.name}
        </li>
      ))}
    </ul>
  );
}

export default FormSearchList;
