import { redirect } from "next/navigation";

export default async function Home() {
  return redirect("/new");

  // return (
  // 	<>
  // 		{/* Центральная часть */}
  // 		<MainBannerForm stormicName={stormicName && String(stormicName.content)}
  // 		                bannerUrl={banner && String(banner.url)} />
  // 		<SortFeedButtons className='mt-4' />
  // 	</>
  // )
}
