import { Poppins } from 'next/font/google'

import { cn } from '@/lib/(auth)/utils'

import LoginButton from '@/components/auth/login-button'
import { Button } from '@/components/ui/button'

const font = Poppins({
	subsets: ['latin'],
	weight: ['600']
})
export default function Home() {
	// const emailRef = useRef<HTMLInputElement>(null);

	// const sendTestEmail = async () => {
	//   const email = emailRef.current?.value;

	//   if (!email) {
	//     alert('Please enter a valid email');
	//     return;
	//   }

	//   try {
	//     const res = await fetch('@/lib/smtp', {
	//       method: 'POST',
	//       headers: {
	//         'Content-Type': 'application/json',
	//       },
	//       body: JSON.stringify({ email }),
	//     });

	//     if (!res.ok) {
	//       const errorText = await res.text();
	//       throw new Error(errorText || 'Failed to send email');
	//     }

	//     const result = await res.json();
	//     alert(result.message);
	//   } catch (error: any) {
	//     alert('Error: ' + (error.message || 'Something went wrong'));
	//   }
	// };

	return (
		<main
			className="
        flex h-full flex-col items-center justify-center
        bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-600 to-neutral-900        
      "
		>
			<div className="space-y-6 text-center">
				<h1
					className={cn(
						'text-6xl font-semibold text-gray-300 drop-shadow-md',
						font.className
					)}
				>
					🔐 Auth
				</h1>
				<p className="text-white text-lg">A simple authentication service</p>

				<div>
					<LoginButton mode="modal" asChild>
						<Button variant="secondary" size="lg">
							Sign in
						</Button>
					</LoginButton>
				</div>
				{/* <div>
          <h1>Send Test Email</h1>
          <input
            type="email"
            placeholder="Enter email"
            ref={emailRef}
          />
          <button onClick={sendTestEmail}>Send Email</button>
        </div> */}
			</div>
		</main>
	)
}
