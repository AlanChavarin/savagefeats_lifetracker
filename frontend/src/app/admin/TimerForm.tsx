
import { useContext } from "react"
import LifeCounterContext from "../context/LifeCounterContext"
import { z } from "zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const formSchema = z.object({
    minutes: z.coerce.number().min(0).max(99),
    seconds: z.coerce.number().min(0).max(59)
})

type FormFields = z.infer<typeof formSchema>

function TimerForm() {

    const {setTime} = useContext(LifeCounterContext)

    const form = useForm<FormFields>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            minutes: 55,
            seconds: 0
        }
    })

    const { register, handleSubmit, setValue, getValues, reset, watch, resetField, formState: {errors, isSubmitting}} = form


    const onSubmit: SubmitHandler<FormFields> = async (data) => { 
        console.log(data)
        const fullTimeInSeconds = data.minutes*60 + data.seconds
        setTime(fullTimeInSeconds)
    }

    const onClick = () => {
        reset()
        setTime(0)
    }

  return (
    <form className="flex gap-[16px] items-center lg:gap-[32px] justify-center flex-col lg:flex-row" onSubmit={handleSubmit(onSubmit)}> 
        
        {Object.keys(errors).map((key) => {
          // @ts-ignore
          const error = errors[key as keyof FormData] 
          return (
            <div key={key} className="text-red-500 text-[9px]">
              {key}: {error?.message}
            </div>
          )
        })}

        <div className="self-start">
            Timer: 
        </div>


        <div className=" w-[164px] md:w-[300px] border-[1px] border-[#C0C0C0] rounded-[16px] bg-white flex flex-row items-center justify-center box-shadow-extra-small">
            <input {...register('minutes')} type="number" name="minutes" className="text-center w-[64px] md:w-[128px] outline-none" placeholder="55" min="0" max="99"/>
            <div>
                :
            </div>
            <input {...register('seconds')} type="number" name="seconds" className="text-end w-[64px] md:w-[128px] outline-none" placeholder="00" min="0" max="59"/>
        </div>
        

        <button type="submit" className="bg-white hover:bg-slate-100 px-[32px] box-shadow hidden lg:block">
            Start
        </button>

        <button type="button" onClick={() => onClick()} className="bg-white hover:bg-slate-100 px-[32px] box-shadow hidden lg:block">
            Reset
        </button>

        <div className="lg:hidden flex flex-row gap-[24px]"> 
            <button type="submit" className="bg-white hover:bg-slate-100 px-[32px] box-shadow">
                Start
            </button>

            <button type="button" onClick={() => onClick()} className="bg-white hover:bg-slate-100 px-[32px] box-shadow">
                Reset
            </button>
        </div>

    </form>
  )
}
export default TimerForm