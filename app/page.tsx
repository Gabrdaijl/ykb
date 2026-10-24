import Academy from "./academy";
import {getChatGPTUser} from "./chatgpt-auth";
export const dynamic="force-dynamic";
export default async function Page(){const u=await getChatGPTUser();return <Academy name={u?.fullName||"din framtid"} signedIn={!!u} storageKey={u?"ykb-v1-"+u.userId:"ykb-v1-guest"}/>}

