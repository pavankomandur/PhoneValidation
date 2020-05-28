# PhoneValidation

This is Phone Validation App which Validates phone number

Tech Stack : Angular.

Features : Accepts Phone number and it will display all the suggestions.

1.  It will accept only either 7 digit or 10 digit number. Validation is implemented in front end only.
2.  Pagination is Implemented.
3.  Calls Rest API(http://localhost:8081/phonebook/getSuggestions) to get suggestions.
4.  if user enters 7 digits, it assumes area code is missing and adds all the area codes and displays all the combinations as suggestions.
5.  if the user enters 10 digit number, then it will convert the last digit into character based on tele key pad and displays the suggestions.
6.  Pagination is implemented. based on the records it will display page numbers.
    if the records are more than 5 pages, then it will show >> symbol to get next five pages( if we have the data). Otherwise     it will display page numbers dynamically depending upon the records.
