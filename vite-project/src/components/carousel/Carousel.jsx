import { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

import './Carousel.css'

// The carousel component was done from following the tutorial: https://www.youtube.com/watch?v=QpsGo8kZiTo,
// as well as using the code in this repo: https://github.com/CodeCompleteYT/react-image-carousel on May 31st. I modified
// the tutorial code to add another prop, as well as change the way data is being passed in.
const Carousel = ({ data, size }) => {
  const [slide, setSlide] = useState(0)
  const { width, height } = size

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1)
  }

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1)
  }

  return (
    <div className="carousel" style={{ width: width, height: height }}>
      <BsArrowLeftCircleFill onClick={prevSlide} className="arrow arrow-left" />
      {data.map((item, idx) => {
        return (
          <img src={item.src} alt={item.alt} key={idx} className={slide === idx ? 'slide' : 'slide slide-hidden'} />
        )
      })}
      <BsArrowRightCircleFill onClick={nextSlide} className="arrow arrow-right" />
      <span className="indicators">
        {data.map((_, idx) => {
          return (
            <button
              key={idx}
              className={slide === idx ? 'indicator' : 'indicator indicator-inactive'}
              onClick={() => setSlide(idx)}
            ></button>
          )
        })}
      </span>
    </div>
  )
}

export default Carousel
