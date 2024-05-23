# Group 15 - Deja

## Project Description
Our project is a platform designed for tenants and landlords to facilitate finding rental accommodations. It would allow tenants to post their profile data and preferences while enabling landlords to post details of their units. Users can access and review the opposing party’s profiles, and perform matching similar to the iconic dating platform, Tinder. Additional functionality, such as on-demand feedback and allowing landlords to post multiple properties, can be incorporated based on time constraints.

## Team Members
- Derek: one sentence about you!
- Emily: one sentence about you!
- Jackson: one sentence about you!
- Ashley: one sentence about you!

## Minimal Requirements
1. Create/modify a user profile (user information and housing preference)
    - Each user can have one of:
        - Landlord account
        - Tenant account
    - Functionality to swap between the two accounts (only if the user has both accounts, i.e. no option to swap if the user has 1 account only)
2. Matching
    - Stable matching algorithm between tenant property preference and property, tailored to our data
    - Display matching score between user preference & housing post on both the landlord and tenant’s dashboard (only shows in console log)
3. Dashboard
    - Landlord: Display list of applicants
        - Profile picture
        - Name
        - Age
        - Occupation
        - Length of lease
    - Tenant: Display matching property posts in cards format
        - Image of property
        - Address
        - Price
        - Property properties

## Standard Requirements
1. User Login page
    - Allows user to store data in their account
    - User can log in and log out
2. Application status
    - For Tenant account: Store history of applied post 
    - For the landlord: Store history of matched applicants(Tenants) along with their applied post
3. Two types of rent match (tigh match (search bar) and loose match (profile/preference match by system))
4. Make the matching algorithm more robust
    - Add weightings to scores 
    - Add additional sorting for list of applicants ( tenant profile <-> landlord preference matching)
5. For landlord account:  A Landlord dashboard page that shows the current list of applicants with accept/reject buttons for each applicant.
    - the landlord will reach out to the list of tenants matched by the system  (externally, interview/in person house tour), once the landlord and tenant sign the contract (externally), the landlord will press accept and other tenants on the list will be automatically rejected.
    - Landlord will only see contact info of tenant after they apply, tenant will only see landlord contact info after they apply 

## Stretch Requirements
1. On-demand feedback
    - As the user looks through options we ask them why they did not choose this specific option
2. Profile reviews of the tenant/landlord profiles, from a rating between 1 - 5
3. Preference updating based on swap and feedback demand
4. Actual swiping of each selection
5. Allow the landlord to list multiple properties
6. Once match, enable landlord and tenant to interact
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



