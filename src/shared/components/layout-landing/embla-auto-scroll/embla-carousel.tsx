import React, { useCallback, useEffect, useState } from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from "@/shared/components/layout-landing/embla-auto-scroll/embla-carousel-arrow-buttons";
import {Product} from "@/product/types";
import ProductCard from "@/product/components/product-view-landing/product-card";


type PropType = {
  products: Product[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { products, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true, stopOnInteraction: false })
  ])
  const [isPlaying, setIsPlaying] = useState(false)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll = emblaApi?.plugins()?.autoScroll
      if (!autoScroll) return

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop

      resetOrStop()
      callback()
    },
    [emblaApi]
  )

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play
    playOrStop()
  }, [emblaApi])

  useEffect(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll
    if (!autoScroll) return

    setIsPlaying(autoScroll.isPlaying())
    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoScroll.isPlaying()))
  }, [emblaApi])

  return (
    <div className="max-w-[48rem] mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y ml-[-1rem]">
          {Array.isArray(products) &&
            products.map((product) => (
              <div
                key={product.id}
                className="translate-z-0 flex-[0_0_45%] min-w-0 pl-4"
                style={{ height: '19rem' }}
              >
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel
