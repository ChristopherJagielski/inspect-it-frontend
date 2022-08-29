# What it does
The application enables digital recording of defects found in product inspection process in a manufacturing environment.
It lets us to gather and then anylise all the necessary data created during inspection. It can play a vital role in root cause analysis.

# How it's done

## Backend
### Setting up the project in Django settings.py
Most importantly the app needs static files directory to be set up as since it is a hybrid appliction it depends on django templates displaing javascript files.
### Creating Django models
To interact with the database we have created three models: 
- Part - Describes the item being inspected
- PartInstanse - Describes an instance of the part being inspected, the serial number and status: "OK", "REWORK", "QUARANTINE", "SCRAP". A part can have many part instances.
- Defect - Describes all the defects found during inspection, the kind and location coordinates in reletion to a diagram displayed by the canvas element. A part instance can have many defects.
### Creating API Serializers with Restframework
All Models turned into Serializers so the API module can respond with sending JSON data
### Creating a Router for URL routes
Managing the app endpoints


## Frontend
### Creating a new React application
Using the famous npx create-react-app
### Setting up a JavaScript pipeline with Webpack and Babel
Webpack and Babel let us comipling ready to use js file
### Spitting application into data entry and data anylising modules

### <Canvas/> Component as a visual representation on the defects
### Retrieving and saving data with axios()


