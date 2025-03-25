import { Memorix } from "@/components/Memorix"
import { FC } from "react"

export const FrontLayout:FC<{children: React.ReactNode}> = ({children}) => {
    return (
        <div>
            <Memorix />
            {children}
        </div>
    )
}
