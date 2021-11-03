import { useLocation, useHistory } from 'react-router';

export default function NotFound() {
  const location = useLocation();
  const history = useHistory();

  const handleClick = () => {
    history.push(location?.state?.from?.pathname ?? '/');
  };
  return (
    <>
      <button type="button" onClick={handleClick}>
        Go back
      </button>
      <h1>404 page not found :(</h1>
    </>
  );
}
