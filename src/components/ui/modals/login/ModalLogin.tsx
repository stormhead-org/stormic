import Modal from '../modal_item/Modal'
import ModalClose from '../modal_item/modals_close/ModalClose'
import styles from './ModalLogin.module.scss'

export default function ModalLogin() {
	return (
		<>
			<Modal>
				<div className={styles.ModalLogin}>
					<div className={styles.FrameLeft}></div>
					<div className={styles.FrameRight}>
						<ModalClose />
					</div>
				</div>
			</Modal>
		</>
	)
}
