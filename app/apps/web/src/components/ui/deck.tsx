import * as React from "react"
import { cn } from "../../lib/utils"

const DeckUI = () => {
    return <div className="border border-2 border-black bg_white m-5"> 
        <h1> titre deck </h1> 
        <h3> tags deck </h3>
        <div className="items-center">
            <div>
                <img src="../../../imgs/pages.png"/>
                20
            </div>
            <div>
                <img src="./../../../imgs/edit.png"/>
                <img src="../../../imgs/share.png"/>
                <img src="../../../imgs/delete.png"/>
            </div>
        </div>
    </div>
}

export { DeckUI }