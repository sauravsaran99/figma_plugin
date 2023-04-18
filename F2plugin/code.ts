//This plugin create tints of selected color
//This ui will allow to select color, give the name of the color, the number of tints you want to generate, you can fix the distance betweeen the tints box, and fix the dimenisions of the box or tint box.

//This will show the ui of the plugin
figma.showUI(__html__, {width: 320, height: 640, title: "Color tint generator"});

//message recived
figma.ui.onmessage = mes => {
  if(mes.type === 'actionGenerate') {
    //Destructuring the pluginform Data
    const {circleSize, circleSpacing, colorCode, colorName, frameDirection, tintNumber} = mes.formDataObj;


    //create the frame and name it
    let parentFrame = figma.createFrame();

    parentFrame.name = 'Tints of the '+colorName+' color';


    //Add layout with spacing, padding, direction and sizing mod
    parentFrame.layoutMode = frameDirection.toUpperCase();
    parentFrame.paddingBottom = 64;
    parentFrame.paddingLeft = 64;
    parentFrame.paddingRight = 64;
    parentFrame.paddingTop = 64;

    parentFrame.itemSpacing = parseInt(circleSpacing);
    parentFrame.primaryAxisSizingMode = 'AUTO';
    parentFrame.counterAxisSizingMode = 'AUTO';

    //generating tint eclipse
    for(let i = 0; i < tintNumber; i++) {

      let tintNode = figma.createEllipse();

      //name of eclipse
      tintNode.name = colorName+' '+ (100 - 10*i);

      //size the eclipse
      tintNode.resize(parseInt(circleSize), parseInt(circleSize));

      //function for converting hex value to rgb
      //Function base on this information https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
      const hexToRgb = (hex:any) => {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      }

      const colorR = hexToRgb(colorCode)!.r / 255;
      const colorG = hexToRgb(colorCode)!.g / 255;
      const colorB = hexToRgb(colorCode)!.b /255;

      //color the eclipse
      tintNode.fills = [{type:'SOLID', color: {r:colorR, g:colorG, b:colorB}}];

      //opacit of eclipse
      tintNode.opacity = (100 - i*10) / 100;

      //Add generated node to the parent frame
      parentFrame.appendChild(tintNode);

      //Select and zoom to the generated frame 
      const selectFrame: FrameNode[] = [];
      selectFrame.push(parentFrame);
      figma.currentPage.selection = selectFrame;

      figma.viewport.scrollAndZoomIntoView(selectFrame);

    }

    figma.closePlugin("Tints generated successfully!");
  } else if(mes.type === 'actionExit') {
    figma.closePlugin();
  }
}
