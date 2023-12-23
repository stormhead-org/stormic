import ProjectData from '../../../../../data.js'
import styles from './ProjectAbout.module.scss'

export default function ProjectAbout() {
	const ProjectSrc = ProjectData
	const SiteUrlEnv = process.env.SITE_URL as string
	return (
		<>
			<div className={styles.ProjectAbout}>
				{ProjectSrc.environment.media.project.map(obj => (
					<div key={obj.mustelproject.projectversion}>
						<p className={styles.AboutTxt}>
							{obj.selfproject.siteurl}: <a href='/about'>О проекте</a> |{' '}
							<a href='/rules'>Правила</a> |
							<br />
							<a href='/privacy-policy'>Политика конфиденциальности</a>
							<br />
							<br />
							{obj.mustelproject.projectname}:{' '}
							<a href='https://fatum.ru/about'>О проекте</a> |{' '}
							<a href='/keyboard-shortcuts'>Сочетания клавиш</a> |{' '}
							<a href='https://github.com/nimscore/fatum-ui'>Исходный код</a> |{' '}
							{obj.mustelproject.projectversion}
							<br />
							<br />
							Сделано с любовью и <a href='https://nextjs.org'>NextJS</a>
							<br />
							Сообщество <a href='https://fatum.ru'>Fatum</a> © 2023 - 2024
						</p>
					</div>
				))}
			</div>
		</>
	)
}
