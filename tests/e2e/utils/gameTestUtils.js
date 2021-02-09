export function startGame(cy, time, mode) {
    cy.visit('/', {
        onBeforeLoad: (win) => {
            Object.defineProperty(win.navigator, 'language', {
                value: 'en-EN',
            });
        },
    });

    const btnWithFriends = cy.get('.search-box__btns .v-btn.secondary');
    btnWithFriends.contains('With Friends');

    const btnSinglePlayer = cy.get('.search-box__btns .v-btn.primary');
    btnSinglePlayer.contains('Single Player');
    btnSinglePlayer.click();

    expect(cy.get('#modeClassicBtn')).to.exist;
    expect(cy.get('#modeCountryBtn')).to.exist;
    if (mode === 'country') {
        cy.get('#modeCountryBtn').click();
    }
    const card = cy.get('.v-card');
    card.contains('.card_settings__time__label', 'Set a time limitation.');

    if (time) {
        cy.get('.time-picker .v-slider--horizontal').click('center');
        cy.get('.time-input__second input')
            .should('have.value', 0)
            .type('{backspace}' + time);
        cy.get('.time-input__minute input')
            .should('have.value', 5)
            .type('{backspace}0{enter}');
    }

    card.get('.v-card__actions .v-btn:last-of-type').contains('NEXT').click();

    cy.url().should('include', '/street-view');
}

export function setPosition(cy) {
    cy.get('div#container-map').click('center');
    cy.get('map').should('exist');
}
export function finishRound(cy) {
    cy.get('#play-again-button').contains('View details').click();

    cy.url().should('eq', Cypress.config().baseUrl + 'history');

    cy.get('.v-data-table__wrapper tbody').children().should('have.length', 2);
    cy.get('.v-data-table__expanded').should('exist');
}