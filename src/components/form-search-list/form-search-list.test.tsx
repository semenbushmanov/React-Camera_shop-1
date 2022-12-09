import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeFakeCamera } from '../../utils/mocks';
import FormSearchList from './form-search-list';

const mockCameraOne = makeFakeCamera();
const mockCameraTwo = makeFakeCamera();
const mockCameras = [ mockCameraOne, mockCameraTwo ];

describe('Component: FormSearchList', () => {
  it('should render correctly', () => {
    render(<FormSearchList cameras={mockCameras} onItemClick={jest.fn}/>);

    expect(screen.getByText(mockCameraOne.name)).toBeInTheDocument();
    expect(screen.getByText(mockCameraTwo.name)).toBeInTheDocument();
  });

  it('should call onItemClick when user clicks', async () => {
    const onItemClick = jest.fn();

    render(<FormSearchList cameras={mockCameras} onItemClick={onItemClick}/>);

    await userEvent.click(screen.getByText(mockCameraOne.name));

    expect(onItemClick).toBeCalled();
  });
});
