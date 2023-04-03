import React, {useContext} from "react";
import {ThemeContext} from './themes/themeprovider'
import './app.scss'
function FetchQuestApp() {
    const {toggle, toggler} = useContext(ThemeContext)
    return(
        <div className={toggle ? "redpill" : "bluepill"}>
          <button onClick={toggler}>matrix</button>
          hello
        </div>
    )
}

export default FetchQuestApp