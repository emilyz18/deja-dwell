// TODO: temp data to populate react components. Need to replace later.

const slides = [
  {
    src: "https://www.apartments.com/blog/sites/default/files/styles/x_large/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=lYDRCGzC",
    alt: "Image 1 for carousel",
  },
  {
    src: "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg",
    alt: "Image 2 for carousel",
  },
  {
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZrCV9ggiDvDrsz1oG6EcIA_LME3EUZbLOA&s",
    alt: "Image 3 for carousel",
  },
];

const applicant1 = {
  name: "John Doe",
  image: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
  contactInformation: {
    phoneNumber: "555-123-4567",
    email: "john.doe@example.com",
  },
  gender: "male",
  age: "30",
  occupation: "Software Engineer",
  earlyBirdNightOut: "Early bird",
  financialSituation: "Stable income, good credit",
};

const applicant2 = {
    name: "Jane Smith",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXGPVZv-HQ-CYzQzs-TM4aSh3ICOGVlakbmA&s", 
  contactInformation: {
    phoneNumber: "555-987-6543",
    email: "jane.smith@example.com",
  },
  gender: "Female",
  age: "51",
  occupation: "Marketing Manager",
  earlyBirdNightOut: "Night out",
  financialSituation: "Stable income, excellent credit",
};

const applicant3 = {
    name: "Sam Wilson",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg",
  contactInformation: {
    phoneNumber: "555-111-2222",
    email: "sam.wilson@example.com",
  },
  gender: "Male",
  age: "26",
  occupation: "Teacher",
  earlyBirdNightOut: "Early bird",
  financialSituation: "Stable income, fair credit",
};

const applicant4 = {
    name: "Emily Jones",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2vBQ1vOla9pPM6M0ZsYZb7OckCS21cgN_Q&s",
  contactInformation: {
    phoneNumber: "555-333-4444",
    email: "emily.jones@example.com",
  },
  age: "21",
  gender: "Female",
  occupation: "Accountant",
  earlyBirdNightOut: "Night out",
  financialSituation: "Stable income, good credit",
};

export const postingData = {
  house: {
    images: slides,
    address: "123 Main St, Anytown, USA",
    price: "$2000 per month",
    description:
      "Welcome to our cozy family home nestled in a serene suburban neighborhood. This spacious and inviting house boasts 3 bedrooms and 2 bathrooms, providing ample space for comfortable living. Step into the modern kitchen, equipped with sleek stainless steel appliances, perfect for culinary enthusiasts and family gatherings. The heart of the home is the living room, adorned with a charming fireplace, creating a warm and inviting atmosphere. From here, step outside to the expansive backyard, an ideal spot for outdoor gatherings, barbecues, and relaxation under the open sky. The master bedroom is a sanctuary, complete with an ensuite bathroom for added privacy and convenience. You'll love the luxury of a walk-in closet, offering ample storage space for your wardrobe and belongings. The two additional bedrooms are versatile spaces, perfect for accommodating a home office, guest rooms, or creative hobbies. Parking is a breeze with a 2-car garage and plenty of space in the driveway for additional vehicles. This home is pet-friendly, allowing your furry companions to enjoy the spacious surroundings. Convenience is key, with easy access to nearby parks for outdoor recreation, top-rated schools for educational opportunities, and bustling shopping centers for all your retail needs. Experience the comfort and charm of suburban living at its finest in this inviting family home.",
    title: "Cozy Family Home For Rent",
    roomType: "3 bedrooms, 2 bathrooms",
    location: "Suburban neighborhood in Burnaby",
    parkingAvailability: "2 car garage",
  },
  applicants: [applicant1, applicant2, applicant3, applicant4],
};
