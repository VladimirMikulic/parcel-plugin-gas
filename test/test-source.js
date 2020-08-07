// Runs when user installs extensions
GAS.onInstall = e => {
  onOpen();
};

// Runs as soon as user opens a document
GAS.onOpen = e => {
  DocumentApp.getUi() // Or SlidesApp or FormApp.
    .createMenu('My Add-on')
    .addItem('Open', 'showSidebar')
    .addToUi();
};

GAS.showSidebar = () => {
  // evaluate() - execute scriplets and convert the template to HtmlOutput object
  const previewSidebar = HtmlService.createTemplateFromFile('main')
    .evaluate()
    .setTitle('Code Highlight');

  DocumentApp.getUi().showSidebar(previewSidebar);
};

GAS.getSelectedText = () => {
  console.time('FETCHING...');
};

GAS.escapeRegExp = string => {
  return string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
};

GAS.include = filename => {
  return HtmlService.createTemplateFromFile(filename).getRawContent();
};
