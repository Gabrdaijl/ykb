"use client";
import {useEffect,useRef,useState} from "react";
import {Volume2,VolumeX} from "lucide-react";
export type GameSound="correct"|"wrong"|"saved";
export function useGameSounds(storageKey:string){
 const [enabled,ENABLED]=useState(true),[ready,READY]=useState(false),[error,ERROR]=useState("");
 const clips=useRef<Partial<Record<GameSound,HTMLAudioElement>>>({});
 const key=storageKey+"-game-sound";
 useEffect(()=>{try{ENABLED(localStorage.getItem(key)!=="off")}catch{}READY(true);
 const sync=(event:Event)=>{const detail=(event as CustomEvent).detail;if(detail?.key===key)ENABLED(!!detail.enabled)};
 window.addEventListener("tr-os-sound",sync);return()=>{window.removeEventListener("tr-os-sound",sync);Object.values(clips.current).forEach(a=>a?.pause())}},[key]);
 function play(kind:GameSound){if(!enabled||!ready)return;ERROR("");for(const audio of Object.values(clips.current)){audio?.pause()}const audio=clips.current[kind];if(!audio)return;audio.currentTime=0;audio.volume=.45;audio.play().catch(()=>ERROR("Ljudet kunde inte spelas. Kontrollera enhetens ljudinställning."))}
 function toggle(){const next=!enabled;ENABLED(next);ERROR("");if(!next)Object.values(clips.current).forEach(a=>a?.pause());try{localStorage.setItem(key,next?"on":"off")}catch{}window.dispatchEvent(new CustomEvent("tr-os-sound",{detail:{key,enabled:next}}))}
 const nodes=<span className="game-audio" aria-hidden="true">{(["correct","wrong","saved"] as GameSound[]).map(kind=><audio key={kind} data-sound={kind} ref={el=>{if(el)clips.current[kind]=el}} src={"/media/sounds/"+kind+".wav"} preload="auto"/>)}</span>;
 return {enabled,toggle,play,nodes,error};
}
export function SoundSwitch({enabled,onToggle}:{enabled:boolean;onToggle:()=>void}){return <button type="button" className="sound-switch" aria-label={enabled?"Stäng av spelljud":"Slå på spelljud"} aria-pressed={enabled} onClick={onToggle}>{enabled?<Volume2 size={18}/>:<VolumeX size={18}/>}<span>Ljud {enabled?"på":"av"}</span></button>}

