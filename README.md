# EvoraitChallenge

Please setup an angular application with a list view for "materials". The data is attached as json to this mail and should be read from that file initially. Afterwards please use some kind of local storage technology in the browser, so that data changes survive reloading of the page. The application only needs to work using this local storage after the initial import.

The list view should contain fields for "DescTxt", "CustomerPrice", "CustomerCurrency", "Quantity", "Available".

A list entry should also offer the following features:

There should be a numerical input field next to a button labelled "Book". If you enter a number and press the button, the number in "Available" needs to be reduced by the requested amount and "Quantity" should be increased respectively. This mechanism should also implemented in a way to prevent users from entering wrong data.

A click on a list entry should open a detail view (see below)

The detail view should display all the fields from the record for the entry and also the "book" functionality. It should easily be possible to return from the detail view to the list view. For improved usability it would also be nice to have a way to easily navigate to the detail view of the previous or next material without having to go back to the list view.

In addition, the column "DescTxt" should offer a filter functionality.

Bonus points if you implement this using the reactive programming library ngrx, which is part of angular.
