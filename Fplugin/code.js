// figma.closePlugin()

function executeTheCode() {
  let selectedElements = figma.currentPage.selection;
  console.log(selectedElements);


  //Display error message on invalid selection
  if(selectedElements.length === 0) {
    return figma.closePlugin("You haven't selected any element.")
  } else if(selectedElements.length > 1) {
    return figma.closePlugin("You have selected more than one elements.")
  }

  //get the name of the selected element
  let elementName = figma.currentPage.selection[0].name;

  //Callback function for findAll
  function hasSameName(n) {
    return n.name === elementName;
  }
  
  //get all if the name is similar to selected element name
  let withSameName = figma.currentPage.findAll(hasSameName);
  console.log(withSameName);

  //Select all the elements with the same name
  figma.currentPage.selection = withSameName;

  figma.closePlugin(withSameName.length + ' Elements selected!');
}

executeTheCode();
