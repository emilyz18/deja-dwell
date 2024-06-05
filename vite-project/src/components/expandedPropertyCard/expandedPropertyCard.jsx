import Carousel from '../carousel/Carousel';
export function ExpandedPropertyCard({ propertyInfo }) {
    //const propertyInfo = location.state;


    return(
        <>
            <div className="expPCard">
                {/* TODO: to be impletement  */}
                <button>Back</button>
                <h1>{propertyInfo.title}</h1>
                <div className="carousel-container">
                    <Carousel
                        data={propertyInfo.images}
                        size={{ width: null, height: null }}
                    />
                </div>
                <span className="rent">${propertyInfo.price}</span>
                <span className="address">{propertyInfo.address}</span>
                <span className="house-type">
                    {propertyInfo.roomType}</span>
                <div><p>{propertyInfo.description}</p></div>
                {/* TODO: need to decide if apply botton should also be here */}

            </div>
            
        </>
        
    );




}

