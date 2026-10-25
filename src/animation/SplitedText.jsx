import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";
const SplitedText = () => {
    gsap.registerPlugin(SplitText, ScrollTrigger)
    useEffect(() => {
        document.fonts.ready.then(() => {
            document.querySelectorAll('.split').forEach(el => {
                const split = SplitText.create(el, { type: "words, chars" });
                gsap.from(split.chars, {
                    duration: 0.6,
                    y: 100,
                    opacity: 0,
                    autoAlpha: 0,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        end: 'bottom 20%'
                    }
                })
            })
            document.querySelectorAll('.reverse').forEach(el => {
                const split = SplitText.create(el, { type: "words, chars" });
                gsap.from(split.chars, {
                    duration: 0.6,
                    y: 100,
                    opacity: 0,
                    autoAlpha: 0,
                    stagger: {
                        from: 'end',
                        each: 0.1
                    },
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 80%',
                        end: 'bottom 20%'
                    }
                })
            })
        })
    }, [])
}
export default SplitedText;