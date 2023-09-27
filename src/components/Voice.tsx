"use client"
import React, {useState, useEffect} from 'react'
/*
voiceURI: 'Google Bahasa Indonesia',
      name: 'Google Bahasa Indonesia',
      lang: 'id-ID',
      localService: false,
      default: false
*/ 
interface Voices {
    voiceURI:string;
    name:string;
    lang: string;
    localService:boolean;
    default:boolean
}

const Voice = () => {
    const[text, setText] = useState<string>("")
    const[Voices, setVoices] = useState<Voices[]>([])
    const[selectedVoice, setselectedVoice] = useState<string>("")
    
     
    // making use of this effect to initially populate the voices
    // as the components loads
    useEffect(()=>{
        const speach = window.speechSynthesis
        const setrun = ()=>{
            const getVoice = speach.getVoices()
            setVoices(getVoice)
            
           }
        speach.addEventListener("voiceschanged", setrun)
        setrun()
        return ()=>{
            speach.removeEventListener("voiceschanged", setrun)
        }
    },[])
        

    // here we run the function to convert the text to speech
    const handleConvert = ()=>{
        // here we starts with new instance of voice sythesis
        const synthesis = window.speechSynthesis
        // initializing the speechulterance
        const alterance = new SpeechSynthesisUtterance(text)
        // lets make a filter for the voice we want here
        const newVoice = Voices.find((item)=> item.name == selectedVoice )

        // lets finally run the code if therre is a filtered item
        if(newVoice){
            alterance.voice = newVoice
        }
        // then here we now speak
        synthesis.speak(alterance)
    }

    // here we handle pause speach
    const pauseSpeach = ()=>{
        const sythesis = window.speechSynthesis
        sythesis.pause()
    }
    // to resume speech
    const resumeSpeach = ()=>{
        const sythesis = window.speechSynthesis
        sythesis.resume()
    }
  return (
    <div className=' flex flex-col gap-2'>
        <p>convert text to voice</p>
        <select onChange={(e)=>setselectedVoice(e.target.value)} >
            <option value={""} selected disabled>select a voice</option>
            {
                Voices?.map((item, index)=>(<option value={item.name} key={index} >{`${item.name} ${item.lang} ${item.default?"-default":""}`}</option>))
            }
        </select>
        <input value={text} onChange={(e)=>setText(e.target.value)} className=' w-[200px] border p-1' placeholder='enter voice'/>
        <button onClick={handleConvert}>convert to voice</button>
        <button onClick={pauseSpeach} className=' p-2 bg-red-500 rounded-md text-white'>pause speach</button>
        <button onClick={resumeSpeach} className=' p-2 bg-green-500 rounded-md text-white'>resume speach</button>
    </div>
    
  )
}

export default Voice