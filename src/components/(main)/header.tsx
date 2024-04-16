import { UserButton } from '@/components/auth/user-button'
import Image from 'next/image'
import Link from 'next/link'
import SiteLogoData from '../../../data.js'

export const Header: React.FC = () => {
	const SiteLogoSrc = SiteLogoData
	return (
		<>
			<div className='Header'>
				{/* <ModalLogin /> */}
				<div className='HeaderContainer'>
					<div className='Left'>
						<Link href='/' aria-label='Home'>
							{SiteLogoSrc.environment.media.project.map(obj => (
								<div key={obj.selfproject.sitelogo}>
									<Image
										className='Logo'
										src={obj.selfproject.sitelogo}
										priority
										alt='SiteLogo'
										width={44}
										height={44}
										style={{ objectFit: 'contain' }}
									/>
								</div>
							))}
						</Link>
					</div>

					<div className='Center'>
						<div className='ItemHeaderMenu'>
							<Link href='/wiki' aria-label='Руководства'>
								<Image
									src='../../../icons/page.svg'
									alt='Руководства'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className='ItemHeaderMenu'>
							<Link href='/groups' aria-label='Сообщества'>
								<Image
									src='../../../icons/rocket.svg'
									alt='Сообщества'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className='ItemHeaderMenu'>
							<Link href='/users' aria-label='Участники'>
								<Image
									src='../../../icons/peace.svg'
									alt='Участники'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className='ItemHeaderMenu'>
							<Link href='/community' aria-label='Общение'>
								<Image
									src='../../../icons/megaphone.svg'
									alt='общение'
									height={24}
									width={24}
								/>
							</Link>
						</div>
						<div className='ItemHeaderMenu'>
							<Link href='/about' aria-label='О Нас'>
								<Image
									src='../../../icons/bulb.svg'
									alt='О Нас'
									height={24}
									width={24}
								/>
							</Link>
						</div>
					</div>

					<div className='Right'>
						<UserButton />
					</div>
				</div>
			</div>
		</>
	)
}

export default Header
