# GHSeportfolio
This is the repo for GHS eportfolio, Unimelb, COMP30022 IT Project

## website link
Temporary website http://47.115.90.152:3000/
Final website (still applying) 


## Features 
Sprint 1
1. Register

New users could register with an identical username, identical email address and a password. If the username or email address has existed, there will be a warning that tells the user to use another username or email address.

  1. email validation
  
Before registering, the user should enter his email address. He would receive a verification code sent by our official email address. The user needs to enter the correct verification code to register successfully.
 1.2 doublecheck password
User should enter his password twice. If the two passwords are different, there will be a warning that tells the user to check the passwords he entered.
 2. login
Users could log in to an existing account. If the login information he entered is incorrect, a warning will raise on screen.
 3. reset password
User can reset his password after logging in. User needs to enter his new password twice. If the two passwords are different, there will be a warning that tells the user to check the passwords he entered. The new password needs to be different from the old one or a warning will raise.
 4. profile page
After login, the user will jump to the profile page, where he can choose to edit eportfolio, view eportfolio and view others eportfolio. Users can also manipulate the account in the profile page such as reset password and logout.
 5. logout
If the user does not log out, the account will remain logged in. When the user logs out successfully, it will jump to the login page.
 6. edit your eportfolio
There are several “Sections” under the user's eportfolio and several “Modules” under each “Section”. Users can add, delete and edit “Sections” and the “Modules” in the section.
 6.1 add Section
Add a new empty “Section” with name “new section”
 6.2 delete Section
Delete one specific section
 6.3 edit Section
User can change the name of “Section”, add or delete the modules in that section
 6.4 add Module
Add a new empty “Module” with the name “new module” in one section.
 6.5 delete Module
Delete one specific module in one section
 6.6 edit Module
Each “Module” has a module title, time, textbox, image, file, audio and video. These contents are all optional and users are not required to complete all of them. Users can edit (including delete) all of them. 
 6.6.1 store text
Users can edit text in a module, including editing the text format such as bold, italic, and creating lists or tables.
 6.6.2 store images
Users could upload an image. If an image already exists, the new image will replace the old one (i.e. only one image is allowed in each module). Users can also delete the existing image. There is a preview of that image. Files, audios and videos are stored and manipulated the same as images.
 Sprint 2
 6.6.3 store files
Same as above (store images)
 6.6.4 store audios
Same as above (store images)
 6.6.5 store videos
Same as above (store images)
 7. view your eportfolio
Show all sections (one section at a time, but users could switch using the navbar) and the modules in each section.
 7.1 download content
Users can download all the images, files, audios and videos.
 7.2 different layout
The layout of content in each “Module” will vary depending on the content. For example, if a “Module” only has an image, then this image will be centered.
 8. view others’ eportfolio
Users could select and view other users’ eportfolios. (Viewing modes are the same as themselves.)
 8.1 user list
There is a list that contains 10 random users from the database. If the total number of users is less than 10, the list will contain all the users. One user can see the “username” and “number of sections” of other users in the list. He can choose a user and view his eportfolio. Users can also grab another 10 random users again by clicking the button.
 8.2 search another user
Users can search for other users by username. Then he can view that user’s eportfolio.
 9. forget password
The user can reset his password through the username and email address if he forgets his password. Firstly, the user enters his username. Then the office mailbox will send a verification code to the user’s mailbox. User needs to enter that verification code and a new password twice. If the verification code is correct and the two passwords entered are the same, the password is reset successfully. The new password needs to be different from the old one or a warning will raise.
 10. generate URL
Get the URL of the user's eportfolio and automatically save to the clipboard.
 11. default eportfolio 
There are four default “Sections” in a new user’s eportfolio which are “about me”, “contact me”, “education background” and “internship experience”. Each of these “Sections” has a default “Module” with some default content. 


## Changelog
Feature Implementation/Bugfix [Branch]

Sprint 2

- All features polish [feature-polish]

- Feature development from user story 9: Login register with email validation [login-register-all]

- Feature development from user story 1: user could view other eportfolios [view-other-eportfolio] 

- Feature development from user story 4: user could upload, download their videos and audios [edit-eportfolio] 

Sprint 1

- Feature development from user story 9: user could reset their password [reset-password] 

- Feature development from user story 11: user could generate a link of their eportfolio [view-eportfolio]

- Feature development from user story 2: user could view their own eportfolio [view-eportfolio]

- Feature development from user story 8: user could use navigation bar to navigate sections [section-navbar]

- Edit eportfolio bug fix [edit-eportfolio-fix]

- Database migration [database]

- Feature development from user story 3,5,6,7,10,12,13: user could view their own eportfolio, upload/download various files, edit text information [edit-eportfolio] [upload-images] [edit-eportfolio-api]

- Login register bug fix [login-register-v3] 

- Login register bug fix [login-register-v2]

- Feature development from user story 9: user could login and register [login-register-react] 

- Create the database for storing eportfolio and users info [database]

## React test cases

- Logout: Simulate clicking the logout button on the profile page, expecting the program will jump to the login page.

- In Profile page, click different buttons to jump to different pages: Simulate clicking the first button, i.e. view own eportfolio, expecting jump to view own eportfolio page
Simulate clicking the second button, i.e. edit eportfolio, expecting jump to edit eportfolio page
Simulate clicking the third button, i.e. view other eportfolios, expecting jump to view other eportfolios page

- Index page/home page: Simulate clicking the login button, expecting the program will jump to the login page.
Simulate clicking the register button, expecting the program will jump to the register page.
Check page render correctly.

- Login: Fill the login form with incomplete information (3 scenarios: missing username, missing password, missing username and password), expecting the program will give a warning.
Simulate clicking the register button, expecting the program will jump to the register page.
Simulate clicking the forget password button, expecting the program will jump to the forget password page.
Simulate clicking the back to index button, expecting the program will jump to the index page.

- Register: Fill the register form with incomplete information (4 scenarios: missing username, missing password, missing email address and incompatible passwords), expecting the program will give a warning.
Simulate clicking the index button, expecting the program will jump to the index page.

- Module: With provided json code, the module could store them, render the page correctly and the buttons can work as expected.

- Section: With provided json code, the section could store them and render the page correctly.
