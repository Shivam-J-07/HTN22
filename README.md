# HTN22
## Inspiration
Biking everyday and reduce carbon emissions by **85%**. However, as students, we face many hurdles with using sustainable transportation. There are several roadblocks associated with biking, especially the cost of purchasing and maintaining a bike.  

There are cities, such as Toronto, which implement solutions to such a problem. They have a bicycle-sharing system with over 6850 government owned bicycles and 625 stations. However, implementing such a system in smaller cities such as Waterloo would require an immense amount of time, infrastructure and resources which would be unfeasible. 

This motivated our team to build ReCycle, an app which connects interested bike owners to riders who want to rent a bike.  
## What it does
ReCycle is an app which connects interested bike owners to riders who want to rent a bike. Bike owners can list their bike for rent for a desired time limit and hourly rate whereas riders can view the listings near them to find the bike that best suits their needs.   
Our app is a win-win for both owners and riders, allowing owners to generate over $750 a month and providing riders with access to more convenient, readily accessible transportation.  


## How we built it
For the front-end component of the website, we created our web-app pages in React and used HTML5 with CSS3 to style the site. We used the Google Maps API to generate a map with markers, directions, and other functionality. 
We built the backend using the Flask framework. 
The backend was built using the Flask framework. We used a cockroachdb database to store and access user-specific and bike-specific information. 
The product also comes with a hardware component to alert cyclers when they need to return a bike. It was built using Arduino Uno and Active Buzzer.

## Challenges we ran into
None of us had ever used the Google Maps API before, especially not with React. We ran into a number of dependency conflicts and other issues which took a considerable amount of time to debug. We also had never worked with CockroachDB before.

## Accomplishments that we're proud of
We're proud of learning about new technologies from Hack the North's sponsors such as CockroachDB. We’re also proud of being able to integrate multiple components of a large project including the frontend, database, and hardware.

## What's next for ReCycle
We plan to expand our app to support mobile platforms as well. We hope to support our users further by giving information about bike trails and allowing in-app transactions.

![Image 1](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/226/362/datas/original.jpeg)

## Links
[Devpost](https://devpost.com/software/recycle-9eu6j0)
[Inspiration](https://www.independent.co.uk/climate-change/news/carbon-emissions-dutch-cycling-b2147770.html)
