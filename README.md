# Main funcionality of the project

The aim of this project is to build a full stack web application with CRUD funcionality working with the MERN stack.

To use these technologies, we created and brought to life an application to promote a more sustainable lifestyle and encourage people to reuse and recycle. EcoUpper is also a platform where users can be informed and share their awareness about sustainability and climate change while creating a new community.

# Draw funcionality

The wireframe can be found here: https://www.figma.com/file/Sr6dQwIW0fucuThFdpP97P/EcoUpper-Project?type=design&node-id=0-1&mode=design&t=4VWL2dxa6wnC4dgB-0

## Table example
| Page | Description | Components |
| ---- | ---         | ---------- | 
| App.jsx | Is where the pages and routes are imported| Navbar.jsx, Footer.jsx |
| HomePage.jsx | It displays the news from the API, the different pages linked in the Navbar and the Footer with the _About us_ page also linked| NewsCard.jsx, NewsList.jsx |
| MarketPage.jsx | It displays the items list created by the users and allow the user to filter by type of product and key words | NewItem.jsx, ItemsList.jsx, ItemCard.jsx | 
| ItemDetailsPage.jsx | It displays all the item's details and let the user create a proposal to reserve it | ModifyItem.jsx, NewProposal.jsx, ProposalCard.jsx | 
| EventsPage.jsx | It displays all the events listed by date and allow the user to filter them by month and key words | NewEvents.jsx, EventList.jsx, EventCard.jsx | 
| EventDetailsPage.jsx | It displays all the information needed to attend the event | 
| PostPage.jsx | It displays all the posts shared by the users in order from the newest to the oldest and also displays the form to create a new one| NewPost.jsx, PostCard.jsx | 
| SignupPage.jsx | This page allows submitting user data, such as username, email, password and picture| 
| LoginPage.jsx | This page allows users to enter their login credentials |  
| ProfilePage.jsx | It displays all the user data: user details and allows to edit them or detele them. Also displays all the data uploaded by the user as items, created events, propostals and posts| UserCard.jsx, ModifyUser.jsx, ProposalCard.jsx, ItemCard.jsx, EventCard.jsx, PostCard.jsx | 
| AboutPage.jsx | It displays the main purpose of EcoUpper and team information | 
| NotFoundPage.jsx | It displays a button to redirect the user to the Homepage | 

<!-- ## Components table example
| Components | Components Description |
| ---------- | ---------------------  |
| NewsCard.jsx | DESCRIPTION |
| NewsList.jsx | DESCRIPTION |
| NewItem.jsx | DESCRIPTION |
| ItemsList.jsx | DESCRIPTION |
| ItemCard.jsx | DESCRIPTION |
| ModifyItem.jsx | DESCRIPTION |
| NewEvents.jsx | DESCRIPTION |
| EventList.jsx | DESCRIPTION |
| EventCard.jsx | DESCRIPTION |
| NewPost.jsx | DESCRIPTION |
| PostCard.jsx | DESCRIPTION |
| UserCard.jsx | DESCRIPTION |
| ModifyUser.jsx | DESCRIPTION |
| NewProposal.jsx | DESCRIPTION |
|ProposalCard.jsx | DESCRIPTION |
| Navbar.jsx | DESCRIPTION |
| Footer.jsx | DESCRIPTION |
| Loading.jsx | DESCRIPTION |
| IsAnon.jsx | DESCRIPTION |
| IsPrivate.jsx | DESCRIPTION | -->

## How the platform works
The differents pages are created thinking in the user experience, giving the web the same format.
The stucture in all of them, allows the user to  understand the platform quickly and navigate trough it softly, as the mecanism works in all of the pages the same way: the user gets the upload data updated by date and the option to create new thanks to a simple forms which are dispalyed in a pop up. 
There is also a filtering system to help the user find their needs and in the user profile their will find all the interactions made on the page organized.

# 

The project is presented by four full-stack developer students from Ironhack: Edna, Erik, JuanDa, and Óscar. This project was built from scratch.We used React as the foundational backend framework and Mongoose for modeling and database communication. The project incorporates five models that are equipped with validation and user feedback for invalid submissions.

We also created our own db to get the news from two differents newspapaers. (completar)

Furthermore, this website encompasses sign-up, log-in, and log-out functionality, featuring encrypted passwords and/or social logins. We have successfully implemented all CRUD (Create, Read, Update, Delete) actions for models.The project also employs a responsive design to optimize user experience.

## Access to the website: (put link here)
