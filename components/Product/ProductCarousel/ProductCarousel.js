import Slider from 'react-slick'
import { size, map} from 'lodash'
import { Image } from 'semantic-ui-react'

const ProductCarousel = ({photos,id}) => {
    const settings = {
        customPaging: i =>{
            return(
                <a>
                    <img src={`${photos[i+0].formats.small.url}`} />
                </a>
            )
        },
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return ( 
        <Slider {...settings}>
            {map(photos, (photo) =>(
                    <div className="ProductCarousel" key={id}>
                        <Image src={photo.url} fluid alt={photo.alternativeText}/>
                    </div>
                )
            )}
        </Slider>
    )
}
 
export default ProductCarousel;