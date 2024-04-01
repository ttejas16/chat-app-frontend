import { useEffect, useState } from "react";
import Img1 from "/src/assets/img1.svg";
import Img2 from "/src/assets/img2.svg";
import Img3 from "/src/assets/img3.svg";

import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

import { Dot } from "lucide-react";


function ImageCarousel() {
    const [api, setApi] = useState();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })

    }, [api]);

    return (
        <Carousel setApi={setApi} opts={{ loop: true }} plugins={[
            Autoplay({ delay: 2500 })
        ]}>
            <CarouselContent>
                <CarouselItem>
                    <img src={Img2} alt="" className=" object-cover" />
                </CarouselItem>
                <CarouselItem>
                    <img src={Img3} alt="" className=" object-cover" />
                </CarouselItem>
                <CarouselItem>
                    <img src={Img1} alt="" className=" object-cover" />
                </CarouselItem>
            </CarouselContent>

            <div className="flex text-foreground mt-8 justify-center">
                {
                    Array.from({ length:3 }).map((_, index) => {

                        if (current == index + 1) {
                            return <Dot key={index} color="white" className="border-[1px] rounded-full border-white" />
                        }
                        return <Dot key={index} color="white" />
                    })
                }
            </div>
        </Carousel>
    )
}

export default ImageCarousel;