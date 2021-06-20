/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { CardPhoto } from 'components';

describe('Card Photo Component', () => {
  it('should render the owner username', () => {
    render(<CardPhoto src="/img-hero.jpg" alt="dummy" href="/photo/asdf" ownername="Judge" />);

    const Ownername = screen.getByText('Judge');

    expect(Ownername).toBeInTheDocument();
  });

  it('should render the title', () => {
    render(
      <CardPhoto
        src="/img-hero.jpg"
        alt="dummy"
        href="/photo/asdf"
        ownername="Judge"
        title="Sanji"
      />
    );

    const Title = screen.getByText('Sanji');

    expect(Title).toBeInTheDocument();
  });

  it('should render skeleton component when loading', () => {
    render(
      <CardPhoto
        src="/img-hero.jpg"
        alt="dummy"
        href="/photo/asdf"
        ownername="Judge"
        title="Sanji"
        isLoading
      />
    );

    const Title = screen.queryByText('Sanji');
    const Skeleton = screen.getByTestId('skeleton');

    expect(Title).not.toBeInTheDocument();
    expect(Skeleton).toBeInTheDocument();
  });

  it('should change page when clicked', () => {
    render(
      <CardPhoto
        src="/img-hero.jpg"
        alt="dummy"
        href="/photo/asdf"
        ownername="Judge"
        title="Sanji"
      />
    );

    const Card = screen.getByTestId('card');

    expect(Card).toHaveAttribute('href', '/photo/asdf');
  });
});
