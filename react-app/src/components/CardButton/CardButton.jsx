import './CardButton.scss';

function CardButton({ children, className }) {
  const cl = 'card-button' + (className ? ' ' + className : '');
  return (
    <>
      <button className={cl}>{children}</button>
    </>
  );
}

export default CardButton;
