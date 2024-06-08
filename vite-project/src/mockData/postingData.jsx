// TODO: temp data to populate react components. Need to replace later.

const slides = [
  {
    src: 'https://www.apartments.com/blog/sites/default/files/styles/x_large/public/image/2023-06/ParkLine-apartment-in-Miami-FL.jpg.webp?itok=lYDRCGzC',
    alt: 'Image 1 for carousel',
  },
  {
    src: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/wp-content/uploads/2022/10/condo-vs-apartment.jpeg.jpg',
    alt: 'Image 2 for carousel',
  },
  {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZrCV9ggiDvDrsz1oG6EcIA_LME3EUZbLOA&s',
    alt: 'Image 3 for carousel',
  },
]

const applicant1 = {
  name: 'John Doe',
  image:
    'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
  phoneNumber: '555-123-4567',
  email: 'john.doe@example.com',
  gender: 'male',
  age: '30',
  familySize: 2,
  occupation: 'Software Engineer',
  lengthOfLease: 'Sept 2024 to Dec 2024',
  earlyBirdNightOut: 'Early bird',
  financialSituation: 'Stable income, good credit',
}

const applicant2 = {
  name: 'Jane Smith',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXGPVZv-HQ-CYzQzs-TM4aSh3ICOGVlakbmA&s',
  phoneNumber: '555-987-6543',
  email: 'jane.smith@example.com',
  gender: 'Female',
  age: '51',
  familySize: 3,
  occupation: 'Marketing Manager',
  lengthOfLease: 'Jan 2025 to Dec 2025',
  earlyBirdNightOut: 'Night out',
  financialSituation: 'Stable income, excellent credit',
}

const applicant3 = {
  name: 'Sam Wilson',
  image:
    'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?cs=srgb&dl=pexels-simon-robben-55958-614810.jpg&fm=jpg',
  phoneNumber: '555-111-2222',
  email: 'sam.wilson@example.com',
  gender: 'Male',
  age: '26',
  familySize: 3,
  occupation: 'Teacher',
  lengthOfLease: 'Nov 2024 to Apr 2026',
  earlyBirdNightOut: 'Early bird',
  financialSituation: 'Stable income, fair credit',
}

const applicant4 = {
  name: 'Emily Jones',
  image:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO2vBQ1vOla9pPM6M0ZsYZb7OckCS21cgN_Q&s',
  phoneNumber: '555-333-4444',
  email: 'emily.jones@example.com',
  age: '21',
  familySize: 4,
  gender: 'Female',
  occupation: 'Accountant',
  lengthOfLease: 'Dec 2024 Onwards',
  earlyBirdNightOut: 'Night out',
  financialSituation: 'Stable income, good credit',
}

export const house1 = {
  houseID: 1,
  images: slides,
  address: '123 Main St, Anytown, USA',
  price: '$2000 per month',
  description:
    "Welcome to our cozy family home nestled in a serene suburban neighborhood. This spacious and inviting house boasts 3 bedrooms and 2 bathrooms, providing ample space for comfortable living. Step into the modern kitchen, equipped with sleek stainless steel appliances, perfect for culinary enthusiasts and family gatherings. The heart of the home is the living room, adorned with a charming fireplace, creating a warm and inviting atmosphere. From here, step outside to the expansive backyard, an ideal spot for outdoor gatherings, barbecues, and relaxation under the open sky. The master bedroom is a sanctuary, complete with an ensuite bathroom for added privacy and convenience. You'll love the luxury of a walk-in closet, offering ample storage space for your wardrobe and belongings. The two additional bedrooms are versatile spaces, perfect for accommodating a home office, guest rooms, or creative hobbies. Parking is a breeze with a 2-car garage and plenty of space in the driveway for additional vehicles. This home is pet-friendly, allowing your furry companions to enjoy the spacious surroundings. Convenience is key, with easy access to nearby parks for outdoor recreation, top-rated schools for educational opportunities, and bustling shopping centers for all your retail needs. Experience the comfort and charm of suburban living at its finest in this inviting family home.",
  title: 'Cozy Family Home For Rent',
  roomType: '3Bed-2Bath',
  location: 'Suburban neighborhood in Burnaby',
  parkingAvailability: '2 car garage',
}

export const postingData = {
  house: house1,
  applicants: [applicant1, applicant2, applicant3, applicant4],
}

export const propertyList = {
  propertys: [
    {
      houseID: 1,
      images: slides,
      address: '3rd Floor',
      price: 9864,
      description:
        'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
      title: 'Hoard',
      roomType: 'Chrysler',
      location: 'Launceston',
      parkingAvailability: 2,
    },
    {
      houseID: 2,
      images: slides,
      address: 'Apt 569',
      price: 5875,
      description:
        'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.',
      title: 'Arkansas',
      roomType: 'Mitsubishi',
      location: 'Misheronskiy',
      parkingAvailability: 3,
    },
    {
      houseID: 3,
      images: slides,
      address: 'Room 500',
      price: 984,
      description:
        'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.',
      title: 'Hovde',
      roomType: 'Suzuki',
      location: 'Quivilla',
      parkingAvailability: 1,
    },
    {
      houseID: 4,
      images: slides,
      address: '19th Floor',
      price: 4768,
      description:
        'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.',
      title: 'Spaight',
      roomType: 'Mitsubishi',
      location: 'Bitanjuan',
      parkingAvailability: 1,
    },
    {
      houseID: 5,
      images: slides,
      address: 'Apt 33',
      price: 2326,
      description:
        'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.',
      title: 'Tomscot',
      roomType: 'GMC',
      location: 'Polo',
      parkingAvailability: 9,
    },
  ],
}
