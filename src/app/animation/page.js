import AnimationMarginWrapper from "@/components/animation/animation-margin-wrapper"
import BookPage from "@/components/animation/book"
import CoinSorter from "@/components/animation/coinSorter"
import FlexDemo from "@/components/animation/flex-demo"
import ToggleRender from "@/components/animation/toggleRender"
import WidgetProcessorRender from "@/components/animation/windget-processor-render"
import * as motion from "motion/react-client"

export default function EnterAnimation() {
  return (
    <>
      <AnimationMarginWrapper title={'Enter Animation'}>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }}
          style={ball}
        />
      </AnimationMarginWrapper>
      <AnimationMarginWrapper title={'After render On click animation'} >
        <ToggleRender />
      </AnimationMarginWrapper>
      <AnimationMarginWrapper title={'After render On click animation'} >
        <FlexDemo />
      </AnimationMarginWrapper>
      <AnimationMarginWrapper title={'Widget Process'} >
        <WidgetProcessorRender />
      </AnimationMarginWrapper>
      <AnimationMarginWrapper title={'Coin Sorter'} >
        <CoinSorter
          numOfCoins={6}
        />
      </AnimationMarginWrapper>
      <AnimationMarginWrapper title={'Book'} >
        <BookPage />
      </AnimationMarginWrapper>

      <div style={{ paddingBottom: 200 }}></div>
    </>
  )
}

/**
 * ==============   Styles   ================
 */

const ball = {
  width: 100,
  height: 100,
  backgroundColor: "#dd00ee",
  borderRadius: "50%",
}
