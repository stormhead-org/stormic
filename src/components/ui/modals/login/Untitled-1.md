(
<>
<div className={styles.ModalMenu}>
<button
className={styles.ButtonModal}
onClick={() => setFormType('main')} >
<ChevronLeft />
</button>
<button
className={styles.ButtonModal}
type='button'
onClick={() => {
router.back()
setFormType('main')
}} >
<X />
</button>
</div>
<div className={styles.LoginBlock}>
<div className={styles.LoginBlockFrame}>
<div className={styles.LoginTxt}>
<p className={styles.TxtOut}>
Войти через почту
<br />
или{' '}
<Link
href=''
onClick={() => setFormType('registration')} >
зарегистрироваться
</Link>
</p>
</div>
<div className={styles.LoginButtons}>
<div className={styles.LoginButtonFrame}>
<input
													className={styles.LoginInput}
													type='text'
													placeholder='Почта'
												/>
</div>
<div className={styles.LoginButtonFrame}>
<input
													className={styles.LoginInput}
													placeholder='Пароль'
													type='password'
												/>
</div>
<div className={styles.LoginButtonFrame}>
<button
onClick={() => setFormType('email')}
className={styles.LoginButton} >
Войти
</button>
</div>
<div className={styles.RegUrl}>
<Link href='' onClick={() => setFormType('frgtpwd')}>
Забыли пароль?
</Link>
</div>
</div>
</div>
</div>
<div className={styles.LoginPrivacy}>
<p>
<Link href='/#'></Link>
Авторизуясь, Вы соглашаетесь с{' '}
<Link href='/#'>правилами пользования сайтом</Link> и даете
согласие на обработку{' '}
<Link href='/#'>персональных данных</Link>
</p>
</div>
</>
)
