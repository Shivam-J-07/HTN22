# HTN22
## Inspiration
We were inspired by the following Independent [article](https://www.independent.co.uk/climate-change/news/carbon-emissions-dutch-cycling-b2147770.html) which described the environmental benefits of biking, particularly the reduction in carbon emissions by up to **85%**. However, as students, we face many hurdles with using sustainable transportation. There are several roadblocks associated with biking, especially the cost of purchasing and maintaining a bike.  

There are cities, such as Toronto, which implement solutions to such a problem. They have a bicycle-sharing system with over 6850 government owned bicycles and 625 stations. However, implementing such a system in smaller cities such as Waterloo would require an immense amount of time, infrastructure and resources which would be unfeasible. 

This motivated our team to build ReCycle, an app which connects interested bike owners to riders who want to rent a bike.  
## What it does
ReCycle is an app which connects interested bike owners to riders who want to rent a bike. Bike owners can list their bike for rent for a desired time limit and hourly rate whereas riders can view the listings near them to find the bike that best suits their needs.   
Our app is a win-win for both owners and riders, allowing owners to generate over $750 a month and providing riders with access to more convenient, readily accessible transportation.  

## How we built it
For the front-end component of the website, we created our web-app pages in React and used HTML5 with CSS3 to style the site. We used the Google Maps API to generate a map with markers, directions, and other functionality. 
The backend was built using the Flask framework. We used a cockroachdb database to store and access user-specific and bike-specific information. 
The product also comes with a hardware component to alert cyclers when they need to return a bike. It was built using Arduino Uno and Active Buzzer.

![Hardware Setup](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/226/362/datas/original.jpeg)
![Find a Bike](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/226/390/datas/gallery.jpg)

## How you can build it!
Prereqs: npm, flask, cockroachdb access, socket.io
1. navigate to the client folder for the frontend set up
    <pre><code>npm install
    </code></pre>
    <pre><code>npm run start
    </code></pre>

2. hardware: Arduino Uno, breadboard, LED, resistors, active buzzer
## Links
[Devpost](https://devpost.com/software/recycle-9eu6j0)

[Inspiration](https://www.independent.co.uk/climate-change/news/carbon-emissions-dutch-cycling-b2147770.html)
