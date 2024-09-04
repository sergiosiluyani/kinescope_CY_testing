Cypress.Commands.add('login', () => {
    cy.fixture('login').then((login) => {
        cy.visit('https://app.kinescope.io/');
        cy.get('input[placeholder="Почта"]').type(login.email);
        cy.get('input[placeholder="Пароль"]').type(login.password);
        cy.get('button[type="submit"]').click();
    });
});