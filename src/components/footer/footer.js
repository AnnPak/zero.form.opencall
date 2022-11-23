import styles from './footer.module.scss'
import logo from '../../assets/img/logo.svg'

const Footer = () => {
  return(
    <footer className={styles.footer}>
      <img src={logo} alt="logo"/>
    </footer>
  )
}

export default Footer