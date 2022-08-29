# What it does
The application enables digital recording of defects found in product inspection process in a manufacturing environment.
It lets us to gather and then anylise all the necessary data created during inspection. It can play a vital role in root cause analysis.

# How it's done

## Backend
### Setting up the project in Django settings.py
Most importantly the app needs static files directory to be set up as since it is a hybrid application it depends on django templates displaing javascript files.
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
"Inspect" is the part where we can put all the data related to inspecting a part: its FG code, description, serial nunber, whether it is fine or what kind of a defect we found. We can also mark the area where the defects where found on a diagram.
"Analyse" module lets us search the database by inspection date, part kind, serial number or defect type.
It also displays defect(s) location(s) on the part diagram.

### "Canvas" Component as a visual representation on the defects
The html "canvas" element is used to serve as a coordinates reference for marking and displaying defects locations.


  
  
