import React from "react";
import AddressInterface from "../../interfaces/AddressInterface";

interface LocationMapProps {
  address: AddressInterface;
}

const LocationMap: React.FC<LocationMapProps> = ({ address }) => {
  // Function to generate the map URL based on the address
  const generateMapUrl = (address: AddressInterface): string => {
    const { houseNumber, street, city, country } = address;
    const encodedAddress = encodeURIComponent(
      `${houseNumber} ${street} ${city} ${country}`
    );
    return `https://maps.google.com/maps?q=${encodedAddress}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div>
      <iframe
        title="Location Map"
        width="100%"
        height="450"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin"
        src={generateMapUrl(address)}
      ></iframe>
    </div>
  );
};

export default LocationMap;
