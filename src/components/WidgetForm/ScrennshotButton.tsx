import html2canvas from "html2canvas";
import { Camera, CircleNotch } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

export function ScreenshotButton(){
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    //criando uma funão que irá capturar a imagem  
    async function handleTakenScreenshot(){
        setIsTakingScreenshot(true)


        const canvas= await html2canvas (document.querySelector("html")!)
        const base64Image = canvas.toDataURL('image/png')

        // setIsTakingScreenshot(false)

    }

    return(
        <button
        type="button"
        onClick={handleTakenScreenshot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500"
        >

            {isTakingScreenshot ? <Loading/> : <Camera className =" w-6 h-6"/>}
        </button>
    )
}