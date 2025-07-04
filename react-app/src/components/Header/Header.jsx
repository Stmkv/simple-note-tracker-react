import styles from './Header.module.scss';
import SelectUser from '../SelectUser/SelectUser';

function Header() {
  return (
    <>
      <img className={styles.logo} src='/logo.svg' alt='Логотип журнала' />
      <SelectUser />
    </>
  );
}

export default Header;
