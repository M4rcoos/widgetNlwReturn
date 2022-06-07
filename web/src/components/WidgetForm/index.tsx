
import bugImageUrl from "../../assets/Emoji.svg"
import ideaImageUrl from "../../assets/Idea.svg"
import thoughtImageUrl from "../../assets/Thought.svg"
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccesStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes={
    BUG :{
        title:"problema",
        image: {
            source:bugImageUrl,
            alt: "imagem de um inseto"
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source : ideaImageUrl,
            alt: "Imagem de uma lâmpada"
        }
    },
    OTHER:{ 
        title:"Outros",
        image: {
            source : thoughtImageUrl,
            alt: "Imagem de uma nuvem de pensamento"
        }
    },


};
export type FeedbackType= keyof typeof feedbackTypes

 export function WidgetForm(){
     const [feedbackType, setFeedbackType]=useState<FeedbackType | null >(null)
     const[feedbackSent,setFeedbackSent]= useState(false)

        function handleRestartFeedback(){
            setFeedbackSent(false)
            setFeedbackType(null)
        }

     return(
         <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg
         w-[calc(100vw-2rem)] md:w-auto">
             
            {feedbackSent?(
                 <FeedbackSuccesStep onFeedbackRestartRequested={handleRestartFeedback}/>
            ):
            <>
              {!feedbackType ? (
            <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={()=>setFeedbackSent(true)}
            />
          )}
            </>
               
            }

        
            <footer className="text-xs text-neutral-400">
                Feito com ♥ pela <a className="underline underline-offset-2" href="http://rocketseat.com.br">Rocketseat</a>
             </footer>


         </div>
     )
 }