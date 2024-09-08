describe('Testes da Central de atendimento do cliente TAT', function () {
    beforeEach(() => {
      cy.visit('./src/privacy.html')
    })

it ('verifica titulo', ()=> {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT - Política de privacidade')
})

})