# boat-app-gui

## Context
Boat-App-Gui, It’s a simple app, where a user can get a quick overview over list of boats

## Demo
#### The following user cases are implemented : 

##### UC1

The user opens your app and gets a login screen. He has to login. After a successful login he is navigated to
the overview page (UC2).
![UC1](demo/UC1.gif)
##### UC2

The user has a list of all boat resources
![UC2](demo/UC2.gif)
##### UC3

The user can add or update or delete boat
###### Add new boat
![UC-3-add](demo/UC3-add.gif)
###### Update boat
![UC3-edit](demo/UC3-edit.gif)
###### Delete boat
![UC3-delete](demo/UC3-delete.gif)
##### UC4

The user clicks on a boat item and gets a detail view over it.
![UC4-demo](demo/UC-4.gif)
##### UC5

Authentication / Authorization (only authenticated user can access to the resources )
![UC5-demo](demo/UC-Authozisation.gif)
## Install boat-app-gui 
Please follow the following steps

1) On the command line
    ```
    git clone https://github.com/Benhamadi-Saad/Boat-App.git
    ```
2) Run build command  
     ```
      yarn build
    ```
   Capture after yarn build
   
   ![Capture after yarn build](demo/Capture_after_yarn_build.PNG)
   
3) Run Boat-App Spring boot 

4) Add public folder in target folder

   ![demo](demo/Capture_add_folder_public_in_Target_folder.PNG)

    5) Copy cotent of [/dist] ( step 1) and paste the content in public folder (step 4)

   ![demo](demo/Capture_after_past_content_of_dist.PNG)
   
 6) Navigate to Boat-App
   
       Visit [http://localhost:8089](http://localhost:8089) in your browser.
       

## Project setup
```
yarn install
```

## Project setup
```
yarn install
```

#### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
### Run test
```
yarn test
```
### Run test with coverage
```
yarn test:coverage
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
