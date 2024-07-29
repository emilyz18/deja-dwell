# Group 15 - Deja

![CI](https://github.com/ubc-cpsc455-2024S/project-15_deja/actions/workflows/ci.yml/badge.svg)

## Project Description
Our project is a platform designed for tenants and landlords to facilitate finding rental accommodations. It would allow tenants to post their profile data and preferences while enabling landlords to post details of their units. Users can access and review the opposing party’s profiles, and perform matching similar to the iconic dating platform, Tinder. Additional functionality, such as on-demand feedback and allowing landlords to post multiple properties, can be incorporated based on time constraints.

## Team Members
- Derek: one sentence about you!
- Emily: Hi, I am a 4th year computer science student. I like to draw and play chess.
- Jackson: Hello, I am a 4th year comp-sci student. I like being on airplanes and I'm scared of big bodies of water.
- Xinyue: Hi. I am a 4th year computer science student. I love coffee.

## Minimal Requirements
1. [x] Create/modify a user profile (user information and housing preference)
    - Each user can have one of:
        - Landlord account
        - Tenant account
    - ~~Functionality to swap between the two accounts (only if the user has both accounts, i.e. no option to swap if the user has 1 account only)~~
    - We no longer support a user having both a landlord and tenant account because it is not a useful use-case
2. [X] Matching
    - Stable matching algorithm between tenant property preference and property, tailored to our data
    - Display matching score between user preference & housing post on both the landlord and tenant’s dashboard (only shows in console log)
3. [X] Dashboard
    - Landlord: Display list of applicants
        - Profile picture
        - Name
        - Age
        - Occupation
        - Length of lease
    - Tenant: Display matching property posts in card format
        - Image of the property
        - Address
        - Price
        - Property properties

## Standard Requirements
1. [X] User Login page
    - Allows user to store data in their account
    - User can log in and log out
2. [X] Application status
    - For Tenant account: Store history of applied post 
    - For the landlord: Store history of matched applicants(Tenants) along with their applied post
3. [X] Two types of rent match:
   - tight match (search bar)
   - loose match (profile/preference match by system)
4. [X] Make the matching algorithm more robust
    - Add weightings to scores 
    - ~~Add additional sorting for the list of applicants (tenant profile <-> landlord preference matching)~~
    - NOTE: Matching is dependent on the property properties and tenant preferences only
5. [X] For landlord account:  A Landlord dashboard page that shows the current list of applicants with accept/reject buttons for each applicant.
    - the landlord will reach out to the list of tenants matched by the system  (externally, interview/in-person house tour), once the landlord and tenant sign the contract (externally), the landlord will press accept and other tenants on the list will be automatically rejected.
    - Landlord will only see contact info of tenant after they apply, tenant will only see landlord's contact info after they apply 

## Stretch Requirements
1. [ ] On-demand feedback
    - As the user looks through options we ask them why they did not choose this specific option
2. [ ] Profile reviews of the tenant/landlord profiles, from a rating between 1 - 5
3. [ ] Preference updating based on swap and feedback demand
4. [X] Actual swiping of each selection
5. [ ] Allow the landlord to list multiple properties
6. [X] Map API integration to mark property location on map
7. [ ] Once matched, enable the landlord and tenant to interact
    - Chat message
    - Contact exchange
    - Interview process

## Breakdown of Minimal Requirements
1. User profile (landlord/tenant) 
    - Frontend display (forms, dashboards)
        - React routes
        - React components
    - Backend logic
    - Design data persistence structure/method 
    - Able to parse/query/update input data 
2. Matching algorithm
    - Generate mock data to run the algorithm on
    - Create algorithm
    - Run algorithm for user x, return all the matches (prob through console print)

## Prototype Sketches
#### Tenant Dashboard
<img src ="images/prototypeSketches/TenantDashboard.png" width=700>

#### Tenant Profile
<img src ="images/prototypeSketches/TenantProfile.png" width=700>

#### Landlord Dashboard
<img src ="images/prototypeSketches/LandlordDashboard.png" width=700>

## References

{Add your stuff here}



