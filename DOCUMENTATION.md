## INTRODUCTION
Lawyerpp Enterprise is an enterprise solution that addresses the entire
administration of justice value chain – from filing of processes to hearings and
delivering of judgment. It leverages technology to ensure seamless access to and
administration justice.

## INSTALLATION
**Here is a step by step guide on how to install and run the application. It will get you to a point of having a local running instance. !**
**Run the following your commnad line !**

* git clone https://github.com/KelahKelah/lawyerppEnterprise.git
* git checkout branch name
* yarn / npm install
* yarn local_start


## USAGE
* CLIENT USER
**Note: there is no sign up as at on this day 15 July 2020 !**

A client who is assigned the role of registra can add price
A lawyer assiegned the role of a judge can assign a lawyer


**ACTION FLOW !**
<!-- Client logs in ===> Lawyer logs in ===> client files a process ===> lawyer creates court for process ===> lawyer assign cost to case ===> client awaits case for costing 
===> client proceeds to make payment ===> lawyer assigns a lawyer to the case ===> client logs out. -->

client logs in ===> Lawyer logs in ===> client files a process ===> lawyer creates court for process ===> client who is assigned the role of registra assigns cost to case ===> client awaits case for costing 
===> client proceeds to make payment ===> lawyer with the role of a judge assigns a lawyer to the case ===> client logs out.
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




