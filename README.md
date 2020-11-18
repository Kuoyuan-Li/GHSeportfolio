# GHSeportfolio
This is the repo for GHS eportfolio, Unimelb, COMP30022 IT Project

## Product overview

This product is a web application, which builds a personal ePortfolio system that provides a custom platform for users to collect and display electronic evidences. Each user can be regarded as the owner of a digital portfolio where he can express himself by stating his stories and showing his achievements. In this web application, the account holder can customize the layouts and contents in the ePortfolio according to his own need and make it as a reflection on his personal abilities. To support user’s statements, the system accepts electronic evidences including input texts as the descriptions of the models and media files as further demonstration of the topics. Users can add electronic evidences by editing texts and uploading files whenever they want so that the ePortfolio can be a long-term record of user’s experiences. For the purpose of learning from other user’s ePortfolio or introducing the user himself to someone else, people can view other’s ePortfolio by randomly grabbing, directly searching or entering through shared link. Through the interaction between frontend, backend and database, the web application is able to ensure the user experiences and guarantee the integrity and security of account information.
 
This project is based on the requirements from clients who are Masters students studying SWEN90016 and implemented by GHS team for IT Project COMP30022.

## Technical requirements

Our website has been deployed successfully using the Alibaba cloud server. Users can access and use our web application through the PC browsers such as Chrome, IE and firefox. Current version does not support devices other than computers (or laptops) such as smartphones or tablets. Using smartphones or tablets to visit our website may lead to unexpected problems such as irregular website layouts.

To modify or extend our application, the following technical requirements must be met:

Frontend: 

Npm: 6.14.x

Node.js: 12.18.x

Npm libraries:

@ckeditor/ckeditor5-build-classic: ^22.0.0

@ckeditor/ckeditor5-react: ^2.1.0

@testing-library/jest-dom: ^4.2.4

@testing-library/react: ^9.5.0

@testing-library/user-event: ^7.2.1

axios: ^0.20.0

bootstrap: ^4.5.2

copy-to-clipboard: ^3.3.1

jwt-decode: ^3.0.0-beta.2

node-sass: ^4.14.1

react: ^16.13.1

react-bootstrap: ^1.3.0

React-fontawesome: ^1.6.1

react-dom: ^16.13.1

react-html-parser: ^2.0.2

react-router: ^5.2.0

react-router-dom: ^5.2.0

react-scripts: 3.4.3

reactjs-popup: ^2.0.4

sinon: ^9.2.0

Backend:

Python==3.8.6

Flask==1.1.2

Werkzeug==1.0.1

email-validator==1.1.1

Flask_Migrate==2.5.3

Flask_Login==0.5.0

Flask_SQLAlchemy==2.4.4

SQLAlchemy==1.3.19

Flask_Cors==3.0.9

Flask-WTF==0.14.3

Flask_Mail==0.9.1

alembic==1.4.3

flask_script==2.0.6

Database:

MySQL 8.0.21

Deployment: see detailed instructions in “Deployment Guidelines”

Email address for email validator:

Username:GHSeportfolio@126.com

Password:ghs12345

## website link

Temporary website https://47.115.90.152:3000/

Final website (the domain is still in apply) https://ghsitproject.top/


## Features 

Sprint 1

1. Register: New users could register with an identical username, identical email address and a password. If the username or email address has existed, there will be a warning that tells the user to use another username or email address.

	1. email validation: Before registering, the user should enter his email address. He would receive a verification code sent by our official email address. The user needs to enter the correct verification code to register successfully.
	
	2. doublecheck password: User should enter his password twice. If the two passwords are different, there will be a warning that tells the user to check the passwords he entered.
	
2. login: Users could log in to an existing account. If the login information he entered is incorrect, a warning will raise on screen.

3. reset password: User can reset his password after logging in. User needs to enter his new password twice. If the two passwords are different, there will be a warning that tells the user to check the passwords he entered. The new password needs to be different from the old one or a warning will raise.
 
4. profile page: After login, the user will jump to the profile page, where he can choose to edit eportfolio, view eportfolio and view others eportfolio. Users can also manipulate the account in the profile page such as reset password and logout.
 
5. logout: If the user does not log out, the account will remain logged in. When the user logs out successfully, it will jump to the login page.
 
