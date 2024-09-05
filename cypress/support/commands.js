Cypress.Commands.add('login', () => {
    cy.fixture('login').then((login) => {
      
      // Use cy.session() to handle login sessions
        cy.visit('https://app.kinescope.io');
  
        cy.get('input[placeholder="Почта"]').type(login.email);
        cy.get('input[placeholder="Пароль"]').type(login.password);
        cy.get('button[type="submit"]').click();
      });
    });


// cypress/support/commands.js

Cypress.Commands.add('uploadVideo', ({ videoFileName, videoPath, videoTitle, videoDescription, parentId, uploadToken }) => {
    // Read the video file as a binary file
    cy.readFile(videoPath, 'binary').then((fileContent) => {
      // Convert binary file content into a Blob
      const blob = Cypress.Blob.binaryStringToBlob(fileContent, 'video/mp4');
  
      // Send the request to upload the video
      return cy.request({
        method: 'POST',
        url: 'https://uploader.kinescope.io/v2/video',
        headers: {
          Authorization:`Bearer ${uploadToken}`,
          'X-Parent-ID': parentId,
          'X-Video-Title': videoTitle,
          'X-Video-Description': videoDescription,
          'X-File-Name': videoFileName,
          'Content-Type': 'video/mp4'
        },
        body: blob,
        encoding: 'binary',
        failOnStatusCode: false
      }).then((response) => {
        // Check the response
        if (response.status === 200) {
          cy.log('Video uploaded successfully:', response.body);
        }
      });
    });
  });

  // Add this to your Cypress setup (e.g., in your beforeEach or in the main test file)
  Cypress.Commands.add('blockAllRequests', () => {
    cy.intercept('*', (req) => {
      const allowedDomains = ['https://app.kinescope.io']; // Add domains you want to allow
  
      if (!allowedDomains.some(domain => req.url.includes(domain))) {
        req.destroy(); // Block the request
      }
    });
  });
