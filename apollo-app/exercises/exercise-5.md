# Exercise 5

## Requirements

1. Add a new column header to the Car Table component. The column header text should say "Actions".

1. In the `components` folder there is a component named Car Edit Row. The Car Edit Row is similar to Car View Row except the columns for make, model, year, color and price are input fields. When the Car Edit Row is displayed, the form fields are prepopulated with the data of the car being edited. Please observe that the Id is not an input field. In the last column, there are two buttons: `Save` and `Cancel`.

1. Add a button labeled `Edit` to the last column of the Car View Row component. When the button is clicked, the row on which it is clicked, changes to a Car Edit Row component. Only one row is editable at a time. To track the row being edited please use an Apollo Reactive Variable.

1. Add a button labeled `Delete` to the last column of the Car View Row component (place the button next to the `Edit` button within the same column). When the button is clicked, remove the row from the table of cars.

  Hint: Changes to the server may be required.

1. Fully implement the `Save` and `Cancel` buttons in the Car Edit Row component. Use Apollo to perform the save and cancel operations.

  Hint: Not all operations require contacting the GraphQL server. Also, changes to the server may be required.

1. If one of the table rows is being edited, the edit row should change to a view row after, a car is added, or a car is deleted, or a car is saved. For add or delete, the changes for the car being edited should not be saved.

1. Ensure it works!