import s from './Button.module.css';
export default function Button({ onClick }) {
  return (
    <div className={s.ButtonWrapper}>
      <button className={s.Button} type="button" onClick={onClick}>
        Load more
      </button>
    </div>
  );
}
