## INTRODUCTION
Lawyerpp Enterprise is an enterprise solution that addresses the entire
administration of justice value chain – from filing of processes to hearings and
delivering of judgment. It leverages technology to ensure seamless access to and
administration justice.
 
## INSTALLATION
**Here is a step by step guide on how to install and run the application. It will get you to a point of having a local running instance. !**
**Run the following you're command line !**
 
* git clone https://github.com/KelahKelah/lawyerppEnterprise.git
* git checkout branch name
* yarn / npm install
* yarn local_start

## USE CASE

#### LOGIN USE CASE
#REQUIREMENTS
*Any user with valid credentials can login
*User must have a valid credentials before he can be directed to the home page
# SCENARIOS
*You can either login as client or a lawyer 
*User is redirected to the homepage after login 
*Login credentials is created at the backend- No sign up at the moment
*If an invalid credential is add, an error message is thrown below the button 
 
#### CREATE COURT USECASE 
#REQUIREMENTS
*Any user can create a court
*All fields are required
# SCENARIOS
*User is redirected to a success page with a link to view court whenever a court is successfully created 
*All fields are required 
* If submit button is clicked while a field is left empty, a 500 error will be thrown on the console

##### View Court Use case

###### Requirements
* Any user can view the lists of all courts
* Do not add lawyer if you do not have administrative right. Only a lawyer or a judge who has administrative right can add lawyer

###### Scenarios
* A 500 error will be thrown on the console once a user who doesn't have an administrative right tries to add a lawyer.
*  A 500 error will be thrown on the console once a user who doesn't have an administrative right tries to add a client

###### Post conditions
Nil

##### Cost a process Usecase
###### Requirements
* Only a user who is a registrar of that court particular court can cost a process

###### Scenarios
* A user is redirected to view the process document once the “file button” is clicked , an input field where you can add cost is shown when a user goes back to the page. 
* A 404 error is thrown once a user who is not a registrar tries to assign cost
* A error message is thrown when a user who is a registrar tries to cost a process

###### Post conditions
* Nil

##### File a process Usecase
###### Requirements
* Any user can file process
* All fields are required

###### Scenarios
* User is directed to the filed process after clicking the button
* A 500 status error message is thrown when a user tries to submit an input field

###### Post conditions
Nil


##### Create organization Use Case
###### Requirements
* Anyone can create organization

###### Pre conditions
* All fields are required

###### Post conditions
* Nil


##### Assign a lawyer Use case
###### Requirements
* Only a Judge with administrative right can assign a lawyer to a case


###### Scenarios
* A 500 a lawyer not found error is returned when you try to assign a lawyer that is not assigned to a particular case 
* An error is thrown if a non authenticated User tries to access that page
* Only clients who filed a process can make payment

###### Post conditions
Nil


##### Payment Use case
###### Requirements
* Only clients who previously filed a process can make payment


###### Pre conditions
* Nil

###### Scenerios
* An error is thrown if a non authenticated User tries to access that page
* Only clients who filed a process can make payment

###### Post conditions
Nil



 


 
## USAGE
 
**GENERAL ACTION FLOW !**
User creates court ⇒ Assigns Judge (a lawyer with administrative right) *Assigns a Client (as a registrar) ⇒ Client (Or anyone )Files a process ⇒ Client (With role of a registrar ) costs the process ⇒ Client (the person who filed the process) view payment cost and proceeds to make payment ⇒ Lawyer (Who has an administrative right) proceeds to assign Lawyer to cas
 
**CLIENT USER !**
 
**CLIENT USER ACTION FLOW !**
Login ===> Create Court ===> Fill a file process ===> Await for case to be costed ===> Pay for costed case ===> Await lawyer assignment
 
**CLIENT USER ACTIONS !** 
* View all Court cases
* Logs in 
* Create court
* Fill a file process
* Proceeds to make payments
 
**LAWYER USER ACTION FLOW !**
Login ===> Create Court ===> Assign Cost ===> Assign Lawyer
 
**LAWYER USER !**
* View all cases `Specific to his court`
* Cost all process cases `Specific to his court`
* Lawyer login
* Lawyer can logout
* Lawyer creates a court
* View all courts
* File a process
* Assign a lawyer to court
 
## LIST OF FEATURES
* Sign-up and login
* Onboarding
* Navigation
* Forms
* Payment process page
* Error and success notification
* Payment notifications
* Image gallery
* Action Buttons
 
## OPERATING SYSTEM VERSIONS
Application can fully run on 
* Windows 
* Linux
* Mac Os
 
## WEB BROWSER COMPACTABILITY
Application is compactible with  browers such as
* Google chrome
* Firefox
 
## API
 
## CURRENT SERVICES
Currently hosted on Heroku
* Express server


