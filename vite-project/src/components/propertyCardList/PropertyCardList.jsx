import React, { useState } from 'react';
import "./PropertyCardList.css";
import MiniPropertyCard from '../miniPropertyCard/MiniPropertyCard';
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard';

function PropertyCardList(props) {
    const { propList } = props;
    const [properties, setProperties] = useState(propList);

    // TODO: to be implemented logic
    const likedProperty = (id) => {
        const updatedProperties = properties.filter(property => property.houseID !== id);
        setProperties(updatedProperties);
        console.log(properties);
    }
    // TODO: to be implemented logic
    const dislikedProperty = (id) => {
        const updatedProperties = properties.filter(property => property.houseID !== id);
        setProperties(updatedProperties);
        console.log(properties);
    }

    return (
        <>
            <ul id="property-list" className="property-list">
                {properties.map((property,index) => (
                    <>
                        <MiniPropertyCard
                            key={index}
                            propertyInfo={property}
                            likedFn={likedProperty}
                            dislikedFn={dislikedProperty}
                        />
                        {/* uncomment follow to view the cord */}
                        <ExpandedPropertyCard propertyInfo={property} />
                    </>
                ))}
            </ul>
        </>
    );
}

export default PropertyCardList;