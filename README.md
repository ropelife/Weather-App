# Weather App - 3-Tier Architecture

## Requirement: 
Develop a weather application that takes a city as input and displays the weather, utilizing a 3-tier web application architecture. The project should showcase your proficiency in Docker, Kubernetes, and Infrastructure as Code (IaC).

## Architecture:

1) Frontend: I have used React.js to create the frontend. When we start the application, we are routed to a web page which display a search box in a card which allows user to enter a city they want to search the weather.
The application dynamically renders all the information it acquires giving a clean interface.
When a user provides a city name and click on seach icon, an API call is made to the next stage of out architecture which is the backend. Also, added a functionality where weather icon changes according to the weather condition. 

2) Backend: Developed by setting up Node.js server using Express. The application is hosted on a designated port. The backend has a single API exposed which accepts input as city name from the frontend and checks if data is already cached in the database by making a API call to our database server. If the data for that city is present, we return the cached data else we have another feature implemented which will hit the OpenWeatherAPI (open-source API to get weather data) and return the weather data to the user and simultaneously cache it there by implementing "Cache-Aside Caching".

3) Database: I am using MongoDB Atlas for storing the data as we can easilty connect to the mongoDB atlas clusters. Also, it has a higher response time than any RDBMS. For connectivity pursposes, I have passed the connectivity credentials thorugh a .env file.

## Containerization

For containerization, I have used docker desktop to create a container image locally which can be used to deploy to a cloud. 

Steps taken to containerize the application,
1) Download Docker Desktop on your local machine using https://www.docker.com/products/docker-desktop/
2) Create Docker files for each component as mentioned below,
   - Frontend: https://github.com/ropelife/Weather-App/blob/main/weather-app/Dockerfile
   - Backend: https://github.com/ropelife/Weather-App/blob/main/weather-backend/Dockerfile
   - Database: https://github.com/ropelife/Weather-App/blob/main/weather-db/Dockerfile

Now, create a docker-compose.yml(https://github.com/ropelife/Weather-App/blob/main/docker-compose.yml) file which orchestrates the three services and ensures they can communicate with each other. Place this at the root of your project.

Once we set this up, we need to run the below command to start our web application locally,
`docker-compose up --build` and can be accessed using https://localhost:3000

Steps taken to deply on Google Cloud Platform,
1) Login into GCP console, create a new project and create a new Compute Engine instance.
2) Open the SSH within the instance and install git using the command, `sudo apt-get install git -y`
3) Create a directory and clone your remote repository with the instance.
4) Install Docker and Docker Compose on the VM
    Run the following command to install Docker: `sudo apt-get install apt-transport-https ca-certificates curl software-properties-common -y && curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null && sudo apt-get update && sudo apt-get install docker-ce docker-ce-cli containerd.io -y`
   To install docker compose run, `sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | jq -r .tag_name)/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose`
5) Start the application using, `sudo docker-compose up -d`, the application will be live and can be accessed from anywhere using http://<Instance's External_IP>:3000/

Currently, the application is hosted on the following URL, http://34.70.146.172:3000/ 

## Future Scope:
Due to limited time frame, there were many features that I wanted to implement, some of which are listed below,

1) Cache Expiry time: Deleting cached data from the database which has exceeded resting time period e.g min, hour, etc. as temperature keeps changing frequently.
2) Favorite Locations: Allow users to save locations for easy and personalized access.
3) Recent Searches: Displaying data for recent searches in a seperate tab.
4) Integrating kubernetes in the application for smooth deployment.
5) Expanding the web app to show weather forecast for a day.













