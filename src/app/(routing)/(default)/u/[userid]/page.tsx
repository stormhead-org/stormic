import UserData from '../../../../../../data.js'
import styles from './idUser.module.scss'

export default function Page() {
	const UserSrc = UserData
	return (
		<>
			<div className={styles.UserPage}>
				<p>User Profile</p>
				{UserSrc.users.new.map(obj => (
					<div key={obj.user.id}>
						<p className={styles.AboutTxt}>{obj.user.fullname}</p>
					</div>
				))}
			</div>
		</>
	)
}
