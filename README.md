# How to run
npm start

# Development Approach
Used CRA to generate a basic react app added required dependencies such as redux
Used React Bootstrap - I have previosuly worked with MUI and ANTD so wanted to try some new UI library for this project hence used react bootstrap. But Ideally if we want a scalable application which using tables extensively the best bet would be using MUI since it has extensive support for tables.
Used customHooks -  Seperates out the business logic from the JSX - hence results in cleaner looking code.
Sorted Imports -  for code redability maintained similar order for imports throughout the repo
Optimised Code - Used Arrays or Objects as per the problem statement -> ( for optimisation )
Extensive Use of store - I have made extensive use of store for rendeing of components -  since APIs are involved and similar state variables are being used at multiple places, I wanted to have one source of truth and hence chose to use redux store for stroing all required data.

# Folder Structure 
assets - consists of svgs --> created as components to increase reusability
components - all the components go here. I would have used atomic design here if there were more components. In atomic design structure we have atoms, molecules, organisms ad templates, but since this is a minor project I had all the components in the same folder
pages - consists of homepage
redux - store and actions are handles here
utils - constis of utils and helper functions
constants.js -  all constants go here

# Additional Features Implemented
I have also implemented the price change functionality on the cryptoTable component - uncomment line 16 and 68 in the cryptoTable.tsx to see the magic. I have commented this code out on purpose since we have bookmarks in the same page and the price fluctuation at two places results in bad user experience.
Little svg next to the price in the card inidcating the price raise or fall

# Challenges
React Bootstrap -  Since I was working with it for the first time I had to parallely go through docs to get a goos undertanding of bootstrap
Data structure to use for optimised implimentation - I've processed and structured the data in a way that makes it more convenient for reuse within the Redux state. This format allows for easier rendering when working with the component.