6. edit your eportfolio: There are several “Sections” under the user's eportfolio and several “Modules” under each “Section”. Users can add, delete and edit “Sections” and the “Modules” in the section.
 
	1. add Section: Add a new empty “Section” with name “new section”
	
	2. delete Section: Delete one specific section

	3. edit Section: User can change the name of “Section”, add or delete the modules in that section

	4. add Module: Add a new empty “Module” with the name “new module” in one section.
 
	5. delete Module: Delete one specific module in one section
 
	6. edit Module: Each “Module” has a module title, time, textbox, image, file, audio and video. These contents are all optional and users are not required to complete all of them. Users can edit (including delete) all of them. 
	
	7. store text: Users can edit text in a module, including editing the text format such as bold, italic, and creating lists or tables.
		
	8. store images: Users could upload an image. If an image already exists, the new image will replace the old one (i.e. only one image is allowed in each module). Users can also delete the existing image. There is a preview of that image. Files, audios and videos are stored and manipulated the same as images.

	9. store files: Same as above (store images)

	10. store audios: Same as above (store images)

	11. store videos: Same as above (store images)
		
7. view your eportfolio: Show all sections (one section at a time, but users could switch using the navbar) and the modules in each section.
	
	1. download content: Users can download all the images, files, audios and videos.

	2. different layout: The layout of content in each “Module” will vary depending on the content. For example, if a “Module” only has an image, then this image will be centered.

8. view others’ eportfolio: Users could select and view other users’ eportfolios. (Viewing modes are the same as themselves.)
 
	1. user list: There is a list that contains 10 random users from the database. If the total number of users is less than 10, the list will contain all the users. One user can see the “username” and “number of sections” of other users in the list. He can choose a user and view his eportfolio. Users can also grab another 10 random users again by clicking the button.
	
	2. search another user: Users can search for other users by username. Then he can view that user’s eportfolio.
 
9. forget password: The user can reset his password through the username and email address if he forgets his password. Firstly, the user enters his username. Then the office mailbox will send a verification code to the user’s mailbox. User needs to enter that verification code and a new password twice. If the verification code is correct and the two passwords entered are the same, the password is reset successfully. The new password needs to be different from the old one or a warning will raise.
 
10. generate URL: Get the URL of the user's eportfolio and automatically save to the clipboard.
 
11. default eportfolio: There are four default “Sections” in a new user’s eportfolio which are “about me”, “contact me”, “education background” and “internship experience”. Each of these “Sections” has a default “Module” with some default content. 

## Deployment Guidelines

- To deploy the source code

	- Compress the local source code file into ZIP format
	
	- Cd to the path of the ZIP file

	- Transfer the ZIP file to cloud server by using SCP instruction

		Scp react-flask-app.zip root@47.115.90.152:/root
	
	- Access to the cloud server

		Ssh root@47.115.90.152

		Password: Ghs66666

	- Unzip the ZIP file

		Unzip react-flask-app.zip

- To update the source code

	- Access to the cloud server
	
		Ssh root@47.115.90.152

		Password: Ghs66666

	- Delete existing code

		Rm -rf xxx(filename)

	- Deploy the new code

- To run the project on the cloud server

	- Access to the cloud server
	
		Ssh root@47.115.90.152
		
		Password: “Ghs66666”
		
	- “Cd project/api”

	- Run back end

		FLASK_APP = eportfolio.py
		flask run --host=172.30.162.215
		
	- Run front end
		
		- “npm start”

- To deploy the database

	- In Alibaba cloud server, configure remote connection port security rule -- 3306

	- Create a new Alibaba cloud server connection in Navicat and fill in the information
	
		Username: “eportfolio”
		
		Password: “sW6anHhCnmmBZEdA”
		
		Port: “3306”

- To access the database

	- Access to the cloud server

		Ssh root@47.115.90.152

		Password: “Ghs66666”

	- Access the database

		Mysql -u eportfolio -p

		Password: “sW6anHhCnmmBZEdA”

	- Select the eportfolio database

		Use eportfolio

End

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

## Testings
### React test cases

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

### Backend test cases 

- Login: Test whether “Invalid username or password” is returned when the username or password is incorrect; Tests whether the user ID is returned when the user name and password are correct.

- Register: Tests if a new user registers with a new username, password, and email address.

- Reset password: Tests if the user could change the password successfully.

- Save: Tests if the user could save something successfully.

- Add: Tests to see if it works when the user adds something.

- Delete: Tests if the user could delete something successfully.

- Download: Test if the user is successful when downloading something.

- Email validation: Test whether the user can successfully use the email to verify correctly.

