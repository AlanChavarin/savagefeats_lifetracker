'use client'
import { LifeCounterProvider } from "./LifeCounterContext"
import LifeCounter from "./LifeCounter"

function Life() {
  return (
    <LifeCounterProvider>
        <LifeCounter/>
    </LifeCounterProvider>
  )
}
export default Life