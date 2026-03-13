import { IoIosNotificationsOutline, IoIosSearch } from 'react-icons/io'
import { IoCaretBackCircleOutline } from 'react-icons/io5'
import styles from "./NavBar.module.css"

export default function NavBar() {
  return (
    <div className={styles.nav}>
      <div>
        <IoCaretBackCircleOutline size={25} />
      </div>
      <div className='d-flex align-items-center'>
        <div className={styles.searchBox}>
          <IoIosSearch className={styles.searchIcon} size={20} />
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          </form>
        </div>
        <div>
          <IoIosNotificationsOutline size={25} className='ms-3' />
        </div>
      </div>
    </div>
  )
}
