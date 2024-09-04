Cypress.Commands.add('login', () => {
    cy.visit('https://app.kinescope.io/');
    cy.get('input[placeholder="Почта"]').type('sergeysiluyanov@yandex.ru');
    cy.get('input[placeholder="Пароль"]').type('Ss09011992Af!');
    cy.get('button[type="submit"]').click();
});