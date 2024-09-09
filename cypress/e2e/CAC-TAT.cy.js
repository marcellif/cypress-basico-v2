//<reference types ="Cypress"/>

describe('Testes da Central de atendimento do cliente TAT', function () {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it ('verifica o titulo da aplicação', () => {
    cy.title().should('eq','Central de Atendimento ao Cliente TAT');
  })

  it ('preenche os campos obrigatórios e envia o formulário', () => {
    const textoLongo = "Minha sincera gratidão pelo seu trabalho. Sua habilidade e empenho são um exemplo para todos nós. Sei que o caminho profissional nem sempre é fácil, mas você tem enfrentado desafios com coragem e perseverança, inspirando todos ao seu redor."
    cy.get('#firstName').type('Angelina')
    cy.get('#lastName').type('Jolie')
    cy.get('#email').type('angelina@mailinator.com')
    cy.get('#phone').type('21999999999')
    cy.get('#open-text-area').type(textoLongo, {delay:0})
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it ('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
  cy.get('#firstName').type('Brad')
  cy.get('#lastName').type('Pitt')
  cy.get('#email').type('bradmailinator.com')
  cy.get('#phone').type('21999999999')
  cy.get('#open-text-area').type('Não gostei do atendimento', {delay:0})
  cy.get('button[type="submit"]').click()
  cy.get('.error').should('be.visible')
  })


  it ('verifica se campo telefone somente aceita números', () =>{
    cy.get('#phone')
      .type('abcdefgh')
      .should('have.value', '')
  })

  it('Verificação de campo obrigatorio telefone e mensagem de erro', () =>{
    cy.get('#firstName').type('Clara')
    cy.get('#lastName').type('Herman')
    cy.get('#email').type('clara@mailinator.com')
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('Gostei do atendimento', {delay:0})
    cy.get('button[type="submit"]').click()
    cy.get('.error').should('be.visible')
  })

  it ('Preenche e limpa os campos nome, sobrenome, email e telefone', () =>{
    cy.get('#firstName')
      .type('Clara')
      .should('have.value','Clara')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Herman')
      .should('have.value','Herman')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('clara@mailinator.com')
      .should('have.value','clara@mailinator.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('21999999999')
      .should('have.value','21999999999')
      .clear()
      .should('have.value', '')
  })

  it ('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () =>{
    cy.contains('button', 'Enviar').click()
    cy.contains('span.error', 'Valide os campos obrigatórios!').should('be.visible')
  })

  it ('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })

  it ('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value','youtube')
  })

  it ('seleciona um produto (Cursos) por seu valor (value)', () =>{
    cy.get('#product')
      .select('cursos')
      .should('have.value','cursos')
  })

  it ('seleciona um produto (Blog) por seu índice', () =>{
    cy.get('#product')
      .select(1)
      .should('have.value','blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it ('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function(item){
        cy.wrap(item).check()
        cy.wrap(item).should('be.checked')
      })
    
  })

  it ('seleciona um arquivo da pasta fixtures', () =>{
    cy.get('input[type="file"]')
      .should('not.have.value')
      .selectFile('cypress/fixtures/example.json')
      .then(input =>{
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it ('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it ('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () =>{
    cy.fixture('example.json').as('exampleFile')
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('@exampleFile')
    .should(input =>{
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.get('#privacy a')
      .should('have.attr', 'target', '_blank')
  })

  it ('acessa a página da política de privacidade removendo o target e então clicando no link', () =>{
    cy.get('#privacy a')
      .invoke('removeAttr', 'target')
      .click()
    cy.contains('Talking About Testing')
      .should('be.visible')
  })

})



