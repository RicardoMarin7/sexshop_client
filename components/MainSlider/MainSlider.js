import React from 'react'
import Slider from 'react-slick'
import { size, map} from 'lodash'
import { Image } from 'semantic-ui-react'
import useHomeConfig from '../../hooks/useHomeConfig'

const MainSlider = () => {

    const { homeConfig } = useHomeConfig()

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        // lazyLoad: true,
        swipeToSlide: true,
        fade: true,
        adaptiveHeight: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 6000,
    }


    return (
        <div className="MainSlider">
            {size(homeConfig?.slider) > 0 ? (
                <Slider {...settings}>
                    {map(homeConfig.slider, (photo) =>(
                            <div  key={photo._id}>
                                <Image src={ photo.url} fluid className="MainSlider__photo" alt={photo.alternativeText}/>
                            </div>
                        )
                    )}
                </Slider>
            ) : null}
        </div>
        
    )
}
 
export default MainSlider;