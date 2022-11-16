import styles from './header.module.scss'
import logo from '../../assets/img/logo.svg'

const Header = () => {
  return(
    <header className={styles.header}>
      <img src={logo} alt="logo"/>
    </header>
  )
}

export default Header