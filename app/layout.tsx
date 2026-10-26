import "./globals.css";
import "./ui-premium.css";
export const metadata={title:"TR-os – Lär dig för vägen framåt",description:"YKB-studier på svenska och arabiska. Lastbil, buss och smart repetition.",applicationName:"TR-os",manifest:"/manifest.webmanifest",icons:{icon:"/icon-192.png",apple:"/apple-touch-icon.png"},appleWebApp:{capable:true,title:"TR-os",statusBarStyle:"default"}};
export const viewport={width:"device-width",initialScale:1,viewportFit:"cover",themeColor:"#123f46"};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="sv"><body>{children}</body></html>}
