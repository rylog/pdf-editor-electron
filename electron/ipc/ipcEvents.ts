const ipcEvents = {
  CLEAR_PDF_FILES: 'reset-pdf-files',
  REGISTER_PDF_FILES: 'register-pdf-files',
  GENERATE_PDF: 'generate-pdf',
  CHANGE_THEME: 'change-theme',
  GET_THEME: 'get-theme',

  //Main window
  SHOW: 'show',
  MINIMIZE: 'minimize',
  MAXIMIZE: 'maximize',
  RESTORE: 'restore',
  CLOSE: 'close',
};

export default ipcEvents;
