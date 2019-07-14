# studentTimeGridTable
Enter student detail with intime and out time:
CLIENT:-
Requirement:angular 8,
node version:10.9.0
Steps to Start:
1. npm i
2.npm start
3.http://localhost:4200/ in browser

SERVER:-
Mongo Required
npm i
npm start
(server running on 9000)

LOGIC IMPLEMENTED:
1. Two tables are there one for student Entry and other for student inTime and outTime entry.
2. We can add student in Student Table and the corresponding entry will be created for Time table with intime and outtime as null
3. So basically we have only edit option in Time Table,where Name is uneditable as its an Unique Key in both the tables.
4. Entries will be only entered in database if for every student we have intime and outtime.
5. For Edit/Add press submit button only.
6.Logic is mainly Implemeted at frontend it can be done at backend also

