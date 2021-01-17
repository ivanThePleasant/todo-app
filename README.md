Todo Application 
-----

# Simple and Elegant Todo app built with React

This simple app allows you to track all your todo's. You can add new todo's, mark them as done or important. There is a handy functionality that shows you how many todo's are done and how many more are there to do. App allows you to search through your list of todo's and filter the, by active or done status.

You can see this app running here:

https://ambi-todo-app.herokuapp.com/

!! IMPORTANT !!

This app's code is not connected to any database, so any changes will be deleted when the page refreshes.

### This app is built with React and Bootstrap

Core principles:

1. Application starts in src/index.js file by rendering App component to the screen
2. App component is the master component, it keeps track of all the state changes throughout the applications such as adding new todo, deleting existing todo, marking entries as done or important
3. Each component has it's own folder, each folder had a component file, a .css file to keep styles for the component and index file in order to make Webpack import files by directory
4. Search function returns a filtered array as you type and not on submit
