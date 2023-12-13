import ProjectData from '../../../../../data.js'
import styles from './ProjectAbout.module.scss'

export default function ProjectAbout() {
	const ProjectSrc = ProjectData
	const SiteUrlEnv = process.env.SITE_URL as string
	return (
		<>
			{ProjectSrc.environment.media.project.map(obj => (
				<div key={obj.mustelProject.projectVersion} {...obj}>
					<div className={styles.ProjectAbout}>
						<p>
							{obj.selfProject.siteUrl}: <a href='/about'>О проекте</a> |{' '}
							<a href='/rules'>Правила</a> |
							<br />
							<a href='/privacy-policy'>Политика конфиденциальности</a>
							<br />
							<br />
							{obj.mustelProject.projectName}:{' '}
							<a href='https://mustel.ru/about'>О проекте</a> |{' '}
							<a href='/keyboard-shortcuts'>Сочетания клавиш</a> |{' '}
							<a href='https://github.com/nimscore/mustel-ui'>Исходный код</a> |{' '}
							{obj.mustelProject.projectVersion}
							<br />
							<br />
							Сделано с любовью и <a href='https://nextjs.org'>NextJS</a>
							<br />
							Сообщество <a href='https://mustel.ru'>Mustel</a> © 2023 - 2024
						</p>
					</div>
				</div>
			))}
		</>
	)
}
