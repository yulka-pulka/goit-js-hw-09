const t={buttonStart:document.querySelector("button[data-start]"),buttonStop:document.querySelector("button[data-stop]")};let e=null;t.buttonStart.addEventListener("click",(o=>{t.buttonStop.disabled&&t.buttonStop.removeAttribute("disabled"),o.currentTarget.disabled=!0,e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3)})),t.buttonStop.addEventListener("click",(o=>{t.buttonStart.removeAttribute("disabled"),o.currentTarget.disabled=!0,clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.736730b7.js.map
