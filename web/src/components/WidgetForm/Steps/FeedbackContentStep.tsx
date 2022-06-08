import { ArrowLeft, Camera } from "phosphor-react"
import {  FormEvent, useState } from "react"
import { FeedbackType,  feedbackTypes} from ".."
import { api } from "../../../lib/api"
import { CloseButton } from "../../CloseButton"
import { Loading } from "../../Loading"
import { ScreenshotButton } from "../ScrennshotButton"

interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    onFeedbackRestartRequested :() => void
    onFeedbackSent:()=>void
}

export function FeedbackContentStep({
    feedbackType,
    onFeedbackRestartRequested,
    onFeedbackSent,
    }:FeedbackContentStepProps){
   const[screenshot, setScreenshot]= useState<string| null>(null)
   const [comment, setComment] = useState ('')
   const[isSendFeedback, setIsSendFeedback]= useState (false)

   const feedbackTypeInfo = feedbackTypes [feedbackType]

   async function handleSubmitFeedback(event: FormEvent){
   //essa função bloqueia o evento padrao do react de dar um reload na pagina
    event.preventDefault()
    setIsSendFeedback(true)

    // //    console.log({
    // //        screenshot,
    // //        comment,
    //    })

    // acessando a api no backend;
    await api.post("/feedbacks",{
        //passando os parametros que iremos receber da nossa aplicação
        type: feedbackType,
        comment,
        screenshot,
    })
       setIsSendFeedback(false)

       onFeedbackSent()

   }

    return(
        <> 
        <header  >
            <button type="button" 
            className = "top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
            onClick={onFeedbackRestartRequested}
            >
            <ArrowLeft weight="bold" className ="w-4 h-4" />
            </button>
        <span className="text-xl leading-6  flex items-center gap-2">
            <img src ={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className ="w-6 h-6"/>
            {feedbackTypeInfo.title}
        </span>
       <CloseButton/>
    </header>    
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
          <textarea 
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 corder-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhe o que está acontecendo..."

          //toda vez que um usuario digitar algo na textArea eu vou atualiza o valor do estado !
          onChange={event =>setComment(event.target.value)}
          >

          </textarea>
          <footer className="flex gap-2 mt-2">
         <ScreenshotButton 
                screenshot={screenshot}
          onScreenshotTook={setScreenshot}
         />

              <button
              type="submit"
              disabled={comment.length===0 || isSendFeedback}
              className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm transition-colors hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:hover:bg-brand-500 disable:opacity-50 disabled:hover-50 "
              >{isSendFeedback? <Loading/> : 'Enviar feedback'}

              </button>
          </footer>

      </form>
    </>
    )
}