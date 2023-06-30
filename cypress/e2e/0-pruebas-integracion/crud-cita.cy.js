/// <reference types="cypress" />

describe('CRUD Paciente', () => {

    //Antes que nada abrir el navegador en el proyecto Frontend que es el puerto 8100
    beforeEach(() => {
        cy.visit('http://localhost:8100') //Frontend de Produccion
            //cy.visit('http://localhost:8200')//Frontend de Test
    })

    //Servicio API - GetPaciente()
    it('GetCita()', () => {
        cy.wait(1000);
        //cy.get('ion-tab-button').should('be.not.visible');
        cy.get('ion-tab-button').eq(6).click(); // click en el TAB de Paciente
        cy.wait(1000);
        cy.get('ion-item').should('be.visible').should('not.have.length', '0'); //Verifica que exista un ion-item
    });

    //Servicio API - AddPaciente(entidad)
    it('AddCita(entidad)', () => {
        cy.get('ion-tab-button').eq(6).click(); // click en el TAB de Producto
        cy.wait(1000);

        cy.get('#motivo').type('cypress', { delay: 100 })
            .should('have.value', 'cypress');
        cy.wait(500);
        cy.get('#fechahora').type('2023-06-21T14:00:00'
        , { delay: 100 }).should('have.value', '2023-06-21T14:00:00');
        cy.wait(500);
        cy.get('#idPaciente').type(7, { delay: 100 }).should('have.value', 7);
        cy.wait(500);
        cy.get('#addCita').not('[disabled]').click();
    });

    //Servicio API - UpdatePaciente(entidad)
    it('UpdateCita(entidad)', () => {
        cy.get('ion-tab-button').eq(6).click(); // click en el TAB de Producto
        cy.wait(1000);

        cy.get('#updateCita').eq(0).click(); //Click al boton de Editar un Producto
        cy.wait(1000);

        cy.get('#motivo').invoke('val', ''); //Vaciar el campo del textfield de nombreProducto
        cy.get('#motivo').type('update cypress', { delay: 100 }); //Escribir "UPDATE Cypress en el textfield de nombreCategoria"
        cy.wait(500);

        cy.get('#fechahora').invoke('val', ''); //Vaciar el campo del textfield de idCategoriaProducto
        cy.get('#fechahora').type('2023-06-21T14:00:00'
        , { delay: 100 }); //Escribir "UPDATE Cypress en el textfield de idCategoriaProducto"
        cy.wait(500);
        cy.get('#idPaciente').invoke('val', ''); //Vaciar el campo del textfield de idCategoriaProducto
        cy.get('#idPaciente').type(7, { delay: 100 }).should('have.value', 7); //Escribir "UPDATE Cypress en el textfield de idCategoriaProducto"
        cy.wait(500);
        cy.get('#guardarCambios').not('[disabled]').click(); //Click en guardar cambios
    });

    //Servicio API - DeletePaciente(id)
    it('DeleteCita(id)', () => {
        cy.wait(1000);
        cy.get('ion-tab-button').eq(6).click(); // click en el TAB de Paciente

        cy.get('#deleteCita').eq(0).click(); //Click al boton de Eliminar un Paciente
    });

});